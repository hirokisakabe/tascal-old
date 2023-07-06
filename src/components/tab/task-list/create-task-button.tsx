import { Button } from "@tremor/react";
import { useCallback, useState } from "react";
import { CreateTaskDialog } from "@/components/parts/create-task-dialog";

export function CreateTaskButton() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const openDialog = useCallback(() => setIsOpenDialog(true), []);
  const closeDialog = useCallback(() => setIsOpenDialog(false), []);

  return (
    <>
      <Button size="xs" variant="secondary" onClick={openDialog}>
        タスクを作成
      </Button>
      <CreateTaskDialog isOpen={isOpenDialog} handleClose={closeDialog} />
    </>
  );
}
