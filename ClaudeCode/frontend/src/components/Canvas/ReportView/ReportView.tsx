import { useEffect } from "react";
import { Divider, Space } from "antd";
import EventDistChart from "./EventDistChart";
import SpatialHeatmap from "./SpatialHeatmap";
import DispatchDetail from "./DispatchDetail";
import ReceiverRanking from "./ReceiverRanking";
import TrendChart from "./TrendChart";
import ExportButton from "./ExportButton";
import { useStepFlow } from "../../../hooks/useStepFlow";

const MOCK_DIST = [
  { name: "生活垃圾", value: 8 },
  { name: "垃圾桶满溢", value: 4 },
  { name: "建筑垃圾", value: 3 },
];

const MOCK_HEAT = Array.from({ length: 30 }, () => ({
  lng: 116.39 + Math.random() * 0.05,
  lat: 39.9 + Math.random() * 0.03,
  count: Math.ceil(Math.random() * 5),
}));

const MOCK_DISPATCH = Array.from({ length: 10 }, (_, i) => ({
  street: `中山路 ${100 + i * 10} 号`,
  eventType: ["生活垃圾", "垃圾桶满溢", "建筑垃圾"][i % 3],
  receiverName: ["张三", "李四", "王五"][i % 3],
  receiverUnit: ["城南中队", "城北中队", "城东中队"][i % 3],
}));

const MOCK_RANKING = [
  { name: "张三 (城南中队)", count: 5 },
  { name: "李四 (城北中队)", count: 3 },
  { name: "王五 (城东中队)", count: 2 },
];

const MOCK_TREND = Array.from({ length: 7 }, (_, i) => ({
  date: `03-${19 + i}`,
  count: 5 + Math.floor(Math.random() * 10),
}));

export default function ReportView() {
  const { activeTask, markWaitingUser, saveCurrentOutput } = useStepFlow();
  const isDataReporter = activeTask?.agentType === "data_reporter";

  useEffect(() => {
    markWaitingUser();
    saveCurrentOutput({ generated: true });
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        <ExportButton taskId={activeTask?.id ?? ""} />
      </div>
      <Space direction="vertical" size={24} style={{ width: "100%" }}>
        {isDataReporter && <TrendChart data={MOCK_TREND} />}
        <EventDistChart data={MOCK_DIST} />
        <Divider />
        <SpatialHeatmap points={MOCK_HEAT} />
        <Divider />
        {!isDataReporter && (
          <>
            <DispatchDetail data={MOCK_DISPATCH} />
            <Divider />
          </>
        )}
        <ReceiverRanking data={MOCK_RANKING} />
      </Space>
    </div>
  );
}
