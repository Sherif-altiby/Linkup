"use client";

import type { Message } from "@/app/generated/prisma/client";
import AvatarLik from "../nav/NavLink";
import { useUserStore } from "@/store/userStore";

const UserMessage = ( ) => {
  const user = useUserStore((state) => state.user);

  return (
    <>
      <div className={`flex justify-start gap-2 `}>
        <AvatarLik href="" image={""} />
        <div className="max-w-[65%]">
          <div
            className={`px-4 py-2.5 text-sm leading-relaxed  "bg-gray-900 border border-gray-800 text-gray-200 rounded-md`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, sint
            expedita autem quisquam reiciendis at vitae! Non vel delectus
            asperiores porro minus saepe rem ducimus. Omnis exercitationem
            beatae facilis sunt.
          </div>
          <p className={`text-[10px] text-gray-600 mt-1 text-left`}>
            1 houre ago
          </p>
        </div>
      </div>

      <div className={`flex justify-start flex-row-reverse gap-2 `}>
        <AvatarLik href="" image={""} />
        <div className="max-w-[65%]">
          <div
            className={`px-4 py-2.5 text-sm leading-relaxed  bg-gray-900 border border-gray-900 text-gray-200 rounded-md`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, sint
            expedita autem quisquam reiciendis at vitae! Non vel delectus
            asperiores porro minus saepe rem ducimus. Omnis exercitationem
            beatae facilis sunt. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Nemo, sint expedita autem quisquam reiciendis at
            vitae! Non vel delectus asperiores porro minus saepe rem ducimus.
            Omnis exercitationem beatae facilis sunt.
          </div>
          <p className={`text-[10px] text-gray-600 mt-1 text-right`}>
            1 houre ago
          </p>
        </div>
      </div>
    </>
  );
};

export default UserMessage;
