"use client";

import { redirect } from "next/navigation";
import { Button } from "../parts";
import { useAuth, useSignIn } from "@/lib";

export function IndexPage() {
  const auth = useAuth();
  const { signIn } = useSignIn();

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
      <Button onClick={() => signIn()}>Sign In</Button>
    </main>
  );
}
