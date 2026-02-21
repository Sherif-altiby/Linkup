// store/userStore.ts
import { User } from '@/app/generated/prisma/client'
import { create } from 'zustand'

export type SafeUser = Omit<User, 'password'>

interface UserStore {
  user: SafeUser | null
  setUser: (user: SafeUser) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))