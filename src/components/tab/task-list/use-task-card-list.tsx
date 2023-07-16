import { useCallback, useState } from "react";
import { useTaskList } from "@/lib";

export function useTaskCalender() {
  const [excludeIsCompleted, setExcludeIsCompleted] = useState(false);

  const toggleExcludeIsCompleted = useCallback(
    () => setExcludeIsCompleted((prev) => !prev),
    []
  );

  const taskList = useTaskList({
    isCompleted: excludeIsCompleted ? false : undefined,
  });

  return { taskList, excludeIsCompleted, toggleExcludeIsCompleted };
}
