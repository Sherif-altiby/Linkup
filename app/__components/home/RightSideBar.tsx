import React from 'react'

const RightSideBar = () => {
  return (
    <div className="w-1/4 p-4  h-screen sticky top-0 space-y-6 ">
  <h2 className="text-xl font-bold mb-4">Friends</h2>

  <div className="space-y-3">
    {/* Friend 1 */}
    <div className="flex items-center space-x-3 hover:bg-white p-2 rounded transition">
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Friend"
        className="w-10 h-10 rounded-full"
      />
      <span className="font-medium text-gray-800">John Smith</span>
    </div>

    {/* Friend 2 */}
    <div className="flex items-center space-x-3 hover:bg-white p-2 rounded transition">
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="Friend"
        className="w-10 h-10 rounded-full"
      />
      <span className="font-medium text-gray-800">Jane Doe</span>
    </div>

    {/* Friend 3 */}
    <div className="flex items-center space-x-3 hover:bg-white p-2 rounded transition">
      <img
        src="https://randomuser.me/api/portraits/men/56.jpg"
        alt="Friend"
        className="w-10 h-10 rounded-full"
      />
      <span className="font-medium text-gray-800">Michael Lee</span>
    </div>

    {/* Friend 4 */}
    <div className="flex items-center space-x-3 hover:bg-white p-2 rounded transition">
      <img
        src="https://randomuser.me/api/portraits/women/68.jpg"
        alt="Friend"
        className="w-10 h-10 rounded-full"
      />
      <span className="font-medium text-gray-800">Emily Clark</span>
    </div>

    {/* Friend 5 */}
    <div className="flex items-center space-x-3 hover:bg-white p-2 rounded transition">
      <img
        src="https://randomuser.me/api/portraits/men/72.jpg"
        alt="Friend"
        className="w-10 h-10 rounded-full"
      />
      <span className="font-medium text-gray-800">David Brown</span>
    </div>
  </div>
</div>

  )
}

export default RightSideBar