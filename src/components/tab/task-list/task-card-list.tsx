import { TaskCard } from "./task-card";
import { useTaskList } from "@/lib";

export function TaskCardList() {
  const taskList = useTaskList();

  if (!taskList) {
    return <>loading</>;
  }

  return taskList.map((task) => (
    <div key={task.id} className="py-3">
      <TaskCard task={task} />
    </div>
  ));
}
