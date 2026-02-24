"use client";

import { FaGoogle } from 'react-icons/fa'
import { toast } from "react-hot-toast";
import { signInWithGoogle } from '@/lib/auth/google';

export default function GoogleSignUpButton() {

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      toast.success("Redirecting to home...");
    } catch (err) {
      console.error(err);
      toast.error("Google sign-up failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleGoogleSignUp}
      className="flex items-center justify-center gap-2.5 w-full py-2.5 rounded-xl bg-gray-800 border border-gray-700 hover:border-amber-500/40 hover:bg-gray-800/80 text-gray-300 hover:text-gray-100 text-sm font-medium transition-all duration-200"
    >
      <FaGoogle className="text-[#EA4335] text-lg" />
      <span>Google</span>
    </button>
  );
}