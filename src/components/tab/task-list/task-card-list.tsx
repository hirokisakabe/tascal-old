import { CreateTaskButton } from "./create-task-button";
import { IsCompletedFilterButton } from "./is-completed-filter-button";
import { TaskCardContainer } from "./task-card-container";

type Props = {
  taskList:
    | {
        id: string;
        title: string;
        isCompleted: boolean;
        targetDate: string | null;
      }[]
    | null;
  excludeIsCompleted: boolean;
  toggleExcludeIsCompleted: () => unknown;
};

export function TaskCardList(props: Props) {
  const { taskList, excludeIsCompleted, toggleExcludeIsCompleted } = props;

  if (!taskList) {
    return <>loading</>;
  }

  return (
    <div className="py-3 flex w-full">
      <div className="basis-3/4 space-y-1">
        {taskList.map((task) => (
          <div key={task.id}>
            <TaskCardContainer task={task} />
          </div>
        ))}
      </div>
      <div className="basis-1/4 flex justify-end px-2">
        <div className="space-x-2">
          <IsCompletedFilterButton
            excludeIsCompleted={excludeIsCompleted}
            onClick={toggleExcludeIsCompleted}
          />
          <CreateTaskButton />
        </div>
      </div>
    </div>
  );
}
