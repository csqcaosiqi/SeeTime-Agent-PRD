import { Row, Col } from "antd";
import type { DetectedEvent } from "../../../types/event";
import ResultCard from "./ResultCard";

interface Props {
  events: DetectedEvent[];
  eventTypeGroup: string;
  showLicensePlate: boolean;
  onRemove: (id: string) => void;
  onUpdateCategory: (id: string, category: string) => void;
  onUpdatePlate: (id: string, plate: string) => void;
}

export default function ResultCardGrid({
  events,
  eventTypeGroup,
  showLicensePlate,
  onRemove,
  onUpdateCategory,
  onUpdatePlate,
}: Props) {
  return (
    <Row gutter={[16, 16]}>
      {events.map((event) => (
        <Col key={event.id} xs={24} sm={12} md={8} lg={6}>
          <ResultCard
            event={event}
            eventTypeGroup={eventTypeGroup}
            showLicensePlate={showLicensePlate}
            onRemove={onRemove}
            onUpdateCategory={onUpdateCategory}
            onUpdatePlate={onUpdatePlate}
          />
        </Col>
      ))}
    </Row>
  );
}
