interface Props {
  style?: React.CSSProperties;
}

export default function MapContainer({ style }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f0f2f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        ...style,
      }}
    >
      <span style={{ color: "#999" }}>
        地图区域（高德地图加载后显示）
      </span>
    </div>
  );
}
