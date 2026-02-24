const PostSkeleton = () => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl shadow-xl mb-5 overflow-hidden animate-pulse">

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-11 h-11 rounded-full bg-gray-800 border-2 border-gray-700 shrink-0" />
          <div className="space-y-2">
            <div className="w-28 h-3 bg-gray-800 rounded-full" />
            <div className="w-16 h-2.5 bg-gray-800 rounded-full" />
          </div>
        </div>
        {/* Menu dots */}
        <div className="w-7 h-7 rounded-full bg-gray-800" />
      </div>

      {/* Content lines */}
      <div className="px-5 pb-4 space-y-2.5">
        <div className="w-full h-3 bg-gray-800 rounded-full" />
        <div className="w-5/6 h-3 bg-gray-800 rounded-full" />
        <div className="w-3/4 h-3 bg-gray-800 rounded-full" />
      </div>

      {/* Image placeholder */}
      <div className="w-full h-56 bg-gray-800 border-y border-gray-800/60" />

      {/* Like / Comment counts */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gray-800" />
          <div className="w-10 h-2.5 bg-gray-800 rounded-full" />
        </div>
        <div className="w-16 h-2.5 bg-gray-800 rounded-full" />
      </div>

      {/* Action buttons */}
      <div className="flex items-center px-3 py-1 gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex-1 flex items-center justify-center gap-2 py-2.5"
          >
            <div className="w-4 h-4 rounded bg-gray-800" />
            <div className="w-10 h-2.5 bg-gray-800 rounded-full" />
          </div>
        ))}
      </div>

    </div>
  )
}

export default PostSkeleton