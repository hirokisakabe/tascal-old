import { getMonth, getDaysInMonth, getDay, getYear, getDate } from "date-fns";
import { Grid, Card, Text, Title, Button, Flex } from "@tremor/react";
import { useCallback, useMemo, useState } from "react";
import { MoveToDashboardLink } from "./move-to-dashboard-link";
import { useTaskList } from "@/lib";
import { Task } from "@/model";

export function TaskCalender() {
  const { month, moveToBefore, moveToAfter } = useMonth();

  const monthFirstDate = useMemo(() => convertMonthStrToDate(month), [month]);

  const title = useMemo(
    () => `${getYear(monthFirstDate)} / ${getMonth(monthFirstDate) + 1}`,
    [monthFirstDate]
  );

  const taskList = useTaskList({
    month: convertDateToMonthStr(monthFirstDate),
  });

  const calenderData = useMemo(() => {
    const monthDays = getDaysInMonth(monthFirstDate);

    return [...Array(monthDays)]
      .map((_, i) => i)
      .map((index) => {
        if (!taskList) {
          return { day: index, tasks: [] };
        }

        const tasks: Task[] = [];

        taskList.forEach((task) => {
          if (!task.targetDate) {
            // Taskを取得する時点でフィルタしているので、ここには来ないはず
            console.error("task.targetDate is undefined.");
            return;
          }

          if (getDate(new Date(task.targetDate)) === index + 1) {
            tasks.push(task);
          }
        });

        return { day: index, tasks };
      });
  }, [monthFirstDate, taskList]);

  const firstDayOfNumber = getDay(monthFirstDate);

  return (
    <div className="w-full">
      <MoveToDashboardLink />
      <div className="py-3">
        <Flex className="pt-3">
          <div>
            <Button onClick={moveToBefore}>前</Button>
          </div>
          <div>
            <Title>{title}</Title>
          </div>
          <div>
            <Button onClick={moveToAfter}>次</Button>
          </div>
        </Flex>
      </div>
      <div>
        <Calender data={calenderData} firstDayOfNumber={firstDayOfNumber} />
      </div>
    </div>
  );
}

function useMonth() {
  const defaultSelectedMonth = useMemo(() => {
    const today = new Date();
    const thisMonth = getMonth(today) + 1;
    const thisYear = getYear(today);
    const m = `${thisMonth}`.padStart(2, "0");

    return `${thisYear}-${m}`;
  }, []);

  const [month, setMonth] = useState(defaultSelectedMonth); // 2020-01

  const moveToBefore = useCallback(() => {
    function move(month: string) {
      const firstDay = new Date(`${month}-01`);
      const m = getMonth(firstDay) + 1;

      if (m !== 1) {
        const resultMonth = `${m - 1}`.padStart(2, "0");
        return `${getYear(firstDay)}-${resultMonth}`;
      }
      return `${getYear(firstDay) - 1}-12`;
    }

    setMonth((m) => move(m));
  }, []);

  const moveToAfter = useCallback(() => {
    function move(month: string) {
      const firstDay = new Date(`${month}-01`);
      const m = getMonth(firstDay) + 1;

      if (m !== 12) {
        const resultMonth = `${m + 1}`.padStart(2, "0");
        return `${getYear(firstDay)}-${resultMonth}`;
      }
      return `${getYear(firstDay) + 1}-01`;
    }

    setMonth((m) => move(m));
  }, []);

  return {
    month,
    moveToBefore,
    moveToAfter,
  };
}

function convertMonthStrToDate(month: string) {
  return new Date(`${month}-01`);
}

function convertDateToMonthStr(date: Date) {
  const mm = `${getMonth(date) + 1}`.padStart(2, "0");
  const yyyy = getYear(date);
  return `${yyyy}-${mm}`;
}

function Calender({
  data,
  firstDayOfNumber,
}: {
  data: { day: number; tasks: Task[] }[];
  firstDayOfNumber: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}) {
  return (
    <Grid numItems={7} className="gap-4">
      {[...Array(firstDayOfNumber)]
        .map((_, i) => i)
        .map((i) => (
          <CalenderBeforeMonthDayCell key={i} />
        ))}
      {data.map(({ day, tasks }) => (
        <CalenderDayCell key={day} index={day} tasks={tasks} />
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

function CalenderDayCell({ index, tasks }: { index: number; tasks: Task[] }) {
  const tasksToShow = tasks.length > 3 ? tasks.slice(0, 3) : tasks;
  const numberOfDummyTasks = tasks.length > 3 ? 0 : 3 - tasks.length;

  return (
    <Card>
      <Text>{index + 1} 日</Text>
      {tasksToShow.map((task) => (
        <Text key={task.id}>{task.title}</Text>
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