import api from "./api";

export async function createTask(userInput: string, agentType?: string) {
  const res = await api.post("/tasks/create", { user_input: userInput, agent_type: agentType });
  return res.data;
}

export async function advanceStep(taskId: string, stepIndex: number, output: unknown) {
  const res = await api.post(`/tasks/${taskId}/advance`, { step_index: stepIndex, output });
  return res.data;
}
