import { List, Tag, Button } from "antd";
import { DeleteOutlined, EnvironmentOutlined } from "@ant-design/icons";
import type { Camera } from "../../../types/camera";

interface Props {
  camera: Camera;
  onRemove: (id: string) => void;
}

export default function CameraItem({ camera, onRemove }: Props) {
  return (
    <List.Item
      actions={[
        <Button
          key="rm"
          type="text"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => onRemove(camera.id)}
        />,
      ]}
    >
      <List.Item.Meta
        avatar={
          <EnvironmentOutlined style={{ fontSize: 18, color: "#1677ff" }} />
        }
        title={camera.name}
        description={`${camera.street} | ${camera.address}`}
      />
      <Tag color={camera.status === "online" ? "green" : "red"}>
        {camera.status}
      </Tag>
    </List.Item>
  );
}
