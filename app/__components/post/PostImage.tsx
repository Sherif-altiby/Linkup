import Image from "next/image";

const PostImage = ({ image }: { image: string }) => {
  return (
    <div className="relative w-full h-72 overflow-hidden border-y border-gray-800">
      <Image
        src={image}
        alt="post image"
        className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
        width={800}
        height={400}
      />
    </div>
  );
};

export default PostImage;
