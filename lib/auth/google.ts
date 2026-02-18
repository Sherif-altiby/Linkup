import { signIn } from "next-auth/react";

export async function signInWithGoogle() {
  return await signIn("google", {
    callbackUrl: "/",
  });
}
