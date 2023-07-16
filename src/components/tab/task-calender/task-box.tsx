import { Text } from "@tremor/react";
import { useCallback, useState } from "react";
import { EditTaskDialog } from "@/components/parts";
import { Task } from "@/model";

export function TaskBox({ task }: { task: Task }) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const openDialog = useCallback(() => setIsOpenDialog(true), []);
  const closeDialog = useCallback(() => setIsOpenDialog(false), []);

  return (
    <>
      <div className="m-2 bg-slate-100 rounded">
        <button
          className="w-full text-start"
          type="button"
          onClick={openDialog}
        >
          <Text className="px-1">{task.title}</Text>
        </button>
      </div>
      <EditTaskDialog
        isOpen={isOpenDialog}
        handleClose={closeDialog}
        task={task}
      />
    </>
  );
}
