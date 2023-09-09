import { Button } from "@tremor/react";
import { useCallback, useState } from "react";
import { CreateCategoryDialog } from "./create-category-dialog";

export function CreateCategoryButton() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const openDialog = useCallback(() => setIsOpenDialog(true), []);
  const closeDialog = useCallback(() => setIsOpenDialog(false), []);

  return (
    <>
      <Button size="xs" variant="secondary" onClick={() => openDialog()}>
        カテゴリ作成
      </Button>
      <CreateCategoryDialog isOpen={isOpenDialog} handleClose={closeDialog} />
    </>
  );
}
