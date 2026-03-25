import { useCallback } from "react";
import { useTaskStore } from "../stores/taskStore";
import type { StepStatus } from "../types/task";

export function useStepFlow() {
  const {
    getActiveTask,
    updateStepStatus,
    saveStepOutput,
    advanceStep,
    jumpToStep,
  } = useTaskStore();

  const activeTask = getActiveTask();
  const currentStep = activeTask?.steps[activeTask.currentStepIndex] ?? null;
  const allSteps = activeTask?.steps ?? [];
  const canAdvance = currentStep?.status === "waiting_user" || currentStep?.status === "completed";

  const handleAdvance = useCallback(() => {
    if (!activeTask) return;
    const result = advanceStep(activeTask.id);
    if (result.changed && result.clearedSteps.length > 0) {
      console.log(`[StepFlow] Output changed, cleared steps: ${result.clearedSteps.join(", ")}`);
    }
  }, [activeTask, advanceStep]);

  const handleJumpTo = useCallback(
    (stepIndex: number) => {
      if (!activeTask) return;
      const step = activeTask.steps[stepIndex];
      if (step && stepIndex < activeTask.currentStepIndex) {
        jumpToStep(activeTask.id, stepIndex);
      }
    },
    [activeTask, jumpToStep]
  );

  const markWaitingUser = useCallback(() => {
    if (!activeTask) return;
    updateStepStatus(activeTask.id, activeTask.currentStepIndex, "waiting_user" as StepStatus);
  }, [activeTask, updateStepStatus]);

  const saveCurrentOutput = useCallback(
    (output: unknown) => {
      if (!activeTask) return;
      saveStepOutput(activeTask.id, activeTask.currentStepIndex, output);
    },
    [activeTask, saveStepOutput]
  );

  return {
    activeTask,
    currentStep,
    allSteps,
    canAdvance,
    handleAdvance,
    handleJumpTo,
    markWaitingUser,
    saveCurrentOutput,
  };
}
