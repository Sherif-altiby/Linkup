import { timeAgo } from "@/lib/timeCalc";
import AvatarLik from "../nav/NavLink";

const PostHeader = ({
  authorId,
  authorImg,
  authorName,
  postTime,
  setShow,
}: {
  authorId: string;
  authorImg: string;
  authorName: string;
  postTime: Date;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-4">
      <div className="flex items-center gap-3">
        <AvatarLik
          href={`/users/${authorId}`}
          image={authorImg || "default-avatar.png"}
        />
        <div>
          <h3 className="font-semibold text-gray-100 text-sm leading-tight">
            {authorName}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">{timeAgo(postTime)}</p>
        </div>
      </div>

      <button
        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-amber-500 hover:bg-gray-800 transition-all duration-200 text-lg leading-none"
        onClick={() => setShow((prev) => !prev)}
      >
        •••
      </button>
    </div>
  );
};

export default PostHeader;
