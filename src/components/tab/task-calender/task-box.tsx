import { Text } from "@tremor/react";
import { useCallback, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { EditTaskDialog } from "@/components/parts";
import { Task } from "@/model";

type Props = { task: Task; completeTask: ({ id }: { id: string }) => unknown };

export function TaskBox({ task, completeTask }: Props) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const openDialog = useCallback(() => setIsOpenDialog(true), []);
  const closeDialog = useCallback(() => setIsOpenDialog(false), []);

  return (
    <>
      <div className="border border-slate-300 rounded flex items-center">
        <div className="w-full">
          <button
            className="w-full text-start"
            type="button"
            onClick={openDialog}
          >
            <Text className="px-1">{task.title}</Text>
          </button>
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
      <EditTaskDialog
        isOpen={isOpenDialog}
        handleClose={closeDialog}
        task={task}
      />
    </>
  );
}
