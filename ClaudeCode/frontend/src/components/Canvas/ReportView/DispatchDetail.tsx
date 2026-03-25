import { Table, Typography, Tag } from "antd";

interface Props {
  data: {
    street: string;
    eventType: string;
    receiverName: string;
    receiverUnit: string;
  }[];
}

export default function DispatchDetail({ data }: Props) {
  const columns = [
    { title: "地点", dataIndex: "street", key: "street" },
    {
      title: "事件类型",
      dataIndex: "eventType",
      key: "eventType",
      render: (t: string) => <Tag>{t}</Tag>,
    },
    { title: "接收方", dataIndex: "receiverName", key: "receiverName" },
    { title: "所属单位", dataIndex: "receiverUnit", key: "receiverUnit" },
  ];

  return (
    <div>
      <Typography.Title level={5}>派单明细</Typography.Title>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(_, i) => String(i)}
        size="small"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
