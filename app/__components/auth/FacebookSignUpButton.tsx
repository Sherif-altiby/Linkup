"use client"

import { signInWithFacebook } from "@/lib/auth/facebook";
import toast from "react-hot-toast";
import { FaFacebook } from "react-icons/fa"

export default function FacebookSignUpButton() {

  const handleFacebookSignUp = async () => {
    try {
      await signInWithFacebook();
      toast.success("Redirecting to home...");
    } catch (err) {
      console.error(err);
      toast.error("Facebook sign-up failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleFacebookSignUp}
      className="flex items-center justify-center gap-2.5 w-full py-2.5 rounded-xl bg-gray-800 border border-gray-700 hover:border-amber-500/40 hover:bg-gray-800/80 text-gray-300 hover:text-gray-100 text-sm font-medium transition-all duration-200"
    >
      <FaFacebook className="text-[#1877F2] text-lg" />
      <span>Facebook</span>
    </button>
  )
}