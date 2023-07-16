import { Button, Flex, Text, TextInput } from "@tremor/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { CommonDialog } from "./common-dialog";
import { updateTask } from "@/lib";
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
    async (data: { [x: string]: any }) => {
      await updateTask({
        id: task.id,
        title: data["input-task-title"],
        targetDate: data["input-task-target-date"],
      });
      reset();
      handleClose();
    },
    [task.id, reset, handleClose]
  );

  return (
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
            <Button type="submit">更新</Button>
          </Flex>
        </Flex>
      </form>
    </CommonDialog>
  );
}
