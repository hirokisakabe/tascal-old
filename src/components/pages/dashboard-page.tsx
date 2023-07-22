"use client";

import { redirect } from "next/navigation";
import { TabList, Tab, TabGroup, TabPanels, TabPanel } from "@tremor/react";
import { Header } from "../parts";
import { TaskListTab, TaskCalenderTab } from "../tab";
import { useAuth } from "@/lib";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className="px-3 py-1">
          <Header />
        </div>
        <main className="px-3 py-1">
          <TabGroup>
            <TabList className="mt-8">
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
    </DndProvider>
  );
}
