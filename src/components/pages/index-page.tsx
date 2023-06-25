"use client";

import { useAuth } from "@/lib";

import { redirect } from "next/navigation";
import { SignInButton } from "../parts";

export function IndexPage() {
  const auth = useAuth();

  if (auth.status === "loading") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>Loading...</div>
      </main>
    );
  }
  if (auth.status === "authenticated") {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignInButton />
    </main>
  );
}
