"use client";

import { redirect } from "next/navigation";
import { CreateTaskButton } from "../parts/create-task-button";
import { SignOutButton } from "../parts/signout-button";
import { useAuth } from "@/lib";

export function DashboardPage() {
  const auth = useAuth();

  if (auth.status === "loading") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>Loading...</div>
      </main>
    );
  }
  if (auth.status === "not_authenticated") {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignOutButton />
      <CreateTaskButton />
    </main>
  );
}
