import { useCallback, useState } from "react";
import { CreateTaskButton } from "./create-task-button";
import { IsCompletedFilterButton } from "./is-completed-filter-button";
import { TaskCardList } from "./task-card-list";

export function TaskListTab() {
  const [excludeIsCompleted, setExcludeIsCompleted] = useState(false);
  const toggleExcludeIsCompleted = useCallback(
    () => setExcludeIsCompleted((prev) => !prev),
    []
  );

  return (
    <div className="py-3">
      <div className="flex justify-end">
        <IsCompletedFilterButton
          excludeIsCompleted={excludeIsCompleted}
          onClick={toggleExcludeIsCompleted}
        />
        <CreateTaskButton />
      </div>
      <TaskCardList excludeIsCompleted={excludeIsCompleted} />
    </div>
  );
}
