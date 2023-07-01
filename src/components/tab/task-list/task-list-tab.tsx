import { CreateTaskButton } from "../../parts/create-task-button";
import { TaskCardList } from "./task-card-list";

export function TaskListTab() {
  return (
    <div className="py-3">
      <div className="flex justify-end">
        <CreateTaskButton />
      </div>
      <TaskCardList />
    </div>
  );
}
