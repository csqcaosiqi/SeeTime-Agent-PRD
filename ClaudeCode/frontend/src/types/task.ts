export type AgentType = "clean_guardian" | "city_patrol" | "parking_watcher" | "data_reporter";
export type TaskStatus = "running" | "paused" | "completed" | "cancelled";
export type StepStatus = "pending" | "executing" | "waiting_user" | "completed";

export interface StepState {
  stepIndex: number;
  stepName: string;
  subAgentType: string;
  status: StepStatus;
  output: unknown;
  outputHash: string | null;
}

export interface Task {
  id: string;
  agentType: AgentType;
  agentLabel: string;
  description: string;
  status: TaskStatus;
  currentStepIndex: number;
  steps: StepState[];
  createdAt: string;
}
