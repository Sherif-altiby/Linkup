import { getCurrentUser } from "@/lib/auth/currentUser";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import { IoChatbubble } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";

const Navbar = async () => {
  const user = await getCurrentUser();
  
  return (
    <nav className="bg-gray-900 border-b border-gray-800 flex items-center justify-between h-16 px-2 md:px-6 sticky top-0 z-50 shadow-lg shadow-black/20">

      {/* Left — Logo + Search */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-lg font-bold text-amber-500 tracking-tight hover:text-amber-400 transition-colors"
        >
          LinkUp
        </Link>

        <div className="relative hidden sm:block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <CiSearch className="text-lg" />
          </span>
          <input
            type="text"
            placeholder="Search LinkUp..."
            className="bg-gray-800 border border-gray-700 rounded-xl pl-9 pr-4 py-2 w-52 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all duration-200"
          />
        </div>
      </div>

      {/* Right — Icons + Avatar */}
      <div className="flex items-center gap-1">
        <Link
          href="/"
          className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:text-amber-500 hover:bg-gray-800 transition-all duration-200"
          title="Home"
        >
          <IoHomeSharp className="text-lg" />
        </Link>

        <button
          className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:text-amber-500 hover:bg-gray-800 transition-all duration-200 relative"
          title="Messages"
        >
          <IoChatbubble className="text-lg" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-gray-900" />
        </button>

        <button
          className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:text-amber-500 hover:bg-gray-800 transition-all duration-200 relative"
          title="Notifications"
        >
          <IoMdNotifications className="text-xl" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-gray-900" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-700 mx-2" />

        {/* Avatar */}
        <Link
          href={`/users/${user?.id}`}
          className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-700 hover:border-amber-500 transition-colors duration-200 flex-shrink-0"
          title="Profile"
        >
          <Image
            src={user?.image || "/default-avatar.png"}
            width={36}
            height={36}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;