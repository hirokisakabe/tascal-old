import { useState } from "react";
import { format, isWeekend } from "date-fns";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Typography } from "../parts";
import { CreateTaskButton } from "./create-task-button";
import { TaskBoxContainer } from "./task-box-container";
import { Task, YearMonthDay, convertYearMonthDayToStr } from "@/model";

type Props = {
  title: string;
  calenderData: {
    ymd: {
      year: number;
      month: number;
      day: number;
    };
    tasks: Task[];
  }[];
  moveToBefore: () => unknown;
  moveToAfter: () => unknown;
  firstDayOfNumber: 0 | 2 | 1 | 3 | 4 | 5 | 6;
  lastDayOfNumber: 0 | 2 | 1 | 3 | 4 | 5 | 6;
  firstDay: "monday" | "sunday";
};

export function TaskCalender(props: Props) {
  const {
    title,
    calenderData,
    moveToBefore,
    moveToAfter,
    firstDayOfNumber,
    lastDayOfNumber,
    firstDay,
  } = props;

  return (
    <div className="w-full py-3">
      <div className="flex justify-between py-1">
        <div>
          <button onClick={moveToBefore}>
            <ChevronLeftIcon className="w-5" />
          </button>
        </div>
        <div>
          <Typography size="text-xl">{title}</Typography>
        </div>
        <div>
          <button onClick={moveToAfter}>
            <ChevronRightIcon className="w-5" />
          </button>
        </div>
      </div>
      <div className="py-1">
        <Calender
          data={calenderData}
          firstDayOfNumber={firstDayOfNumber}
          lastDayOfNumber={lastDayOfNumber}
          firstDay={firstDay}
        />
      </div>
    </div>
  );
}

function Calender({
  data,
  firstDayOfNumber,
  lastDayOfNumber,
  firstDay,
}: {
  data: { ymd: YearMonthDay; tasks: Task[] }[];
  firstDayOfNumber: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  lastDayOfNumber: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstDay: "monday" | "sunday";
}) {
  const numOfBeforeMonthCells = (() => {
    if (firstDay === "monday") {
      return firstDayOfNumber === 0 ? 6 : firstDayOfNumber - 1;
    }
    return firstDayOfNumber;
  })();

  const numOfAfterMonthCells = (() => {
    if (firstDay === "monday") {
      return lastDayOfNumber === 0 ? 0 : 7 - lastDayOfNumber;
    }
    return lastDayOfNumber;
  })();

  return (
    <div className="grid grid-cols-7 border-b border-r">
      {[...Array(7)]
        .map((_, i) => i)
        .map((i) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <CalenderDayNameCell
            key={i}
            dayNumber={i as any}
            firstDay={firstDay}
          />
        ))}
      {[...Array(numOfBeforeMonthCells)]
        .map((_, i) => i)
        .map((i) => (
          <CalenderBeforeMonthDayCell key={i} />
        ))}
      {data.map(({ ymd, tasks }) => (
        <CalenderDayCell key={ymd.day} ymd={ymd} tasks={tasks} />
      ))}
      {[...Array(numOfAfterMonthCells)]
        .map((_, i) => i)
        .map((i) => (
          <CalenderBeforeMonthDayCell key={i} />
        ))}
    </div>
  );
}

function CalenderBeforeMonthDayCell() {
  return <div className="border-l border-t p-1"></div>;
}

function CalenderDayCell({ ymd, tasks }: { ymd: YearMonthDay; tasks: Task[] }) {
  const [showAll, setShowAll] = useState(false);

  const DEFAULT_NUMBER_OF_TASKS_TO_SHOW = 3;
  const needShowMore = tasks.length > DEFAULT_NUMBER_OF_TASKS_TO_SHOW;

  const tasksToShow = (() => {
    if (showAll) {
      return tasks;
    }
    return needShowMore
      ? tasks.slice(0, DEFAULT_NUMBER_OF_TASKS_TO_SHOW)
      : tasks;
  })();
  const numberOfDummyTasks = needShowMore
    ? 0
    : DEFAULT_NUMBER_OF_TASKS_TO_SHOW - tasks.length;

  const isToday =
    convertYearMonthDayToStr(ymd) === format(new Date(), "yyyy-MM-dd");

  return (
    <WeekendColor ymd={ymd}>
      <div className="border-l border-t">
        <div className="p-1">
          <div className="flex items-center">
            <div className="w-full">
              {isToday ? (
                <div className="text-sm font-semibold text-blue-500">
                  {ymd.day} 日
                </div>
              ) : (
                <div className="text-sm text-slate-500">{ymd.day} 日</div>
              )}
            </div>
            <div className="flex justify-end">
              <div className="flex items-center py-1">
                <CreateTaskButton ymd={ymd} />
              </div>
            </div>
          </div>
          <div className="space-y-0.5">
            {tasksToShow.map((task) => (
              <div className="px-1" key={task.id}>
                <TaskBoxContainer task={task} />
              </div>
            ))}
          </div>
          {[...Array(numberOfDummyTasks)]
            .map((_, i) => i)
            .map((i) => (
              <div key={i} className="invisible">
                <Typography>____</Typography>
              </div>
            ))}
          {(() => {
            if (!needShowMore) {
              return (
                <div className="invisible">
                  <Typography>____</Typography>
                </div>
              );
            }

            return showAll ? (
              <div className="w-full py-1 text-end text-slate-500">
                <button type="button" onClick={() => setShowAll(false)}>
                  show less
                </button>
              </div>
            ) : (
              <div className="w-full py-1 text-end text-slate-500">
                <button type="button" onClick={() => setShowAll(true)}>
                  show more
                </button>
              </div>
            );
          })()}
        </div>
      </div>
    </WeekendColor>
  );
}

function WeekendColor({
  children,
  ymd,
}: {
  children: React.ReactNode;
  ymd: YearMonthDay;
}) {
  const weekend = isWeekend(new Date(convertYearMonthDayToStr(ymd)));

  return weekend ? (
    <div className="bg-red-50"> {children}</div>
  ) : (
    <div>{children}</div>
  );
}

function CalenderDayNameCell({
  dayNumber,
  firstDay,
}: {
  dayNumber: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstDay: "monday" | "sunday";
}) {
  return (
    <div className="border-l border-t pl-2">
      <div className="text-sm text-slate-500">
        {convertDateToDayName(dayNumber, firstDay)}
      </div>
    </div>
  );
}

function convertDateToDayName(
  dayNumber: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  firstDay: "monday" | "sunday",
) {
  const n = (() => {
    if (firstDay === "monday") {
      return dayNumber === 6 ? 0 : dayNumber + 1;
    }
    return dayNumber;
  })();

  const dayName = (() => {
    switch (n) {
      case 0:
        return "日";
      case 1:
        return "月";
      case 2:
        return "火";
      case 3:
        return "水";
      case 4:
        return "木";
      case 5:
        return "金";
      case 6:
        return "土";
    }
  })();

  return dayName;
}
