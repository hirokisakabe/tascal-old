import { useCallback, useState } from "react";
import { FolderPlusIcon } from "@heroicons/react/20/solid";
import { CreateCategoryDialog } from "@/components/dialog";

export function CreateCategoryButton() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const openDialog = useCallback(() => setIsOpenDialog(true), []);
  const closeDialog = useCallback(() => setIsOpenDialog(false), []);

  return (
    <>
      <button
        className="group         flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-blue-500 hover:text-white"
        onClick={() => openDialog()}
      >
        <FolderPlusIcon className="mr-2 h-5 w-5" aria-hidden="true" />
        カテゴリ作成
      </button>
      <CreateCategoryDialog isOpen={isOpenDialog} handleClose={closeDialog} />
    </>
  );
}
