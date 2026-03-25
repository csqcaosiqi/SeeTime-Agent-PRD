import { Tag, Select } from "antd";
import { useState } from "react";

const CATEGORY_OPTIONS: Record<string, { value: string; label: string }[]> = {
  garbage: [
    { value: "household", label: "生活垃圾" },
    { value: "overflow", label: "垃圾桶满溢" },
    { value: "construction", label: "建筑垃圾" },
  ],
  illegal_parking: [
    { value: "roadside", label: "路边违停" },
    { value: "sidewalk", label: "占用便道" },
    { value: "fire_lane", label: "占用消防通道" },
  ],
  city_event: [
    { value: "street_vendor", label: "游商小贩" },
    { value: "outdoor_business", label: "店外经营" },
    { value: "bike_parking", label: "非机动车乱停" },
    { value: "shared_bike", label: "共享单车乱停" },
  ],
};

interface Props {
  eventType: string;
  value: string;
  onChange: (newCategory: string) => void;
}

export default function CategoryTag({ eventType, value, onChange }: Props) {
  const [editing, setEditing] = useState(false);
  const options = CATEGORY_OPTIONS[eventType] ?? CATEGORY_OPTIONS.city_event;
  const label = options.find((o) => o.value === value)?.label ?? value;

  if (editing) {
    return (
      <Select
        size="small"
        value={value}
        options={options}
        onChange={(v) => {
          onChange(v);
          setEditing(false);
        }}
        onBlur={() => setEditing(false)}
        autoFocus
        style={{ minWidth: 100 }}
      />
    );
  }

  return (
    <Tag
      color="blue"
      style={{ cursor: "pointer" }}
      onClick={() => setEditing(true)}
    >
      {label}
    </Tag>
  );
}
