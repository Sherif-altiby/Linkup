import Image from "next/image";
import prisma from "@/lib/prisma";

async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, image: true },
  });
}

type Props = {
  userId: string;
};

const ChatHeader = async ({ userId }: Props) => {
  const user = await getUser(userId);

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Image
          src={user.image ?? "/default-avatar.png"}
          alt={user.name ?? "User"}
          className="w-10 h-10 rounded-2xl object-cover"
          width={40}
          height={40}
        />
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900" />
      </div>
      <div>
        <p className="font-semibold text-white text-sm">{user.name}</p>
        <p className="text-xs text-green-500">Online now</p>
      </div>
    </div>
  );
};

export default ChatHeader;