import { act, renderHook } from "@testing-library/react";
import { useTaskCalender } from "./use-task-card-list";
import { useTaskList } from "@/lib";

jest.mock("@/lib");

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

  expect(result.current.taskList).toEqual([
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
  expect(result.current.excludeIsCompleted).toEqual(true);
  expect(useTaskList).toHaveBeenNthCalledWith(1, { isCompleted: false });
});

test("タスクがない場合、データを取得できること", () => {
  jest.mocked(useTaskList).mockReturnValue(null);

  const { result } = renderHook(() => useTaskCalender());

  expect(result.current.taskList).toBeNull();
  expect(result.current.excludeIsCompleted).toEqual(true);
  expect(useTaskList).toHaveBeenNthCalledWith(1, { isCompleted: false });
});

test("toggleExcludeIsCompletedの操作がexcludeIsCompletedに反映されること", () => {
  jest.mocked(useTaskList).mockReturnValue(null);

  const { result } = renderHook(() => useTaskCalender());

  expect(result.current.excludeIsCompleted).toEqual(true);
  expect(useTaskList).toHaveBeenNthCalledWith(1, { isCompleted: false });

  act(() => {
    result.current.toggleExcludeIsCompleted();
  });

  expect(result.current.excludeIsCompleted).toEqual(false);
  expect(useTaskList).toHaveBeenNthCalledWith(2, { isCompleted: undefined });
});
