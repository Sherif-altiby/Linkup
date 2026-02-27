const sponsored = [
  {
    id: 1,
    title: "Awesome Product",
    url: "www.awesomeproduct.com",
    img: "https://images.pexels.com/photos/7726306/pexels-photo-7726306.jpeg",
  },
  {
    id: 2,
    title: "Premium Gear",
    url: "www.premiumgear.com",
    img: "https://images.pexels.com/photos/7726306/pexels-photo-7726306.jpeg",
  },
  {
    id: 3,
    title: "Top Brand",
    url: "www.topbrand.com",
    img: "https://images.pexels.com/photos/7726306/pexels-photo-7726306.jpeg",
  },
]

const LeftSideBar = () => {
  return (
    <section className="w-1/4 bg-gray-900 border-r border-gray-800 flex flex-col">

      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-gray-800">
        <p className="text-xs font-semibold tracking-widest uppercase text-amber-500 mb-0.5">
          Promoted
        </p>
        <h2 className="text-lg font-semibold text-gray-100 tracking-tight">
          Sponsored
        </h2>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {sponsored.map((item) => (
          <div
            key={item.id}
            className="group bg-gray-800 border border-gray-700 hover:border-amber-500/40 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/5"
          >
            {/* Image */}
            <div className="relative overflow-hidden h-32">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Sponsored badge */}
              <span className="absolute top-2 left-2 bg-gray-900/80 text-amber-500 text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full border border-amber-500/30">
                Ad
              </span>
            </div>

            {/* Info */}
            <div className="p-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-200 group-hover:text-gray-100 truncate">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 truncate mt-0.5">{item.url}</p>
              </div>
              <span className="shrink-0 text-gray-700 group-hover:text-amber-500 transition-colors duration-200">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 pb-5 pt-3 border-t border-gray-800">
        <button className="w-full py-2 rounded-xl border border-gray-700 text-xs font-medium tracking-widest uppercase text-gray-500 hover:border-amber-500/40 hover:text-amber-500 transition-all duration-200">
          View All Ads
        </button>
      </div>

    </section>
  )
}

export default LeftSideBar