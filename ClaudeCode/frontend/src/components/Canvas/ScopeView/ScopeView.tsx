import { useState, useEffect } from "react";
import { Typography, Divider } from "antd";
import MapContainer from "../../common/MapContainer";
import CameraList from "./CameraList";
import EventTypeSelector from "./EventTypeSelector";
import QueryFilterPanel from "./QueryFilterPanel";
import { useStepFlow } from "../../../hooks/useStepFlow";
import type { Camera } from "../../../types/camera";
import type { Dayjs } from "dayjs";

const MOCK_CAMERAS: Camera[] = Array.from({ length: 20 }, (_, i) => ({
  id: `cam-${i}`,
  name: `摄像头 ${i + 1}`,
  address: `中山路 ${100 + i * 10} 号`,
  street: "中山路",
  district: "城南区",
  lng: 116.39 + Math.random() * 0.05,
  lat: 39.9 + Math.random() * 0.03,
  coverageRadius: 50,
  status: (Math.random() > 0.1 ? "online" : "offline") as "online" | "offline",
}));

export default function ScopeView() {
  const { activeTask, markWaitingUser, saveCurrentOutput } = useStepFlow();
  const [cameras, setCameras] = useState<Camera[]>(MOCK_CAMERAS);
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [queryFilter, setQueryFilter] = useState<{
    timeRange: [Dayjs, Dayjs] | null;
    eventTypes: string[];
  }>({ timeRange: null, eventTypes: [] });

  const agentType = activeTask?.agentType;
  const isCityPatrol = agentType === "city_patrol";
  const isDataReporter = agentType === "data_reporter";

  useEffect(() => {
    if (isDataReporter) {
      saveCurrentOutput({ queryFilter });
    } else {
      saveCurrentOutput({
        cameras: cameras.map((c) => c.id),
        eventTypes: isCityPatrol ? selectedEventTypes : undefined,
      });
    }
    markWaitingUser();
  }, [cameras, selectedEventTypes, queryFilter]);

  return (
    <div style={{ padding: 16, display: "flex", gap: 16, height: "100%", background: '#08080F' }}>
      <div style={{ flex: 1, minHeight: 400 }}>
        <Typography.Title level={5} style={{ color: '#F1F5F9', marginBottom: 12 }}>扫描范围地图</Typography.Title>
        <MapContainer style={{ height: "calc(100% - 40px)" }} />
      </div>
      <div style={{ width: 360, overflow: "auto" }}>
        <Typography.Title level={5} style={{ color: '#F1F5F9', marginBottom: 6 }}>任务配置</Typography.Title>
        <Typography.Paragraph style={{ color: '#94A3B8', marginBottom: 12 }}>
          {activeTask?.agentLabel} - {activeTask?.description}
        </Typography.Paragraph>
        <Divider style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '12px 0' }} />
        {isCityPatrol && (
          <EventTypeSelector
            selected={selectedEventTypes}
            onChange={setSelectedEventTypes}
          />
        )}
        {isDataReporter && (
          <QueryFilterPanel filter={queryFilter} onChange={setQueryFilter} />
        )}
        {!isDataReporter && (
          <CameraList
            cameras={cameras}
            onRemove={(id) =>
              setCameras((prev) => prev.filter((c) => c.id !== id))
            }
          />
        )}
      </div>
    </div>
  );
}
