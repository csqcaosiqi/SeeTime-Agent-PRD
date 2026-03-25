import ReactECharts from "echarts-for-react";
import { Typography } from "antd";

interface Props {
  data: { name: string; count: number }[];
}

export default function ReceiverRanking({ data }: Props) {
  const sorted = [...data].sort((a, b) => b.count - a.count);
  const option = {
    tooltip: { trigger: "axis" as const },
    xAxis: { type: "value" as const },
    yAxis: {
      type: "category" as const,
      data: sorted.map((d) => d.name),
      inverse: true,
    },
    series: [
      {
        type: "bar",
        data: sorted.map((d) => d.count),
        itemStyle: { color: "#1677ff" },
      },
    ],
    grid: { left: 100 },
  };

  return (
    <div>
      <Typography.Title level={5}>接收方问题数量排名</Typography.Title>
      <ReactECharts option={option} style={{ height: 250 }} />
    </div>
  );
}
