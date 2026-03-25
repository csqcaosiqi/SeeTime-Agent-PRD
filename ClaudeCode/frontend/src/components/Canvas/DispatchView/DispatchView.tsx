import { useState, useEffect } from "react";
import { Typography, Alert, Badge } from "antd";
import DispatchTable from "./DispatchTable";
import { useStepFlow } from "../../../hooks/useStepFlow";
import type { DispatchResult } from "../../../types/dispatch";

function generateMockDispatch(): DispatchResult[] {
  return Array.from({ length: 10 }, (_, i) => ({
    eventId: `evt-${i}`,
    event: {
      subCategory: ["生活垃圾", "垃圾桶满溢", "建筑垃圾"][i % 3],
      street: `中山路 ${100 + i * 10} 号`,
      screenshotUrl: `https://placehold.co/400x300/eee/999?text=Event+${i + 1}`,
    },
    receiverName: ["张三", "李四", "王五"][i % 3],
    receiverContact: "138xxxx1111",
    receiverUnit: ["城南中队", "城北中队", "城东中队"][i % 3],
    isAutoMatched: i < 8,
  }));
}

export default function DispatchView() {
  const { markWaitingUser, saveCurrentOutput } = useStepFlow();
  const [dispatches, setDispatches] = useState<DispatchResult[]>([]);

  useEffect(() => {
    setDispatches(generateMockDispatch());
    markWaitingUser();
  }, []);

  useEffect(() => {
    saveCurrentOutput(dispatches);
  }, [dispatches]);

  const unmatched = dispatches.filter((d) => !d.isAutoMatched).length;

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
          <span style={{ fontSize: 14, fontWeight: 600, color: '#F1F5F9' }}>智能派单</span>
          <Badge
            count={dispatches.length}
            style={{ backgroundColor: "#6366F1" }}
          />
        </div>
        <span style={{ fontSize: 12, color: '#475569' }}>点击接收方可手动调整</span>
      </div>
      {unmatched > 0 && (
        <Alert
          message={`${unmatched} 个事件无法自动匹配接收方，请手动指派`}
          type="warning"
          showIcon
          style={{
            marginBottom: 12,
            background: 'rgba(245,158,11,0.1)',
            border: '1px solid rgba(245,158,11,0.25)',
            color: '#F59E0B',
          }}
        />
      )}
      <DispatchTable
        data={dispatches}
        onChangeReceiver={(eventId, name) =>
          setDispatches((prev) =>
            prev.map((d) =>
              d.eventId === eventId
                ? { ...d, receiverName: name, isAutoMatched: true }
                : d
            )
          )
        }
      />
    </div>
  );
}
