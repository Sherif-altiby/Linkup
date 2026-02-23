
const PostSkeleton = () => {
  return (
     <div className="animate-pulse bg-white rounded-xl p-4 shadow-sm space-y-3">
    {/* Author row */}
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-200 rounded-full" />
      <div className="space-y-1">
        <div className="w-24 h-3 bg-gray-200 rounded" />
        <div className="w-16 h-3 bg-gray-200 rounded" />
      </div>
    </div>
    {/* Content lines */}
    <div className="w-full h-3 bg-gray-200 rounded" />
    <div className="w-4/5 h-3 bg-gray-200 rounded" />
    <div className="w-3/5 h-3 bg-gray-200 rounded" />
    {/* Image placeholder */}
    <div className="w-full h-48 bg-gray-200 rounded-lg" />
  </div>
  )
}

export default PostSkeleton