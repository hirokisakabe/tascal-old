import { TaskCard } from "./task-card";
import { useTaskList } from "@/lib";

export function TaskCardList() {
  const taskList = useTaskList();

  if (!taskList) {
    return <>loading</>;
  }

  return taskList.map((task) => <TaskCard key={task.id} task={task} />);
}
