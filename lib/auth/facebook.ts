import { signIn } from "next-auth/react";

export async function signInWithFacebook() {
  return await signIn("facebook", {
    callbackUrl: "/",
  });
}