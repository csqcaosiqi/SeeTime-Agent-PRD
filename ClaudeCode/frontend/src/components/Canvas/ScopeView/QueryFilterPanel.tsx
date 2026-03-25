import { DatePicker, Select, Typography, Space } from "antd";
import type { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

const EVENT_TYPE_OPTIONS = [
  { value: "garbage", label: "垃圾" },
  { value: "illegal_parking", label: "违停" },
  { value: "street_vendor", label: "游商小贩" },
  { value: "outdoor_business", label: "店外经营" },
  { value: "bike_parking", label: "非机动车乱停" },
  { value: "shared_bike", label: "共享单车乱停" },
];

interface FilterState {
  timeRange: [Dayjs, Dayjs] | null;
  eventTypes: string[];
}

interface Props {
  filter: FilterState;
  onChange: (filter: FilterState) => void;
}

export default function QueryFilterPanel({ filter, onChange }: Props) {
  return (
    <div style={{ marginBottom: 16 }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div>
          <Typography.Text strong>时间范围：</Typography.Text>
          <RangePicker
            value={filter.timeRange}
            onChange={(dates) =>
              onChange({
                ...filter,
                timeRange: dates as [Dayjs, Dayjs] | null,
              })
            }
            style={{ width: "100%", marginTop: 4 }}
          />
        </div>
        <div>
          <Typography.Text strong>事件类型：</Typography.Text>
          <Select
            mode="multiple"
            options={EVENT_TYPE_OPTIONS}
            value={filter.eventTypes}
            onChange={(values) => onChange({ ...filter, eventTypes: values })}
            placeholder="不选则查询全部类型"
            style={{ width: "100%", marginTop: 4 }}
          />
        </div>
      </Space>
    </div>
  );
}
