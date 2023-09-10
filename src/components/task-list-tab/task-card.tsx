import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Typography } from "../parts";
import { Task } from "@/model";

type Props = { task: Task; completeTask: ({ id }: { id: string }) => unknown };

export function TaskCard(props: Props) {
  const { task, completeTask } = props;

  return (
    <div
      style={task.category ? { backgroundColor: task.category.color } : {}}
      className="flex items-center rounded border border-slate-300"
    >
      <div className="w-full">
        <div className="px-1">
          <Typography>{task.title}</Typography>
        </div>
      </div>
      <div className="ml-3 w-fit p-1">
        <div className="flex items-center">
          {task.isCompleted ? (
            <button disabled>
              <CheckCircleIcon className="w-5 rounded-full text-slate-400" />
            </button>
          ) : (
            <button onClick={() => completeTask({ id: task.id })}>
              <CheckCircleIcon className="w-5 rounded-full bg-slate-400 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
