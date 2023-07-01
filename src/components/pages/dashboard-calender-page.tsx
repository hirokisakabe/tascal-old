"use client";

import { redirect } from "next/navigation";
import { SignOutButton } from "../parts/signout-button";
import { TaskCalender } from "../parts/task-calender";
import { useAuth } from "@/lib";

export function DashboardCalenderPage() {
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
    <main className="flex p-24">
      <TaskCalender />
    </main>
  );
}
