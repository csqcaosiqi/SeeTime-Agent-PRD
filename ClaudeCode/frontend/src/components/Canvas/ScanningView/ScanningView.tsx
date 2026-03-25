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
          background: '#08080F',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40, color: '#6366F1' }} spin />} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#F1F5F9', marginBottom: 6 }}>正在执行扫描...</div>
          <div style={{ fontSize: 13, color: '#475569' }}>扫描进度请查看左侧 Chat 区</div>
        </div>
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
        background: '#08080F',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <div style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'rgba(34,197,94,0.12)',
        border: '1px solid rgba(34,197,94,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: '#F1F5F9', marginBottom: 6 }}>扫描完成</div>
        <div style={{ fontSize: 13, color: '#475569' }}>请点击【执行下一步动作】查看结果</div>
      </div>
    </div>
  );
}
