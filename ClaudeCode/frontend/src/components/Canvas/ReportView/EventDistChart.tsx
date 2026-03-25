import ReactECharts from "echarts-for-react";
import { Typography } from "antd";

interface Props {
  data: { name: string; value: number }[];
}

export default function EventDistChart({ data }: Props) {
  const option = {
    tooltip: { trigger: "item" as const },
    legend: { bottom: 0 },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        label: { show: true, formatter: "{b}: {c} ({d}%)" },
        data,
      },
    ],
  };

  return (
    <div>
      <Typography.Title level={5}>事件类型分布</Typography.Title>
      <ReactECharts option={option} style={{ height: 300 }} />
    </div>
  );
}
