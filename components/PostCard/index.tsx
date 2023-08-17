import { PostMetadata } from "@/helpers/PostMetadata";
import Image from "next/image";
export default function PostCard({ post }: { post: PostMetadata }) {
  return (
    <a className="hover:scale-105 transition" href={`/posts/${post.slug}`}>
      <div className="overflow-hidden rounded-md bg-slate-800">
        <div className="aspect-w-3 aspect-h-2">
          <Image
            className="h-full w-full object-cover object-center"
            src={post.coverImage}
            alt={post.alt}
            width={300}
            height={200}
            loading="lazy"
            style={{
              borderRadius: "10px",
              border: "1px solid #1a5a7a",
              boxShadow: "0 0 10px #1a5a7a",
            }}
          />
        </div>
        <div className="px-3 pt-4 pb-6 text-center">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <div className="mt-1 text-xs text-gray-400">{post.date}</div>
          <div className="mt-2 text-sm">{post.description}</div>
        </div>
      </div>
    </a>
  );
}
