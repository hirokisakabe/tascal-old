import { useTaskCalender } from "./use-task-calender";
import { TaskCalender } from "./task-calender";

export function TaskCalenderContainer() {
  const {
    title,
    calenderData,
    moveToBefore,
    moveToAfter,
    firstDayOfNumber,
    lastDayOfNumber,
  } = useTaskCalender();

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
