import Link from "next/link"
import { AiFillLike } from "react-icons/ai"

const PostReaches = ({likes, comments, postId} : {likes: number, comments: number, postId: string}) => {
  return (
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-800">
              {likes > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
                    <AiFillLike className="text-gray-900 text-[10px]" />
                  </span>
                  <span className="text-xs text-gray-500">
                    {likes} {likes === 1 ? "Like" : "Likes"}
                  </span>
                </div>
              )}
              {comments > 0 && (
                <Link href={`comments/${postId}`} className="text-xs text-gray-500 ml-auto">
                  {comments} {comments === 1 ? "Comment" : "Comments"}
                </Link>
              )}
    </div>
  )
}

export default PostReaches