import { collection, addDoc } from "firebase/firestore";
import { getUserId } from "./auth";
import { firestore } from "@/config";

export async function createTask({ title }: { title: string }) {
  const userId = getUserId();

  if (!userId) {
    console.error("Failed to get userId");
    return;
  }

  const docRef = await addDoc(collection(firestore, "users", userId, "tasks"), {
    title,
    isCompleted: false,
    userId,
  });

  console.log("Document written with ID: ", docRef.id);
}
