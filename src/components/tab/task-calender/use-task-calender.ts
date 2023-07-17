import { getMonth, getDaysInMonth, getDay, getYear, getDate } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import { useTaskList } from "@/lib";
import { Task } from "@/model";

export function useTaskCalender() {
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
        const ymd = {
          year: getYear(monthFirstDate),
          month: getMonth(monthFirstDate) + 1,
          day: index + 1,
        };

        if (!taskList) {
          return { ymd, tasks: [] };
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

        return { ymd, tasks };
      });
  }, [monthFirstDate, taskList]);

  const firstDayOfNumber = getDay(monthFirstDate);

  return { title, calenderData, moveToBefore, moveToAfter, firstDayOfNumber };
}

function convertMonthStrToDate(month: string) {
  return new Date(`${month}-01`);
}

function convertDateToMonthStr(date: Date) {
  const mm = `${getMonth(date) + 1}`.padStart(2, "0");
  const yyyy = getYear(date);
  return `${yyyy}-${mm}`;
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
