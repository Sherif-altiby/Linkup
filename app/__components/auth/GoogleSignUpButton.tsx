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
      className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 w-full h-14 mka-center text-blue-700 text-3xl"
      onClick={handleGoogleSignUp}
      >
      <FaGoogle />
    </button>
  );
};

