const CommentSkeleton = () => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">

  {/* Section Header */}
  <div className="px-5 pt-5 pb-4 border-b border-gray-800">
    <div className="h-3 w-20 bg-gray-800 rounded animate-pulse mb-2" />
    <div className="h-4 w-28 bg-gray-800 rounded animate-pulse" />
  </div>

  {/* Comments List */}
  <div className="px-5 py-5 space-y-5">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex gap-3">

        {/* Avatar */}
        <div className="shrink-0 mt-0.5">
          <div className="w-8 h-8 rounded-full bg-gray-800 animate-pulse" />
        </div>

        {/* Bubble */}
        <div className="flex-1 min-w-0">
          <div className="bg-gray-800 border border-gray-700/60 rounded-2xl rounded-tl-sm px-4 py-3">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="h-3 w-24 bg-gray-700 rounded animate-pulse" />
              <div className="h-3 w-12 bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3 w-full bg-gray-700 rounded animate-pulse" />
              <div className="h-3 w-4/5 bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>

      </div>
    ))}
  </div>

  {/* Add Comment Input */}
  <div className="px-5 pb-5 pt-2 border-t border-gray-800">
    <div className="flex gap-3 items-center">
      <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-700 shrink-0 animate-pulse" />
      <div className="flex-1 h-10 bg-gray-800 border border-gray-700 rounded-2xl animate-pulse" />
    </div>
  </div>

</div>
  )
}

export default CommentSkeleton