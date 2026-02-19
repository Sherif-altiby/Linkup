import Image from "next/image";
import { PostWithAuthor } from "../__types";
import { timeAgo } from "@/lib/timeCalc";



export default function PostCard({ post }: { post: PostWithAuthor }) {

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-sm mb-6 p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Image
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="avatar"
            width={45}
            height={45}
            className="rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{post.author.firstName}</h3>
            <p className="text-sm text-gray-500"> {timeAgo(post.createdAt)} </p>
          </div>
        </div>

        <button className="text-gray-400 hover:text-gray-600 text-xl">
          •••
        </button>
      </div>

      {/* Content */}
      <p className="text-gray-700 leading-relaxed mb-4">
        {post.content}
      </p>

      {/* Post Image */}
      <div className="relative w-full h-72 rounded-xl overflow-hidden mb-4">
        <Image
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
          alt="post"
          fill
          className="object-cover"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-between border-t pt-3 text-gray-500">
        <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition w-full justify-center">
          ❤️ Like
        </button>

        <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition w-full justify-center">
          💬 Comment
        </button>

        <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition w-full justify-center">
          🔄 Share
        </button>
      </div>
    </div>
  );
}
