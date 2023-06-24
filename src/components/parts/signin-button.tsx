import { useSignIn } from "@/lib";

export function SignInButton() {
  const { signIn } = useSignIn();
  return <button onClick={() => signIn()}>Sign In</button>;
}
