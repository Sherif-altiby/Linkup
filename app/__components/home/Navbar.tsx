import { getCurrentUser } from "@/lib/auth/currentUser";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci"
import { IoMdNotifications } from "react-icons/io";
import { IoChatbubble } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";

const Navbar = async () => {

  const user = await getCurrentUser()

  return (
    <nav className="bg-white flex items-center justify-between h-16 px-4 py-2" >
        <div className="flex items-center gap-5" >
               <Link href="/" className="text-xl font-bold secondary-color">LinkUp</Link>
               <div className="icon-bg-color w-56 rounded-xl relative h-10" >
                   <input type="text" placeholder="Search in LinkUp" className="w-full h-full block pl-7" />
                   <div className="absolute top-[50%] left-1 text-2xl transform -translate-y-1/2 " > <CiSearch /> </div>
               </div>
        </div>

        <div className="flex item-center gap-3 " >
            <div className="icon-bg-color w-10 h-10 rounded-full flex items-center justify-center cursor-pointer" > <IoHomeSharp /> </div>
            <div className="icon-bg-color w-10 h-10 rounded-full flex items-center justify-center cursor-pointer" > <IoChatbubble /> </div>
            <div className="icon-bg-color w-10 h-10 rounded-full flex items-center justify-center cursor-pointer" > <IoMdNotifications /> </div>
            <Link className="w-10 h-10 rounded-full overflow-hidden" href={`/users/${user?.id}`} > 
              <Image src={user?.image || "/default-avatar.png"} width={40} height={40} alt="User Avatar" /> 
            </Link>
        </div>
    </nav>
  )
}

export default Navbar