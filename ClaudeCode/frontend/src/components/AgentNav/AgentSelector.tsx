import { Button, Dropdown } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

const AGENT_OPTIONS: MenuProps["items"] = [
  { key: "clean_guardian", label: "市容环卫" },
  { key: "city_patrol", label: "城市异常事件" },
  { key: "parking_watcher", label: "车辆违停" },
  { key: "data_reporter", label: "统计报告" },
];

interface Props {
  onSelect: (agentType: string) => void;
}

export default function AgentSelector({ onSelect }: Props) {
  return (
    <Dropdown menu={{ items: AGENT_OPTIONS, onClick: ({ key }) => onSelect(key) }} trigger={["click"]}>
      <Button type="primary" icon={<PlusOutlined />} block>新建任务</Button>
    </Dropdown>
  );
}
