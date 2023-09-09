import { Button, Flex, Text } from "@tremor/react";
import { useCallback } from "react";
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
          <Text>{message}</Text>
        </div>
      </div>
      <Flex className="pt-3">
        <Flex justifyContent="end" className="-mr-2 space-x-2">
          <Button type="button" onClick={handleClose}>
            キャンセル
          </Button>
          <Button type="button" onClick={onClickOK}>
            OK
          </Button>
        </Flex>
      </Flex>
    </CommonDialog>
  );
}
