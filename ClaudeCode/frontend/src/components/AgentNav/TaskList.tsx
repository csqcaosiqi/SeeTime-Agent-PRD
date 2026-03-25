import { Empty } from "antd";
import { useTaskStore } from "../../stores/taskStore";
import TaskCard from "./TaskCard";

export default function TaskList() {
  const { tasks, activeTaskId, setActiveTask } = useTaskStore();
  if (tasks.length === 0) return <Empty description="暂无任务" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} isActive={task.id === activeTaskId} onClick={() => setActiveTask(task.id)} />
      ))}
    </div>
  );
}
