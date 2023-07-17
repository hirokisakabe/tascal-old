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
    <div className="py-3">
      <div className="flex justify-end">
        <IsCompletedFilterButton
          excludeIsCompleted={excludeIsCompleted}
          onClick={toggleExcludeIsCompleted}
        />
        <CreateTaskButton />
      </div>
      {taskList.map((task) => (
        <div key={task.id} className="py-3">
          <TaskCardContainer task={task} />
        </div>
      ))}
    </div>
  );
}
