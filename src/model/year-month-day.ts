import { z } from "zod";

const YearMonthDay = z.object({
  year: z.number(),
  month: z.number(),
  day: z.number(), // 1~31
});

export type YearMonthDay = z.infer<typeof YearMonthDay>;

export function isYearMonthDay(target: unknown) {
  return YearMonthDay.safeParse(target);
}

export function convertYearMonthDayToStr(ymd: YearMonthDay) {
  const y = ymd.year;
  const m = `${ymd.month}`.padStart(2, "0");
  const d = `${ymd.day}`.padStart(2, "0");
  return `${y}-${m}-${d}` as const;
}
