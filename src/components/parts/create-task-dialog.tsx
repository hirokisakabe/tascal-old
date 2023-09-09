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

      await createTask({
        title,
        targetDate,
      });
      reset();
      handleClose();
    },
    [reset, handleClose],
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
          <Flex justifyContent="end" className="-mr-2 space-x-2">
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
