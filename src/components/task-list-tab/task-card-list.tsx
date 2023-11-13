import { CreateTaskButton } from "./create-task-button";
import { IsCompletedFilterButton } from "./is-completed-filter-button";
import { TaskCardContainer } from "./task-card-container";
import { Task } from "@/model";

type Props = {
  taskList: Task[] | null;
  excludeIsCompleted: boolean;
  toggleExcludeIsCompleted: () => unknown;
};

export function TaskCardList(props: Props) {
  const { taskList, excludeIsCompleted, toggleExcludeIsCompleted } = props;

  if (!taskList) {
    return <>loading</>;
  }

  return (
    <div className="w-full space-y-2 py-3">
      <div className="flex justify-end space-x-2">
        <IsCompletedFilterButton
          excludeIsCompleted={excludeIsCompleted}
          onClick={toggleExcludeIsCompleted}
        />
        <CreateTaskButton />
      </div>
      <div className="space-y-1">
        {taskList.map((task) => (
          <div key={task.id}>
            <TaskCardContainer task={task} />
          </div>
        ))}
      </div>
    </div>
  );
}
