import { useCallback } from "react";
import { Typography, Button } from "../parts";
import { CommonDialog } from "./common-dialog";

export function CommonConfirmDialog({
  isOpen,
  handleClose,
  onSubmit,
  title,
  message,
}: {
  isOpen: boolean;
  handleClose: () => unknown;
  onSubmit: () => unknown;
  title: string;
  message: string;
}) {
  const onClickOK = useCallback(() => {
    onSubmit();
    handleClose();
  }, [onSubmit, handleClose]);

  return (
    <CommonDialog isOpen={isOpen} handleClose={handleClose} title={title}>
      <div className="mt-2">
        <div className="py-2">
          <Typography>{message}</Typography>
        </div>
      </div>
      <div className="pt-3">
        <div className="-mr-2 flex justify-end space-x-2">
          <Button type="button" onClick={handleClose} color="secondary">
            キャンセル
          </Button>
          <Button type="button" onClick={onClickOK}>
            OK
          </Button>
        </div>
      </div>
    </CommonDialog>
  );
}
