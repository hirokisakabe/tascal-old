import { Text } from "@tremor/react";
import { useCallback, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { EditTaskDialog } from "@/components/dialog";
import { Task } from "@/model";

type Props = { task: Task; completeTask: ({ id }: { id: string }) => unknown };

export function TaskBox({ task, completeTask }: Props) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const openDialog = useCallback(() => setIsOpenDialog(true), []);
  const closeDialog = useCallback(() => setIsOpenDialog(false), []);

  return (
    <>
      <div
        style={task.category ? { backgroundColor: task.category.color } : {}}
        className="flex items-center rounded border border-slate-300"
      >
        <div className="w-full">
          <button
            className="w-full text-start"
            type="button"
            onClick={openDialog}
          >
            <Text className="px-1">{task.title}</Text>
          </button>
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
      <EditTaskDialog
        isOpen={isOpenDialog}
        handleClose={closeDialog}
        task={task}
      />
    </>
  );
}
