import { Typography, Input } from "antd";
import { useState } from "react";

interface Props {
  value?: string;
  onChange: (plate: string) => void;
}

export default function LicensePlate({ value, onChange }: Props) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <Input
        size="small"
        defaultValue={value}
        placeholder="输入车牌号"
        onPressEnter={(e) => {
          onChange((e.target as HTMLInputElement).value);
          setEditing(false);
        }}
        onBlur={(e) => {
          onChange(e.target.value);
          setEditing(false);
        }}
        autoFocus
        style={{ width: 120 }}
      />
    );
  }

  return (
    <Typography.Text
      type={value ? undefined : "secondary"}
      style={{ cursor: "pointer" }}
      onClick={() => setEditing(true)}
    >
      {value || "未识别（点击补填）"}
    </Typography.Text>
  );
}
