import { getCurrentUser } from "@/lib/auth/currentUser";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import { IoChatbubble } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import AvatarLik from "../nav/NavLink";
import Search from "../nav/Search";

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

        <Search />
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
        <AvatarLik href={`/profile/${user?.id}`} image={user?.image || ""} />
      </div>
    </nav>
  );
};

export default Navbar;