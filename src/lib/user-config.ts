import { doc, setDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { getUserId, useAuth } from "./auth";
import { firestore } from "@/config";
import { isUserConfig } from "@/model/user-config";

export async function setUserConfig({
  firstDayOfWeek,
}: {
  firstDayOfWeek: "monday" | "sunday";
}) {
  const userId = getUserId();

  if (!userId) {
    console.error("Failed to get userId");
    return;
  }

  await setDoc(doc(firestore, "users", userId, "user_config"), {
    firstDayOfWeek,
  });
}

export function useUserConfig() {
  const auth = useAuth();
  const uid = auth.status === "authenticated" ? auth.user.uid : undefined;

  const ref = doc(firestore, `users/${uid}/user_config`);

  const [value, loading, error] = useDocument(ref);

  if (loading) {
    return null;
  }

  if (error) {
    console.error({ error });
    return null;
  }

  if (!value) {
    return { firstDayOfWeek: "monday" } as const;
  }

  const userConfig = isUserConfig(value.data);

  if (!userConfig.success) {
    console.error("Invalid user config : " + JSON.stringify(value.data));
    return null;
  }

  return userConfig.data;
}
