import { Tag } from "antd";

interface Props {
  types: { value: string; label: string; count: number }[];
  selected: string | null;
  onSelect: (type: string | null) => void;
}

export default function TypeFilter({ types, selected, onSelect }: Props) {
  return (
    <div style={{ marginBottom: 16 }}>
      <Tag
        color={selected === null ? "blue" : undefined}
        style={{ cursor: "pointer", marginBottom: 4 }}
        onClick={() => onSelect(null)}
      >
        全部 ({types.reduce((sum, t) => sum + t.count, 0)})
      </Tag>
      {types.map((t) => (
        <Tag
          key={t.value}
          color={selected === t.value ? "blue" : undefined}
          style={{ cursor: "pointer", marginBottom: 4 }}
          onClick={() => onSelect(t.value)}
        >
          {t.label} ({t.count})
        </Tag>
      ))}
    </div>
  );
}
