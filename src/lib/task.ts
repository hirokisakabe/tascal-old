import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { getUserId, useAuth } from "./auth";
import { firestore } from "@/config";
import { Task, isTask } from "@/model";

export async function createTask({
  title,
  targetDate,
}: {
  title: string;
  targetDate?: string;
}) {
  const userId = getUserId();

  if (!userId) {
    console.error("Failed to get userId");
    return;
  }

  const docRef = await addDoc(collection(firestore, "users", userId, "tasks"), {
    title,
    isCompleted: false,
    userId,
    targetDate: targetDate || null, // 空文字はnullに変換する
  });

  console.log("Document written with ID: ", docRef.id);
}

export async function completeTask({ id }: { id: string }) {
  const userId = getUserId();

  if (!userId) {
    console.error("Failed to get userId");
    return;
  }

  await updateDoc(doc(firestore, "users", userId, "tasks", id), {
    isCompleted: true,
  });
}

export function useTaskList() {
  const auth = useAuth();
  const uid = auth.status === "authenticated" ? auth.user.uid : undefined;

  const ref = collection(firestore, `users/${uid}/tasks`);

  const [value, loading, error] = useCollection(ref);

  if (loading) {
    return null;
  }

  if (error) {
    console.error({ error });
    return null;
  }

  const result: Task[] = [];

  value?.docs.forEach((doc) => {
    const maybeTask = { id: doc.id, ...doc.data() };

    const parsedTask = isTask(maybeTask);
    if (parsedTask.success) {
      result.push(parsedTask.data);

      return;
    }

    console.error("Invalid task : " + JSON.stringify(maybeTask));
  });

  return result;
}