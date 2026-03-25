import { useStepFlow } from "../../hooks/useStepFlow";
import type { StepStatus } from "../../types/task";

function getStepColor(status: StepStatus, isCurrent: boolean): string {
  if (status === "completed") return "#22C55E";
  if (isCurrent || status === "executing" || status === "waiting_user") return "#6366F1";
  return "rgba(255,255,255,0.2)";
}

function getTextColor(status: StepStatus, isCurrent: boolean): string {
  if (isCurrent || status === "executing" || status === "waiting_user") return "#F1F5F9";
  if (status === "completed") return "#94A3B8";
  return "#475569";
}

export default function StepBar() {
  const { allSteps, activeTask, handleJumpTo } = useStepFlow();
  if (!activeTask) return null;

  return (
    <div style={{
      padding: '14px 20px',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      overflowX: 'auto',
      flexShrink: 0,
    }}>
      {allSteps.map((step, index) => {
        const isCurrent = step.stepIndex === activeTask.currentStepIndex;
        const isCompleted = step.status === "completed";
        const isClickable = step.stepIndex < activeTask.currentStepIndex;
        const dotColor = getStepColor(step.status, isCurrent);
        const textColor = getTextColor(step.status, isCurrent);

        return (
          <div
            key={step.stepIndex}
            style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            {/* Step item */}
            <div
              onClick={() => { if (isClickable) handleJumpTo(step.stepIndex); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                cursor: isClickable ? 'pointer' : 'default',
                padding: '4px 6px',
                borderRadius: 6,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (isClickable) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
            >
              {/* Dot / check */}
              <div style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: dotColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: isCurrent ? '0 0 8px rgba(99,102,241,0.5)' : 'none',
                transition: 'box-shadow 0.2s',
              }}>
                {isCompleted ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <span style={{ fontSize: 10, color: isCurrent ? 'white' : 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                    {index + 1}
                  </span>
                )}
              </div>
              <span style={{
                fontSize: 12,
                color: textColor,
                fontWeight: isCurrent ? 500 : 400,
                whiteSpace: 'nowrap',
              }}>
                {step.stepName}
              </span>
            </div>

            {/* Connector line */}
            {index < allSteps.length - 1 && (
              <div style={{
                width: 20,
                height: 1,
                background: isCompleted ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.1)',
                flexShrink: 0,
                margin: '0 2px',
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
