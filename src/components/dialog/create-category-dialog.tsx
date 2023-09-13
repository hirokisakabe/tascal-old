import { Button, Flex } from "@tremor/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { TextInput, Typography } from "../parts";
import { CommonDialog } from "./common-dialog";
import { createCategory } from "@/lib";

export function CreateCategoryDialog({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => unknown;
}) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = useCallback(
    async (data: { [x: string]: unknown }) => {
      const name = data["input-category-name"];
      const color = data["input-category-color"];

      if (!(typeof name === "string")) {
        console.error(`name is invalid: ${name}`);
        return;
      }

      if (!(typeof color === "string")) {
        console.error(`color is invalid: ${color}`);
        return;
      }

      await createCategory({
        name,
        color,
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
      title="カテゴリを作成"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2">
          <div className="py-2">
            <Typography>カテゴリ名</Typography>
          </div>
          <TextInput
            placeholder="カテゴリ名を入力"
            {...register("input-category-name")}
          />
        </div>
        <div className="mt-2">
          <div className="py-2">
            <Typography>色</Typography>
          </div>
          <input type="color" {...register("input-category-color")} />
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
