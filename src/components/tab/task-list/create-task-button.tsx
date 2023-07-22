import { useCallback, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { CreateTaskDialog } from "@/components/parts/create-task-dialog";

export function CreateTaskButton() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const openDialog = useCallback(() => setIsOpenDialog(true), []);
  const closeDialog = useCallback(() => setIsOpenDialog(false), []);

  return (
    <>
      <button onClick={openDialog}>
        <PlusIcon className="w-8" />
      </button>
      <CreateTaskDialog isOpen={isOpenDialog} handleClose={closeDialog} />
    </>
  );
}
