import { TaskCardList } from "./task-card-list";
import { useTaskCalender } from "./use-task-card-list";

export function TaskCardListContainer() {
  const { taskList, toggleExcludeIsCompleted } = useTaskCalender();

  return (
    <TaskCardList
      taskList={taskList}
      excludeIsCompleted
      toggleExcludeIsCompleted={toggleExcludeIsCompleted}
    />
  );
}
