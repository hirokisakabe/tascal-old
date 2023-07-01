import { Button } from "@tremor/react";
import { useSignOut } from "@/lib";

export function SignOutButton() {
  const { signOut } = useSignOut();
  return (
    <Button size="xs" variant="secondary" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
}
