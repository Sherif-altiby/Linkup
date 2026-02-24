import { useUserStore } from "@/store/userStore";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

const EditUserInfo = ({ onClose }: { onClose?: () => void }) => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [avatar, setAvatar] = useState<string | null>(user?.image || null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    password: "",
    location: user?.location || "",
    birthdate: user?.birthDate
      ? new Date(user.birthDate).toISOString().split("T")[0]
      : "",
  });

  const fileRef = useRef<HTMLInputElement>(null);

  // Upload image to your upload endpoint
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result as string;
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: JSON.stringify({ image: base64 }),
          headers: { "Content-Type": "application/json" },
        });
        const { url } = await res.json();
        setAvatar(url);
      } catch {
        toast.error("Image upload failed");
      } finally {
        setUploading(false);
      }
    };
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const body: Record<string, any> = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        location: form.location,
        birthdate: form.birthdate,
        image: avatar,
      };

      // Only send password if the user typed one
      if (form.password.trim() !== "") {
        body.password = form.password;
      }

      const res = await fetch("/api/users/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update profile");
        return;
      }

      // Sync zustand store with updated user
      setUser(data.user);
      toast.success("Profile updated successfully!");
      setForm((prev) => ({ ...prev, password: "" }));
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      password: "",
      location: user?.location || "",
      birthdate: user?.birthDate
        ? new Date(user.birthDate).toISOString().split("T")[0]
        : "",
    });
    setAvatar(user?.image || null);
    onclose;
  };

  const fields = [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Your full name",
      colSpan: true,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "your@email.com",
      colSpan: false,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      id: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "+1 (555) 000-0000",
      colSpan: false,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.93 3.27 2 2 0 0 1 3.93 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      id: "location",
      label: "Location",
      type: "text",
      placeholder: "City, Country",
      colSpan: false,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      id: "birthdate",
      label: "Birth Date",
      type: "date",
      placeholder: "",
      colSpan: false,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-00 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-800">
          <p className="text-xs font-semibold tracking-widest uppercase text-amber-500 mb-1">
            Account Settings
          </p>
          <h1 className="text-2xl font-semibold text-gray-100 tracking-tight">
            Edit Profile
          </h1>
        </div>

        {/* Avatar */}
        <div className="px-8 py-6 flex items-center gap-5 border-b border-gray-800">
          <div
            className="relative shrink-0 cursor-pointer group"
            style={{ width: 72, height: 72 }}
            onClick={() => fileRef.current?.click()}
          >
            <div className="w-full h-full rounded-full bg-gray-800 border-2 border-gray-700 group-hover:border-amber-500 transition-colors duration-200 overflow-hidden flex items-center justify-center">
              {uploading ? (
                <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              ) : avatar ? (
                <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-light text-amber-500 select-none">
                  {form.name?.charAt(0)}
                </span>
              )}
            </div>
            <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-200 mb-1">{form.name}</p>
            <p className="text-xs text-gray-500">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="text-amber-500 hover:text-amber-400 underline underline-offset-2 transition-colors"
              >
                Upload new photo
              </button>
              {" "}· JPG, PNG up to 5MB
            </p>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />
        </div>

        {/* Form Fields */}
        <div className="px-8 pt-6 pb-2">
          <div className="grid grid-cols-2 gap-x-4">
            {fields.map((field) => (
              <div key={field.id} className={`mb-4 ${field.colSpan ? "col-span-2" : "col-span-1"}`}>
                <label className="block text-xs font-medium tracking-widest uppercase text-gray-500 mb-2">
                  {field.label}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
                    {field.icon}
                  </span>
                  <input
                    type={field.type}
                    value={(form as any)[field.id]}
                    placeholder={field.placeholder}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10 transition-all duration-200"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Security Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-xs font-medium tracking-widest uppercase text-gray-600">Security</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* Password */}
          <div className="mt-4 mb-6">
            <label className="block text-xs font-medium tracking-widest uppercase text-gray-500 mb-2">
              New Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                placeholder="Leave blank to keep current"
                onChange={(e) => handleChange("password", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-9 pr-10 py-2.5 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10 transition-all duration-200"
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
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 flex gap-3">
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl border border-gray-700 text-sm font-medium text-gray-400 hover:border-gray-500 hover:text-gray-200 disabled:opacity-40 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || uploading}
            className="flex-[2] py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold text-gray-950 tracking-wide uppercase transition-all duration-200 shadow-lg shadow-amber-500/20"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserInfo;