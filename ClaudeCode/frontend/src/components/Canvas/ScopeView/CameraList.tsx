import { List, Typography, Input } from "antd";
import { useState } from "react";
import type { Camera } from "../../../types/camera";
import CameraItem from "./CameraItem";

interface Props {
  cameras: Camera[];
  onRemove: (id: string) => void;
}

export default function CameraList({ cameras, onRemove }: Props) {
  const [search, setSearch] = useState("");
  const filtered = cameras.filter(
    (c) =>
      c.name.includes(search) ||
      c.street.includes(search) ||
      c.address.includes(search)
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Typography.Text strong>摄像头列表 ({cameras.length})</Typography.Text>
      </div>
      <Input.Search
        placeholder="搜索摄像头"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 8 }}
      />
      <List
        dataSource={filtered}
        renderItem={(camera) => (
          <CameraItem camera={camera} onRemove={onRemove} />
        )}
        style={{ maxHeight: 400, overflow: "auto" }}
      />
    </div>
  );
}
