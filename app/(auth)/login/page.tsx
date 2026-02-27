"use client"

import FacebookSignUpButton from '@/app/__components/auth/FacebookSignUpButton'
import GoogleSignUpButton from '@/app/__components/auth/GoogleSignUpButton'
import { login } from '@/app/actions/auth'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {
  const [errors, setErrors] = useState<any>(null)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(formData: FormData) {
    try {
      const result = await login(formData)
      if (!result.success) {
        toast.error(result.message || "Failed to login. Please check the form.")
        if (result.errors) setErrors(result.errors)
        return
      }
      toast.success("Login successful! Redirecting...")
      setTimeout(() => { window.location.href = "/" }, 1500)
    } catch (err: any) {
      console.error(err)
      toast.error("Something went wrong. Please try again.")
    }
  }


  return (
    <div className="min-h-screen w-full bg-gray-950 flex items-center justify-center p-5">
      <div className="w-full max-w-xl bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-800 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-amber-500 mb-1">
            Welcome Back
          </p>
          <h1 className="text-2xl font-semibold text-gray-100 tracking-tight">
            Log In
          </h1>
        </div>

        <div className="px-8 py-6">
          <form action={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-xs font-medium tracking-widest uppercase text-gray-500 mb-2">
                Email
              </label>
              <div className="relative">
                
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  className="inp-ctm"
                />
              </div>
              {errors?.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium tracking-widest uppercase text-gray-500 mb-2">
                Password
              </label>
              <div className="relative">
                              <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="inp-ctm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-amber-500 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors?.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2.5 mt-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-sm font-semibold text-gray-950 tracking-wide uppercase transition-all duration-200 shadow-lg shadow-amber-500/20"
            >
              Log In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-xs font-medium tracking-widest uppercase text-gray-600">or</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* OAuth */}
          <div className="grid md:grid-cols-2 gap-3">
            <GoogleSignUpButton />
            <FacebookSignUpButton />
          </div>

          {/* Signup link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-amber-500 hover:text-amber-400 font-medium underline underline-offset-2 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default page