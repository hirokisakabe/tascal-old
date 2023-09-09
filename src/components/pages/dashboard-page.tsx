"use client";

import { redirect } from "next/navigation";
import { TabList, Tab, TabGroup, TabPanels, TabPanel } from "@tremor/react";
import { Header } from "../header";
import { TaskCalenderTab } from "../task-calender-tab";
import { TaskListTab } from "../task-list-tab";
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
    <div>
      <div className="px-3 py-1">
        <Header />
      </div>
      <main className="px-3 py-1">
        <TabGroup>
          <TabList>
            <Tab>タスク一覧</Tab>
            <Tab>カレンダー</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TaskListTab />
            </TabPanel>
            <TabPanel>
              <TaskCalenderTab />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </main>
    </div>
  );
}
