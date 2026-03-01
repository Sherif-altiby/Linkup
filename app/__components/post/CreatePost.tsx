"use client";
import { CreatePostProps } from "@/app/__types";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CreatePost({
  onClose,
  show,
  onPostCreated,
  mode = "create",
  postId,
  initialContent = "",
  initialImage = null,
}: CreatePostProps) {
  const [content, setContent] = useState(initialContent);
  const [imageUrl, setImageUrl] = useState<string | null>(initialImage);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    setContent(initialContent);
    setImageUrl(initialImage);
  }, [initialContent, initialImage, show]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result as string;
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ image: base64 }),
        headers: { "Content-Type": "application/json" },
      });
      const { url } = await res.json();
      setImageUrl(url);
      setUploading(false);
    };
  };

  const handleSubmit = async () => {
    if (!content) return;
    setLoading(true);
    const res = await fetch(
      mode === "edit" ? `/api/posts/${postId}` : "/api/posts",
      {
        method: mode === "edit" ? "PATCH" : "POST",
        body: JSON.stringify({ content, image: imageUrl }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.ok) {
      setContent("");
      setImageUrl(null);
      onClose();
      toast.success(mode === "edit" ? "Post updated!" : "Post created!");
      onPostCreated();
    }
    setLoading(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-lg mx-4 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          show ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-gray-800 flex items-center gap-3 relative">
          {/* Mode label centered */}
          <span className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold tracking-widest uppercase text-gray-500">
            {mode === "edit" ? "Edit Post" : "Create Post"}
          </span>

          {/* Avatar + name */}
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-700 flex-shrink-0">
            <Image
              src={user?.image || "/default-avatar.png"}
              alt="avatar"
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-200 leading-tight">
              {user?.name}
            </p>
            <p className="text-xs text-gray-600">Sharing publicly</p>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:text-gray-200 hover:bg-gray-800 transition-all duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Textarea */}
        <div className="relative px-5 pt-4 pb-2">
          <textarea
            className="w-full bg-transparent text-gray-200 placeholder-gray-600 text-sm leading-relaxed resize-none outline-none min-h-28 font-light"
            placeholder="What's on your mind?"
            maxLength={500}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <span
            className={`absolute bottom-2 right-5 text-xs font-mono transition-colors ${
              500 - content.length < 50 ? "text-amber-500" : "text-gray-700"
            }`}
          >
            {500 - content.length}
          </span>
        </div>

        {/* Image Upload */}
        <div className="px-5 pb-4">
          <label
            htmlFor="image-upload"
            className="block border border-dashed border-gray-700 hover:border-amber-500/50 rounded-xl bg-gray-800/40 cursor-pointer transition-all duration-200 overflow-hidden"
          >
            {uploading ? (
              <div className="py-8 flex flex-col items-center gap-2">
                <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-gray-500">Uploading...</p>
              </div>
            ) : imageUrl ? (
              <div className="relative group">
                <img
                  src={imageUrl}
                  alt="preview"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="text-xs text-white font-medium">Click to change</p>
                </div>
              </div>
            ) : (
              <div className="py-7 flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 19.5h16.5M13.5 3.75h3a.75.75 0 01.75.75v3" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">
                  <span className="text-amber-500 font-medium">Click to upload</span>{" "}or drag & drop
                </p>
                <p className="text-xs text-gray-600">PNG, JPG, WEBP — optional</p>
              </div>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-800 flex items-center justify-between">
          <label
            htmlFor="image-upload"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-amber-500 hover:bg-gray-800 transition-all duration-200 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 19.5h16.5M13.5 3.75h3a.75.75 0 01.75.75v3" />
            </svg>
            <span>Photo</span>
          </label>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-500 border border-gray-700 hover:border-gray-500 hover:text-gray-300 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!content || loading}
              className="px-5 py-2 rounded-xl text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-gray-950 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-amber-500/20"
            >
              {loading
                ? mode === "create" ? "Saving..." : "Posting..."
                : mode === "edit" ? "Save Changes" : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}