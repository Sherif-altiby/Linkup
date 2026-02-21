'use client'
import { useState } from 'react'

export default function CreatePost({ onClose, show }: { onClose: () => void, show: boolean }) {

  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      const base64 = reader.result as string

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ image: base64 }),
        headers: { 'Content-Type': 'application/json' },
      })

      const { url } = await res.json()
      setImageUrl(url) // store the url
      setUploading(false)
    }
  }

  const handleSubmit = async () => {
    if (!content) return

    setLoading(true)
    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ content, image: imageUrl }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      setContent('')
      setImageUrl(null)
      onClose()
    }
    setLoading(false)
  }

  return (
    <div className={`w-screen h-screen flex items-center transition-all duration-200 justify-center z-50 bg-[#ffffff69] fixed top-0  ${show ? 'left-0' : '-left-full'}`} >
        <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-200 flex items-center gap-3 relative">
        <div className="w-10 h-10 rounded-full bg-(--secondary-color) flex items-center justify-center text-white font-bold text-sm shrink-0">
          U
        </div>
        <div>
          <p className="text-(--text-color) text-sm font-semibold">Username</p>
          <p className="text-gray-400 text-xs">Sharing publicly</p>
        </div>

        <div className="absolute top-4 right-4 cursor-pointer font-bold text-xl text-gray-500 hover:text-red-950" onClick={onClose}>
          X
        </div>
      </div>

      {/* Textarea */}
      <div className="relative px-6 pt-5 pb-3">
        <textarea
            className="w-full bg-transparent text-(--text-color) placeholder-gray-400 text-base leading-relaxed resize-none outline-none min-h-32 font-light"
            placeholder="What's on your mind?"
            maxLength={500}
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
        <span className="absolute bottom-3 right-6 text-xs font-mono text-gray-300">
          500
        </span>
      </div>

      {/* Image Upload Area */}
      <label htmlFor="image-upload" className="mx-6 mb-4 border-2 border-dashed border-gray-200 rounded-xl bg-white py-8 flex flex-col items-center gap-2 cursor-pointer hover:border-blue-300 transition-all duration-200">
          {uploading ? (
            <p className="text-sm text-gray-400">Uploading...</p>
          ) : imageUrl ? (
            <img src={imageUrl} alt="preview" className="w-full h-48 object-cover rounded-xl" />
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 19.5h16.5M13.5 3.75h3a.75.75 0 01.75.75v3" />
              </svg>
              <p className="text-sm text-gray-400">
                <span className="text-(--secondary-color) font-medium">Click to upload</span>{" "}or drag & drop
              </p>
              <p className="text-xs text-gray-300">PNG, JPG, WEBP — optional</p>
            </>
          )}
          <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>

      {/* Divider */}
      <div className="mx-6 border-t border-gray-200" />

      {/* Footer */}
      <div className="px-6 py-4 flex items-center justify-between">

        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-(--text-color) hover:bg-(--icon-bg-color) transition-all duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 19.5h16.5M13.5 3.75h3a.75.75 0 01.75.75v3"
            />
          </svg>
          <span>Photo</span>
        </button>

        <button
            onClick={handleSubmit}
            disabled={!content || loading}
            className="px-6 py-2 rounded-full text-sm font-semibold bg-(--secondary-color) text-white hover:opacity-90 transition-all duration-200 active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>

      </div>
    </div>
    </div>
  );
}