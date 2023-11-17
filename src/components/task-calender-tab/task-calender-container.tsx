import { useTaskCalender } from "./use-task-calender";
import { TaskCalender } from "./task-calender";
import { useUserConfig } from "@/lib/user-config";

export function TaskCalenderContainer() {
  const {
    title,
    calenderData,
    moveToBefore,
    moveToAfter,
    firstDayOfNumber,
    lastDayOfNumber,
  } = useTaskCalender();
  const {f} = useUserConfig()

  return (
    <TaskCalender
      title={title}
      calenderData={calenderData}
      moveToBefore={moveToBefore}
      moveToAfter={moveToAfter}
      firstDayOfNumber={firstDayOfNumber}
      lastDayOfNumber={lastDayOfNumber}
      firstDay="monday"
    />
  );
}
