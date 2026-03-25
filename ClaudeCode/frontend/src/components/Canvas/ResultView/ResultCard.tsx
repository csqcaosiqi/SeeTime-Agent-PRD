import { Card, Button, Typography, Space } from "antd";
import {
  DeleteOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import type { DetectedEvent } from "../../../types/event";
import CategoryTag from "./CategoryTag";
import LicensePlate from "./LicensePlate";

interface Props {
  event: DetectedEvent;
  eventTypeGroup: string;
  showLicensePlate: boolean;
  onRemove: (id: string) => void;
  onUpdateCategory: (id: string, category: string) => void;
  onUpdatePlate: (id: string, plate: string) => void;
}

export default function ResultCard({
  event,
  eventTypeGroup,
  showLicensePlate,
  onRemove,
  onUpdateCategory,
  onUpdatePlate,
}: Props) {
  return (
    <Card
      hoverable
      cover={
        <div style={{ position: "relative" }}>
          <img
            src={event.screenshotUrl}
            alt="检测截图"
            style={{ width: "100%", height: 180, objectFit: "cover" }}
          />
          <Button
            danger
            type="primary"
            size="small"
            icon={<DeleteOutlined />}
            style={{ position: "absolute", top: 8, right: 8 }}
            onClick={() => onRemove(event.id)}
          />
        </div>
      }
      styles={{ body: { padding: 12 } }}
    >
      <Space direction="vertical" size={4} style={{ width: "100%" }}>
        <CategoryTag
          eventType={eventTypeGroup}
          value={event.subCategory}
          onChange={(cat) => onUpdateCategory(event.id, cat)}
        />
        <Typography.Text>
          <EnvironmentOutlined /> {event.street}
        </Typography.Text>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          <ClockCircleOutlined />{" "}
          {new Date(event.detectedAt).toLocaleString()}
        </Typography.Text>
        {showLicensePlate && (
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              车牌：
            </Typography.Text>
            <LicensePlate
              value={event.licensePlate}
              onChange={(plate) => onUpdatePlate(event.id, plate)}
            />
          </div>
        )}
        <Typography.Text type="secondary" style={{ fontSize: 11 }}>
          置信度: {(event.confidence * 100).toFixed(1)}%
        </Typography.Text>
      </Space>
    </Card>
  );
}
