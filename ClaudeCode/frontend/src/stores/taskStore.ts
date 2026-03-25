import { create } from "zustand";
import type { Task, AgentType, StepStatus } from "../types/task";

const AGENT_LABELS: Record<AgentType, string> = {
  clean_guardian: "市容环卫",
  city_patrol: "城市异常事件",
  parking_watcher: "车辆违停",
  data_reporter: "统计报告",
};

interface TaskStore {
  tasks: Task[];
  activeTaskId: string | null;
  getActiveTask: () => Task | undefined;
  createTask: (agentType: AgentType, description: string, steps: { stepName: string; subAgentType: string }[]) => string;
  setActiveTask: (taskId: string) => void;
  updateStepStatus: (taskId: string, stepIndex: number, status: StepStatus) => void;
  saveStepOutput: (taskId: string, stepIndex: number, output: unknown) => void;
  advanceStep: (taskId: string) => { changed: boolean; clearedSteps: number[] };
  jumpToStep: (taskId: string, stepIndex: number) => void;
  cancelTask: (taskId: string) => void;
}

function hashOutput(output: unknown): string {
  return JSON.stringify(output);
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  activeTaskId: null,

  getActiveTask: () => {
    const { tasks, activeTaskId } = get();
    return tasks.find((t) => t.id === activeTaskId);
  },

  createTask: (agentType, description, steps) => {
    const id = crypto.randomUUID();
    const task: Task = {
      id,
      agentType,
      agentLabel: AGENT_LABELS[agentType],
      description,
      status: "running",
      currentStepIndex: 0,
      steps: steps.map((s, i) => ({
        stepIndex: i,
        stepName: s.stepName,
        subAgentType: s.subAgentType,
        status: i === 0 ? "executing" : "pending",
        output: null,
        outputHash: null,
      })),
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      tasks: [...state.tasks, task],
      activeTaskId: id,
    }));
    return id;
  },

  setActiveTask: (taskId) => set({ activeTaskId: taskId }),

  updateStepStatus: (taskId, stepIndex, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId
          ? { ...t, steps: t.steps.map((s) => (s.stepIndex === stepIndex ? { ...s, status } : s)) }
          : t
      ),
    })),

  saveStepOutput: (taskId, stepIndex, output) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              steps: t.steps.map((s) =>
                s.stepIndex === stepIndex ? { ...s, output, outputHash: hashOutput(output) } : s
              ),
            }
          : t
      ),
    })),

  advanceStep: (taskId) => {
    const task = get().tasks.find((t) => t.id === taskId);
    if (!task) return { changed: false, clearedSteps: [] };

    const currentStep = task.steps[task.currentStepIndex];
    const previousHash = currentStep.outputHash;
    const currentHash = hashOutput(currentStep.output);
    const changed = previousHash !== null && previousHash !== currentHash;
    const clearedSteps: number[] = [];

    set((state) => ({
      tasks: state.tasks.map((t) => {
        if (t.id !== taskId) return t;
        const nextIndex = t.currentStepIndex + 1;
        if (nextIndex >= t.steps.length) {
          return {
            ...t,
            status: "completed" as const,
            steps: t.steps.map((s) =>
              s.stepIndex === t.currentStepIndex
                ? { ...s, status: "completed" as StepStatus, outputHash: currentHash }
                : s
            ),
          };
        }
        return {
          ...t,
          currentStepIndex: nextIndex,
          steps: t.steps.map((s) => {
            if (s.stepIndex === t.currentStepIndex) {
              return { ...s, status: "completed" as StepStatus, outputHash: currentHash };
            }
            if (s.stepIndex === nextIndex) {
              return { ...s, status: "executing" as StepStatus };
            }
            if (changed && s.stepIndex > t.currentStepIndex) {
              clearedSteps.push(s.stepIndex);
              return { ...s, status: "pending" as StepStatus, output: null, outputHash: null };
            }
            return s;
          }),
        };
      }),
    }));
    return { changed, clearedSteps };
  },

  jumpToStep: (taskId, stepIndex) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              currentStepIndex: stepIndex,
              steps: t.steps.map((s) =>
                s.stepIndex === stepIndex ? { ...s, status: "waiting_user" as StepStatus } : s
              ),
            }
          : t
      ),
    })),

  cancelTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status: "cancelled" as const } : t)),
      activeTaskId: state.activeTaskId === taskId ? null : state.activeTaskId,
    })),
}));
