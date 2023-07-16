import {
  collection,
  addDoc,
  updateDoc,
  doc,
  where,
  query,
  QueryFieldFilterConstraint,
} from "firebase/firestore";
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

  const targetMonth = targetDate && targetDate.slice(0, 7); // 2020-01-02 -> 2022-01

  const docRef = await addDoc(collection(firestore, "users", userId, "tasks"), {
    title,
    isCompleted: false,
    userId,
    targetDate: targetDate || null, // 空文字はnullに変換する
    targetMonth: targetMonth || null,
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

export function useTaskList(options?: {
  month?: string;
  isCompleted?: boolean;
}) {
  const month = options?.month;
  const isCompleted = options?.isCompleted;

  const auth = useAuth();
  const uid = auth.status === "authenticated" ? auth.user.uid : undefined;

  const ref = collection(firestore, `users/${uid}/tasks`);

  const targetMonthFilter =
    month !== undefined ? where("targetMonth", "==", month) : undefined;
  const isCompletedFilter =
    isCompleted !== undefined
      ? where("isCompleted", "==", isCompleted)
      : undefined;

  const filter: QueryFieldFilterConstraint[] = [];
  if (targetMonthFilter) {
    filter.push(targetMonthFilter);
  }
  if (isCompletedFilter) {
    filter.push(isCompletedFilter);
  }

  const q = filter.length > 0 ? query(ref, ...filter) : ref;

  const [value, loading, error] = useCollection(q);

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
