"use client"

import FacebookSignUpButton from '@/app/__components/auth/FacebookSignUpButton'
import GoogleSignUpButton from '@/app/__components/auth/GoogleSignUpButton'
import { login } from '@/app/actions/auth'
import Link from 'next/link'
import  {  useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {

      const [errors, setErrors] = useState<any>(null);

      async function handleSubmit(formData: FormData) {
  try {
    const result = await login(formData);

    if (!result.success) {

      toast.error(result.message || "Failed to login. Please check the form.");
      
      if (result.errors) setErrors(result.errors);
      return;
    }

    toast.success("Login successful! Redirecting...");

    // Redirect to the home page after successful login
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
        <div className='w-full md:w-[70%] m-auto rounded-xl bg-gray-50 p-2 shadow-lg' >
            <form className=''  action={handleSubmit} > 
            <h2 className='text-xl border-b border-gray-600 pb-3 mb-3 text-center' > Login </h2>
          

          <div className='flex items-center gap-2'>
                 <div className='w-full'>
                       <label htmlFor="email">Email</label>
                       <input type="email" id="email" name="email"  />
                           {errors?.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                 </div>
             

                  <div className='w-full'>
                        <label htmlFor="password">Password</label>  
                        <input type="password" id="password" name="password"  />
                        {errors?.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
          </div>

                <button type="submit" className='bg-blue-500 text-white px-4 py-2 h-14 rounded-md hover:bg-blue-600 w-full mt-3' > Login </button>

       </form>
          <div className='flex flex-col md:flex-row items-center justify-between gap-2 mt-5' >
                  <GoogleSignUpButton />
                  <FacebookSignUpButton />
          </div>
          <Link href="/signup" className='text-lg text-gray-600 mt-5 block text-center hover:text-blue-500' > Not have an account? Signup </Link>
          
        </div>
    </div>
  )
}

export default page