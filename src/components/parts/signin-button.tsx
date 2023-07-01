import { Button } from "@tremor/react";
import { useSignIn } from "@/lib";

export function SignInButton() {
  const { signIn } = useSignIn();
  return (
    <Button size="xs" variant="secondary" onClick={() => signIn()}>
      Sign In
    </Button>
  );
}
