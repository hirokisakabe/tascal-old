import { z } from "zod";

const Category = z.object({
  firstDayOfWeek: z.enum(["monday", "sunday"]),
});

export type Category = z.infer<typeof Category>;

export function isCategory(target: unknown) {
  return Category.safeParse(target);
}
