import { Typography } from "antd";

interface Props {
  points: { lng: number; lat: number; count: number }[];
}

export default function SpatialHeatmap({ points }: Props) {
  return (
    <div>
      <Typography.Title level={5}>空间分布热力图</Typography.Title>
      <div
        style={{
          height: 350,
          background: "#f0f2f5",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "#999" }}>
          热力图区域（共 {points.length} 个热力点，高德地图加载后显示）
        </span>
      </div>
    </div>
  );
}
