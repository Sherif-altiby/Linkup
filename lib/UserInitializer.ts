// components/UserInitializer.tsx
'use client'
import { useEffect } from 'react'
import { useUserStore } from '@/store/userStore'
import { SafeUser } from '@/store/userStore'

export default function UserInitializer({ user }: { user: SafeUser | null }) {
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
   if (user) setUser(user)
  }, [])

  return null
}