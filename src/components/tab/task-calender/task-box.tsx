import { Text } from "@tremor/react";
import { useCallback, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { EditTaskDialog } from "@/components/parts";
import { Task } from "@/model";
import { useDrag } from "react-dnd";

type Props = { task: Task; completeTask: ({ id }: { id: string }) => unknown };

const ItemTypes = {
  text: "knight",
};
export function TaskBox({ task, completeTask }: Props) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const openDialog = useCallback(() => setIsOpenDialog(true), []);
  const closeDialog = useCallback(() => setIsOpenDialog(false), []);

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.text,
      //item: { text: "hoge" },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  return (
    <>
      <div className="m-2 bg-slate-100 rounded flex items-center" ref={dragRef}>
        <div className="w-full">
          <button
            className="w-full text-start"
            type="button"
            onClick={openDialog}
          >
            <Text className="px-1">{task.title}</Text>
          </button>
        </div>
        <div className="w-fit p-1 ml-3">
          <div className="flex items-center">
            {task.isCompleted ? (
              <button disabled>
                <CheckIcon className="w-5 rounded-full text-white bg-gray-300" />
              </button>
            ) : (
              <button onClick={() => completeTask({ id: task.id })}>
                <CheckIcon className="w-5 rounded-full" />
              </button>
            )}
          </div>
        </div>
      </div>
      <EditTaskDialog
        isOpen={isOpenDialog}
        handleClose={closeDialog}
        task={task}
      />
    </>
  );
}
