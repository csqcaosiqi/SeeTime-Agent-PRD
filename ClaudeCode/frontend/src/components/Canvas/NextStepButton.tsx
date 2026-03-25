import { useStepFlow } from "../../hooks/useStepFlow";

export default function NextStepButton() {
  const { activeTask, currentStep, canAdvance, handleAdvance } = useStepFlow();
  if (!activeTask || !currentStep) return null;
  if (currentStep.status === "executing") return null;

  const isLastStep = activeTask.currentStepIndex === activeTask.steps.length - 1;

  return (
    <div style={{
      padding: '14px 20px',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      display: 'flex',
      justifyContent: 'flex-end',
      background: '#08080F',
      flexShrink: 0,
    }}>
      <button
        disabled={!canAdvance}
        onClick={handleAdvance}
        style={{
          height: 40,
          padding: '0 20px',
          background: canAdvance ? '#6366F1' : 'rgba(99,102,241,0.3)',
          border: 'none',
          borderRadius: 10,
          color: canAdvance ? '#fff' : 'rgba(255,255,255,0.4)',
          fontSize: 13,
          fontWeight: 500,
          cursor: canAdvance ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          fontFamily: 'inherit',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { if (canAdvance) (e.currentTarget as HTMLButtonElement).style.background = '#5254CC'; }}
        onMouseLeave={e => { if (canAdvance) (e.currentTarget as HTMLButtonElement).style.background = '#6366F1'; }}
      >
        {isLastStep ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            完成任务
          </>
        ) : (
          <>
            执行下一步动作
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </>
        )}
      </button>
    </div>
  );
}
