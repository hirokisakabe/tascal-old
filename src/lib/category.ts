import { collection, addDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { getUserId, useAuth } from "./auth";
import { firestore } from "@/config";
import { Category, isCategory } from "@/model";

export async function createCategory({
  name,
  color,
}: {
  name: string;
  color: string;
}) {
  const userId = getUserId();

  if (!userId) {
    console.error("Failed to get userId");
    return;
  }

  await addDoc(collection(firestore, "users", userId, "categories"), {
    name,
    color,
  });
}

export function useCategories() {
  const auth = useAuth();
  const uid = auth.status === "authenticated" ? auth.user.uid : undefined;

  const ref = collection(firestore, `users/${uid}/categories`);

  const [value, loading, error] = useCollection(ref);

  if (loading) {
    return null;
  }

  if (error) {
    console.error({ error });
    return null;
  }

  const result: Category[] = [];

  value?.docs.forEach((doc) => {
    const maybeCategory = { id: doc.id, ...doc.data() };

    const parsedTask = isCategory(maybeCategory);
    if (parsedTask.success) {
      result.push(parsedTask.data);

      return;
    }

    console.error("Invalid category : " + JSON.stringify(maybeCategory));
  });

  return result;
}
