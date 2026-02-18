"use client"

import GoogleSignUpButton from '@/app/__components/auth/GoogleSignUpButton'
import { signup } from '@/app/actions/auth'
import Link from 'next/link'
import React, {  useState } from 'react'
import toast from 'react-hot-toast'
import { FaFacebook } from 'react-icons/fa'

const page = () => {

      const [errors, setErrors] = useState<any>(null);

      async function handleSubmit(formData: FormData) {
  try {
    const result = await signup(formData);

    if (!result.success) {

      toast.error(result.message || "Failed to sign up. Please check the form.");
      
      if (result.errors) setErrors(result.errors);
      return;
    }

    toast.success("Signup successful! Redirecting...");

    // Redirect to the home page after successful signup
    // Use client-side redirect
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);

  } catch (err: any) {

    console.error(err);
    toast.error("Something went wrong. Please try again.");
  }
}



  return (
    <div className='h-screen w-full flex items-center justify-center p-5' >
        <form className='w-full md:w-[70%] m-auto rounded-xl bg-gray-50 p-2 shadow-lg'  action={handleSubmit} > 
            <h2 className='text-xl border-b border-gray-600 pb-3 mb-3 text-center' > Signup </h2>
          <div className='flex items-center gap-2' >
                <div className='w-full' >
                      <label htmlFor="first-name">First Name</label>
                      <input type="text" id="first-name" name="first-name"  />
                      {errors?.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>
                <div className='w-full'>
                      <label htmlFor="last-name">Last Name</label>
                      <input type="text" id="last-name" name="last-name"  />
                      {errors?.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
          </div> 

          <div className='flex items-center gap-2'>
                 <div className='w-full'>
                       <label htmlFor="email">Email</label>
                       <input type="email" id="email" name="email"  />
                           {errors?.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                 </div>
                 <div className='w-full'>
                       <label htmlFor="phone">Phone</label>
                       <input type="tel" id="phone" name="phone"  />
                       {errors?.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                 </div>
          </div>

          <div className='flex items-center gap-2'>
                <div className='w-full'>
                        <label htmlFor="password">Password</label>  
                        <input type="password" id="password" name="password"  />
                        {errors?.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <div className='w-full'>
                        <label htmlFor="confirm-password">Confirm Password</label>  
                        <input type="password" id="confirm-password" name="confirm-password"  />
                        {errors?.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
          </div>

          <div className='flex flex-col md:flex-row items-center justify-between gap-2 mt-10' >
                <button type="submit" className='bg-blue-500 text-white px-4 py-2 h-14 rounded-md hover:bg-blue-600 w-full' >Sign Up</button>
                <GoogleSignUpButton />
                <button className='border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 w-full h-14 mka-center text-blue-700 text-3xl' > <FaFacebook /> </button>
          </div>

          <Link href="/login" className='text-lg text-gray-600 mt-5 block text-center hover:text-blue-500' > Already have an account? Login </Link>
    </form>
    </div>
  )
}

export default page