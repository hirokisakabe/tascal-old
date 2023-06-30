import { Button, Flex, Text, TextInput } from "@tremor/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { CommonDialog } from "./common-dialog";
import { createTask } from "@/lib";

export function CreateTaskButton() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const openDialog = useCallback(() => setIsOpenDialog(true), []);
  const closeDialog = useCallback(() => setIsOpenDialog(false), []);

  const { register, handleSubmit } = useForm({});

  const onSubmit = useCallback(
    async (data: { [x: string]: any }) => {
      console.log(data);
      await createTask({
        title: data["input-task-title"],
        targetDate: data["input-task-target-date"],
      });
      closeDialog();
    },
    [closeDialog]
  );

  return (
    <>
      <Button onClick={openDialog}>タスクを作成</Button>
      <CommonDialog
        isOpen={isOpenDialog}
        handleClose={closeDialog}
        title="タスクを作成"
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
              <Button type="button" onClick={closeDialog}>
                キャンセル
              </Button>
              <Button type="submit" onClick={closeDialog}>
                作成
              </Button>
            </Flex>
          </Flex>
        </form>
      </CommonDialog>
    </>
  );
}
