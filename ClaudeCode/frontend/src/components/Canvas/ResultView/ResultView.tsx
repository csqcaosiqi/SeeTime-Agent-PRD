import { useState, useEffect, useMemo } from "react";
import { Typography, Empty, Badge } from "antd";
import ResultCardGrid from "./ResultCardGrid";
import TypeFilter from "./TypeFilter";
import { useStepFlow } from "../../../hooks/useStepFlow";
import type { DetectedEvent } from "../../../types/event";

function generateMockEvents(agentType: string): DetectedEvent[] {
  const types: Record<string, string[]> = {
    clean_guardian: ["household", "overflow", "construction"],
    city_patrol: [
      "street_vendor",
      "outdoor_business",
      "bike_parking",
      "shared_bike",
    ],
    parking_watcher: ["roadside", "sidewalk", "fire_lane"],
  };
  const subs = types[agentType] ?? types.clean_guardian;
  return Array.from({ length: 15 }, (_, i) => ({
    id: `evt-${i}`,
    cameraId: `cam-${i % 10}`,
    eventType:
      agentType === "clean_guardian"
        ? "garbage"
        : agentType === "parking_watcher"
          ? "illegal_parking"
          : "city_event",
    subCategory: subs[i % subs.length],
    street: `中山路 ${100 + i * 10} 号`,
    screenshotUrl: `https://placehold.co/400x300/eee/999?text=Event+${i + 1}`,
    detectionBbox: [100, 100, 300, 300] as [number, number, number, number],
    confidence: 0.7 + Math.random() * 0.25,
    licensePlate:
      agentType === "parking_watcher"
        ? Math.random() > 0.3
          ? `京A${String(10000 + i).slice(1)}`
          : undefined
        : undefined,
    status: "detected" as const,
    detectedAt: new Date(Date.now() - i * 60000).toISOString(),
  }));
}

export default function ResultView() {
  const { activeTask, markWaitingUser, saveCurrentOutput } = useStepFlow();
  const [events, setEvents] = useState<DetectedEvent[]>([]);
  const [filterType, setFilterType] = useState<string | null>(null);
  const agentType = activeTask?.agentType ?? "clean_guardian";
  const showLicensePlate = agentType === "parking_watcher";
  const eventTypeGroup =
    agentType === "clean_guardian"
      ? "garbage"
      : agentType === "parking_watcher"
        ? "illegal_parking"
        : "city_event";

  useEffect(() => {
    setEvents(generateMockEvents(agentType));
    markWaitingUser();
  }, [agentType]);

  useEffect(() => {
    saveCurrentOutput(events.filter((e) => e.status !== "rejected"));
  }, [events]);

  const typeStats = useMemo(() => {
    const map = new Map<string, number>();
    events.forEach((e) =>
      map.set(e.subCategory, (map.get(e.subCategory) ?? 0) + 1)
    );
    return Array.from(map.entries()).map(([value, count]) => ({
      value,
      label: value,
      count,
    }));
  }, [events]);

  const displayEvents = filterType
    ? events.filter((e) => e.subCategory === filterType)
    : events;

  if (events.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          background: '#08080F',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <span style={{ fontSize: 13, color: '#475569' }}>未发现异常事件</span>
      </div>
    );
  }

  return (
    <div style={{ padding: 16, background: '#08080F', minHeight: '100%' }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#F1F5F9' }}>检测结果</span>
          <Badge
            count={events.length}
            style={{ backgroundColor: "#6366F1" }}
          />
        </div>
        <span style={{ fontSize: 12, color: '#475569' }}>
          删除误检卡片，点击标签可修改分类
        </span>
      </div>
      {agentType === "city_patrol" && typeStats.length > 1 && (
        <TypeFilter
          types={typeStats}
          selected={filterType}
          onSelect={setFilterType}
        />
      )}
      <ResultCardGrid
        events={displayEvents}
        eventTypeGroup={eventTypeGroup}
        showLicensePlate={showLicensePlate}
        onRemove={(id) => setEvents((prev) => prev.filter((e) => e.id !== id))}
        onUpdateCategory={(id, cat) =>
          setEvents((prev) =>
            prev.map((e) => (e.id === id ? { ...e, subCategory: cat } : e))
          )
        }
        onUpdatePlate={(id, plate) =>
          setEvents((prev) =>
            prev.map((e) => (e.id === id ? { ...e, licensePlate: plate } : e))
          )
        }
      />
    </div>
  );
}
