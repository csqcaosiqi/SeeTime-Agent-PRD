import ReactECharts from "echarts-for-react";
import { Typography } from "antd";

interface Props {
  data: { date: string; count: number }[];
}

export default function TrendChart({ data }: Props) {
  const option = {
    tooltip: { trigger: "axis" as const },
    xAxis: { type: "category" as const, data: data.map((d) => d.date) },
    yAxis: { type: "value" as const },
    series: [
      {
        type: "line",
        data: data.map((d) => d.count),
        smooth: true,
        areaStyle: { opacity: 0.3 },
      },
    ],
  };

  return (
    <div>
      <Typography.Title level={5}>事件趋势</Typography.Title>
      <ReactECharts option={option} style={{ height: 250 }} />
    </div>
  );
}
