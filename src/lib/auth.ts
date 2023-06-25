import * as RFHooks from "react-firebase-hooks/auth";
import { firebaseAuth } from "@/config";

export function getUserId() {
  const uid = firebaseAuth.currentUser?.uid;

  return uid;
}

export function useAuth() {
  const [user, loading] = RFHooks.useAuthState(firebaseAuth);

  if (loading) {
    return { status: "loading" as const };
  }

  if (!user) {
    return { status: "not_authenticated" as const };
  }

  return { status: "authenticated" as const, user };
}
export function useSignIn() {
  const [signInWithGoogle] = RFHooks.useSignInWithGoogle(firebaseAuth);

  return { signIn: signInWithGoogle };
}

export function useSignOut() {
  const [signOut] = RFHooks.useSignOut(firebaseAuth);

  return { signOut };
}
