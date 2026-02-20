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
                    className='border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 w-full h-14 mka-center text-blue-700 text-3xl' 
                    onClick={handleFacebookSignUp}
            >
                    <FaFacebook /> 
            </button>

  )
}

