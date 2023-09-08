import { collection, addDoc } from "firebase/firestore";
import { getUserId } from "./auth";
import { firestore } from "@/config";

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
