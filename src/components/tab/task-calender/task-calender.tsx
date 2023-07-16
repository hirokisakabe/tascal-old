import { format } from "date-fns";
import { Grid, Card, Text, Title, Flex } from "@tremor/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { CreateTaskButton } from "./create-task-button";
import { TaskBox } from "./task-box";
import { Task, YearMonthDay, convertYearMonthDayToStr } from "@/model";

type Props = {
  title: string;
  calenderData: {
    ymd: {
      year: number;
      month: number;
      day: number;
    };
    tasks: {
      id: string;
      title: string;
      isCompleted: boolean;
      targetDate: string | null;
    }[];
  }[];
  moveToBefore: () => unknown;
  moveToAfter: () => unknown;
  firstDayOfNumber: 0 | 2 | 1 | 3 | 4 | 5 | 6;
};

export function TaskCalender(props: Props) {
  const { title, calenderData, moveToBefore, moveToAfter, firstDayOfNumber } =
    props;

  return (
    <div className="py-3 w-full">
      <Flex className="pt-3">
        <div className="py-1">
          <button onClick={moveToBefore}>
            <ChevronLeftIcon className="w-8" />
          </button>
        </div>
        <div className="py-1">
          <Title>{title}</Title>
        </div>
        <div className="py-1">
          <button onClick={moveToAfter}>
            <ChevronRightIcon className="w-8" />
          </button>
        </div>
      </Flex>
      <div className="py-1">
        <Calender data={calenderData} firstDayOfNumber={firstDayOfNumber} />
      </div>
    </div>
  );
}

function Calender({
  data,
  firstDayOfNumber,
}: {
  data: { ymd: YearMonthDay; tasks: Task[] }[];
  firstDayOfNumber: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}) {
  return (
    <Grid numItems={7} className="gap-4">
      {[...Array(7)]
        .map((_, i) => i)
        .map((i) => (
          <CalenderDayNameCell key={i} dayNumber={i as any} />
        ))}
      {[...Array(firstDayOfNumber)]
        .map((_, i) => i)
        .map((i) => (
          <CalenderBeforeMonthDayCell key={i} />
        ))}
      {data.map(({ ymd, tasks }) => (
        <CalenderDayCell key={ymd.day} ymd={ymd} tasks={tasks} />
      ))}
    </Grid>
  );
}

function CalenderBeforeMonthDayCell() {
  return (
    <Card>
      <Text>...</Text>
    </Card>
  );
}

function CalenderDayCell({ ymd, tasks }: { ymd: YearMonthDay; tasks: Task[] }) {
  const tasksToShow = tasks.length > 3 ? tasks.slice(0, 3) : tasks;
  const numberOfDummyTasks = tasks.length > 3 ? 0 : 3 - tasks.length;

  const isToday =
    convertYearMonthDayToStr(ymd) === format(new Date(), "yyyy-MM-dd");

  return (
    <Card>
      <div className="flex">
        {isToday ? (
          <Text className="basis-5/6 font-semibold text-blue-500">
            {ymd.day} 日
          </Text>
        ) : (
          <Text className="basis-5/6">{ymd.day} 日</Text>
        )}
        <div className="basis-1/6 p-1">
          <CreateTaskButton ymd={ymd} />
        </div>
      </div>
      {tasksToShow.map((task) => (
        <TaskBox key={task.id} task={task} />
      ))}
      {[...Array(numberOfDummyTasks)]
        .map((_, i) => i)
        .map((i) => (
          <Text key={i} className="invisible">
            ____
          </Text>
        ))}
      {tasks.length > 4 ? (
        <Text>...</Text>
      ) : (
        <Text className="invisible">____</Text>
      )}
    </Card>
  );
}

function CalenderDayNameCell({
  dayNumber,
}: {
  dayNumber: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}) {
  return (
    <div className="pl-2">
      <Text>{convertDateToDayName(dayNumber)}</Text>
    </div>
  );
}

function convertDateToDayName(dayNumber: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
  const dayName = (() => {
    switch (dayNumber) {
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
