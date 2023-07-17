import { Card, Text } from "@tremor/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Task } from "@/model";

type Props = { task: Task; completeTask: ({ id }: { id: string }) => unknown };

export function TaskCard(props: Props) {
  const { task, completeTask } = props;

  return (
    <Card className="max-w-xs mx-auto">
      <div className="flex justify-end">
        <div className="w-full">
          <Text>{task.title}</Text>
          <Text>{task.targetDate || "-"}</Text>
        </div>
        <div className="w-fit">
          {task.isCompleted ? (
            <button disabled>
              <CheckIcon className="w-8 rounded-full text-white bg-gray-300" />
            </button>
          ) : (
            <button onClick={() => completeTask({ id: task.id })}>
              <CheckIcon className="w-8 rounded-full" />
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
