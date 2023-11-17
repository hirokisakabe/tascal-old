import { z } from "zod";

const UserConfig = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

export type UserConfig = z.infer<typeof UserConfig>;

export function isUserConfig(target: unknown) {
  return UserConfig.safeParse(target);
}
