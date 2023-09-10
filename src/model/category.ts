import { z } from "zod";

const Category = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

export type Category = z.infer<typeof Category>;

export function isCategory(target: unknown) {
  return Category.safeParse(target);
}
