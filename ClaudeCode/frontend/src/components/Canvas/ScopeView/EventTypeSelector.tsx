import { Checkbox, Typography } from "antd";

const EVENT_TYPES = [
  { value: "street_vendor", label: "游商小贩" },
  { value: "outdoor_business", label: "店外经营" },
  { value: "bike_parking", label: "非机动车乱停" },
  { value: "shared_bike", label: "共享单车乱停" },
];

interface Props {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function EventTypeSelector({ selected, onChange }: Props) {
  return (
    <div style={{ marginBottom: 16 }}>
      <Typography.Text strong style={{ display: "block", marginBottom: 8 }}>
        选择目标事件类型：
      </Typography.Text>
      <Checkbox.Group
        options={EVENT_TYPES}
        value={selected}
        onChange={(values) => onChange(values as string[])}
      />
    </div>
  );
}
