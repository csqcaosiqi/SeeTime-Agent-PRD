import { Button, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

export default function ExportButton({ taskId }: { taskId: string }) {
  return (
    <Button
      icon={<DownloadOutlined />}
      onClick={() => {
        console.log(`Export PDF for task: ${taskId}`);
        message.info("PDF 导出功能开发中");
      }}
    >
      导出 PDF
    </Button>
  );
}
