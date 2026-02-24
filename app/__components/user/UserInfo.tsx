"use client"
import { useUserStore } from "@/store/userStore"
import Image from "next/image"
import { useState } from "react"
import EditUserInfo from "./EditeUserInfo"

const UserInfo = () => {
  const user = useUserStore((state) => state.user)
  const [showEdit, setShowEdit] = useState(false)

  const details = [
    {
      label: "Email",
      value: user?.email,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      label: "Location",
      value: user?.location,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      label: "Phone",
      value: user?.phone,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.93 3.27 2 2 0 0 1 3.93 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      label: "Birth Date",
      value: user?.birthDate,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
  ]

  return (
    <>
      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowEdit(false)}
          />
          {/* Scrollable modal wrapper */}
          <div className="relative z-10 w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setShowEdit(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 border border-gray-700 text-gray-400 hover:text-gray-100 hover:border-gray-500 transition-all duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <EditUserInfo onClose={() => setShowEdit(false)} />
          </div>
        </div>
      )}

      {/* Profile Card */}
      <div className="md:w-1/2 min-h-[calc(100vh-65px)] pb-10">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">

          {/* Cover + Avatar */}
          <div className="relative h-28 bg-gradient-to-r from-gray-800 to-gray-900">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle, #d97706 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Avatar */}
            <div className="absolute -bottom-12 left-6">
              <div className="w-24 h-24 rounded-full border-4 border-gray-900 overflow-hidden bg-gray-800 shadow-xl">
                <Image
                  src={user?.image || "/default-avatar.png"}
                  alt="User profile image"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setShowEdit(true)}
              className="absolute top-3 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-900/80 border border-gray-700 text-xs font-medium text-gray-400 hover:text-amber-500 hover:border-amber-500/50 backdrop-blur-sm transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit Profile
            </button>
          </div>

          {/* Name & Bio */}
          <div className="pt-14 px-6 pb-5 border-b border-gray-800">
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-500 mb-0.5">
              Profile
            </p>
            <h2 className="text-2xl font-semibold text-gray-100 tracking-tight mb-3">
              {user?.name}
            </h2>
            {user?.bio && (
              <p className="text-sm text-gray-400 leading-relaxed">{user.bio}</p>
            )}
          </div>

          {/* Details */}
          <div className="px-6 py-5 space-y-3">
            {details.map((item) =>
              item.value ? (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/60 border border-gray-800 hover:border-amber-500/30 transition-colors duration-200"
                >
                  <span className="text-amber-500 shrink-0">{item.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium tracking-widest uppercase text-gray-500 leading-none mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm text-gray-200 truncate">{item.value}</p>
                  </div>
                </div>
              ) : null
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default UserInfo