import { z } from "zod";

const Task = z.object({
  id: z.string(),
  title: z.string(),
  isCompleted: z.boolean(),
  targetDate: z.nullable(z.string()),
  category: z.nullable(
    z.object({
      id: z.string(),
      name: z.string(),
      color: z.string(),
    }),
  ),
});

export type Task = z.infer<typeof Task>;

export function isTask(target: unknown) {
  return Task.safeParse(target);
}
