import { useEffect } from "react";
import { Result, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useStepFlow } from "../../../hooks/useStepFlow";

export default function ScanningView() {
  const { currentStep, markWaitingUser } = useStepFlow();

  // Mock: simulate scan completing after 3 seconds
  useEffect(() => {
    if (currentStep?.status === "executing") {
      const timer = setTimeout(() => {
        markWaitingUser();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep?.status]);

  if (currentStep?.status === "executing") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Result
          icon={
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
          }
          title="正在执行扫描..."
          subTitle="扫描进度请查看左侧 Chat 区"
        />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Result status="success" title="扫描完成" subTitle="请点击【下一步】查看结果" />
    </div>
  );
}
