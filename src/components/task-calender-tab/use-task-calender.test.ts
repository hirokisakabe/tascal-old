import { renderHook } from "@testing-library/react";
import { useTaskCalender } from "./use-task-calender";
import { useTaskList } from "@/lib";

jest.mock("@/lib");
jest.useFakeTimers();
jest.setSystemTime(new Date(2023, 0, 1));

beforeEach(() => {
  jest.resetAllMocks();
});

test("タスクがある場合、データを取得できること", () => {
  jest.mocked(useTaskList).mockReturnValue([
    {
      id: "1",
      title: "dummy_title_1",
      isCompleted: true,
      targetDate: "2023-01-01",
    },
    {
      id: "2",
      title: "dummy_title_2",
      isCompleted: false,
      targetDate: "2023-01-01",
    },
    {
      id: "3",
      title: "dummy_title_3",
      isCompleted: false,
      targetDate: "2023-01-02",
    },
  ]);

  const { result } = renderHook(() => useTaskCalender());

  expect(result.current.title).toEqual("2023 / 1");
  expect(result.current.firstDayOfNumber).toEqual(0);
  expect(result.current.lastDayOfNumber).toEqual(2);
  expect(result.current.calenderData).toEqual([
    {
      tasks: [
        {
          id: "1",
          title: "dummy_title_1",
          isCompleted: true,
          targetDate: "2023-01-01",
        },
        {
          id: "2",
          title: "dummy_title_2",
          isCompleted: false,
          targetDate: "2023-01-01",
        },
      ],
      ymd: { day: 1, month: 1, year: 2023 },
    },
    {
      tasks: [
        {
          id: "3",
          title: "dummy_title_3",
          isCompleted: false,
          targetDate: "2023-01-02",
        },
      ],
      ymd: { day: 2, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 3, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 4, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 5, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 6, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 7, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 8, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 9, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 10, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 11, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 12, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 13, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 14, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 15, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 16, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 17, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 18, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 19, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 20, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 21, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 22, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 23, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 24, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 25, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 26, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 27, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 28, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 29, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 30, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 31, month: 1, year: 2023 },
    },
  ]);
  expect(useTaskList).toHaveBeenNthCalledWith(1, { month: "2023-01" });
});

test("タスクがない場合、データを取得できること", () => {
  jest.mocked(useTaskList).mockReturnValue(null);

  const { result } = renderHook(() => useTaskCalender());

  expect(result.current.title).toEqual("2023 / 1");
  expect(result.current.firstDayOfNumber).toEqual(0);
  expect(result.current.lastDayOfNumber).toEqual(2);
  expect(result.current.calenderData).toEqual([
    {
      tasks: [],
      ymd: { day: 1, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 2, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 3, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 4, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 5, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 6, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 7, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 8, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 9, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 10, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 11, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 12, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 13, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 14, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 15, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 16, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 17, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 18, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 19, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 20, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 21, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 22, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 23, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 24, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 25, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 26, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 27, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 28, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 29, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 30, month: 1, year: 2023 },
    },
    {
      tasks: [],
      ymd: { day: 31, month: 1, year: 2023 },
    },
  ]);
  expect(useTaskList).toHaveBeenNthCalledWith(1, { month: "2023-01" });
});
