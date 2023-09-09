import { Button, Flex, Text, TextInput } from "@tremor/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { CommonDialog } from "./common-dialog";
import { CommonConfirmDialog } from "./common-confirm-dialog";
import { deleteTask, updateTask } from "@/lib";
import { Task } from "@/model";

export function EditTaskDialog({
  isOpen,
  handleClose,
  task,
}: {
  isOpen: boolean;
  handleClose: () => unknown;
  task: Task;
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      "input-task-title": task.title,
      "input-task-target-date": task.targetDate,
    },
  });

  const onSubmit = useCallback(
    async (data: { [x: string]: unknown }) => {
      const title = data["input-task-title"];
      const targetDate = data["input-task-target-date"];

      if (!(typeof title === "string")) {
        console.error(`title is invalid: ${title}`);
        return;
      }

      if (
        !(typeof targetDate === "string" || typeof targetDate === "undefined")
      ) {
        console.error(`targetDate is invalid: ${targetDate}`);
        return;
      }

      await updateTask({
        id: task.id,
        title,
        targetDate,
      });
      reset();
      handleClose();
    },
    [task.id, reset, handleClose],
  );

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const openDialog = useCallback(() => setIsOpenDialog(true), []);
  const closeDialog = useCallback(() => setIsOpenDialog(false), []);

  const onSubmitDelete = useCallback(async () => {
    await deleteTask({ id: task.id });
    handleClose();
  }, [task.id, handleClose]);

  return (
    <>
      <CommonDialog
        isOpen={isOpen}
        handleClose={handleClose}
        title="タスクを編集"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2">
            <div className="py-2">
              <Text>タイトル</Text>
            </div>
            <TextInput
              placeholder="タスクを入力"
              type="text"
              {...register("input-task-title")}
            />
          </div>
          <div className="mt-2">
            <div className="py-2">
              <Text>実施日</Text>
            </div>
            <input type="date" {...register("input-task-target-date")} />
          </div>
          <Flex className="pt-3">
            <Flex justifyContent="end" className="space-x-2 -mr-2">
              <Button type="button" onClick={handleClose}>
                キャンセル
              </Button>
              <Button type="button" onClick={openDialog}>
                削除
              </Button>
              <Button type="submit">更新</Button>
            </Flex>
          </Flex>
        </form>
      </CommonDialog>
      <CommonConfirmDialog
        isOpen={isOpenDialog}
        handleClose={closeDialog}
        onSubmit={onSubmitDelete}
        title="タスクを削除"
        message={task.title}
      />
    </>
  );
}
