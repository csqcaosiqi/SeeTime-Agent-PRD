import { Table, Tag, Image } from "antd";
import type { DispatchResult } from "../../../types/dispatch";
import ReceiverSelect from "./ReceiverSelect";

interface Props {
  data: DispatchResult[];
  onChangeReceiver: (eventId: string, receiverName: string) => void;
}

export default function DispatchTable({ data, onChangeReceiver }: Props) {
  const columns = [
    {
      title: "截图",
      dataIndex: ["event", "screenshotUrl"],
      width: 80,
      render: (url: string) => (
        <Image
          src={url}
          width={60}
          height={45}
          style={{ objectFit: "cover", borderRadius: 4 }}
        />
      ),
    },
    {
      title: "事件类型",
      dataIndex: ["event", "subCategory"],
      width: 120,
      render: (cat: string) => <Tag>{cat}</Tag>,
    },
    {
      title: "位置",
      dataIndex: ["event", "street"],
      width: 160,
    },
    {
      title: "接收方",
      dataIndex: "receiverName",
      width: 200,
      render: (name: string, record: DispatchResult) => (
        <div>
          <ReceiverSelect
            value={name}
            onChange={(v) => onChangeReceiver(record.eventId, v)}
          />
          {!record.isAutoMatched && (
            <Tag color="orange" style={{ marginLeft: 8 }}>
              待手动指派
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: "所属单位",
      dataIndex: "receiverUnit",
      width: 120,
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="eventId"
      pagination={false}
      scroll={{ y: 500 }}
      size="middle"
    />
  );
}
