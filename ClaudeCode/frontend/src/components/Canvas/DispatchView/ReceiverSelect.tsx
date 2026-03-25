import { Select } from "antd";

const RECEIVERS = [
  { name: "张三", unit: "城南中队" },
  { name: "李四", unit: "城北中队" },
  { name: "王五", unit: "城东中队" },
  { name: "赵六", unit: "交管大队" },
];

interface Props {
  value: string;
  onChange: (receiverName: string) => void;
}

export default function ReceiverSelect({ value, onChange }: Props) {
  return (
    <Select
      value={value}
      onChange={onChange}
      style={{ minWidth: 120 }}
      options={RECEIVERS.map((r) => ({
        value: r.name,
        label: `${r.name} (${r.unit})`,
      }))}
    />
  );
}
