import Image from "next/image"
import Link from "next/link"

const AvatarLik = ({href, image}: {href: string, image: string}) => {
  return (
    <Link
          href={href}
          className="w-9 h-9 rounded-full bg-red-900 overflow-hidden border-2 border-gray-700 hover:border-amber-500 transition-colors duration-200 shrink-0"
          title="Profile"
        >
          <Image
            src={image || "/default-avatar.png"}
            width={36}
            height={36}
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
          />
    </Link>
  )
}

export default AvatarLik