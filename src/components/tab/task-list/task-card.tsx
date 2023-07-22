import { Text } from "@tremor/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Task } from "@/model";

type Props = { task: Task; completeTask: ({ id }: { id: string }) => unknown };

export function TaskCard(props: Props) {
  const { task, completeTask } = props;

  return (
    <div className="border border-slate-300 rounded flex items-center">
      <div className="w-full">
        <Text className="px-1">{task.title}</Text>
      </div>
      <div className="w-fit p-1 ml-3">
        <div className="flex items-center">
          {task.isCompleted ? (
            <button disabled>
              <CheckCircleIcon className="w-5 rounded-full text-slate-400" />
            </button>
          ) : (
            <button onClick={() => completeTask({ id: task.id })}>
              <CheckCircleIcon className="w-5 rounded-full text-white bg-slate-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
