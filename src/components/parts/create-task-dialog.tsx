import { Button, Flex, Text, TextInput } from "@tremor/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { CommonDialog } from "./common-dialog";
import { createTask } from "@/lib";
import { YearMonthDay, convertYearMonthDayToStr } from "@/model";

export function CreateTaskDialog({
  isOpen,
  handleClose,
  initialYmd,
}: {
  isOpen: boolean;
  handleClose: () => unknown;
  initialYmd?: YearMonthDay;
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      "input-task-title": undefined,
      "input-task-target-date":
        initialYmd && convertYearMonthDayToStr(initialYmd),
    },
  });

  const onSubmit = useCallback(
    async (data: { [x: string]: any }) => {
      await createTask({
        title: data["input-task-title"],
        targetDate: data["input-task-target-date"],
      });
      reset();
      handleClose();
    },
    [reset, handleClose]
  );

  return (
    <CommonDialog
      isOpen={isOpen}
      handleClose={handleClose}
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
            <Button type="button" onClick={handleClose}>
              キャンセル
            </Button>
            <Button type="submit">作成</Button>
          </Flex>
        </Flex>
      </form>
    </CommonDialog>
  );
}
