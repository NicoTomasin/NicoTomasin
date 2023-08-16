import PostCard from "../PostCard";
import getPostMetadata from "../../helpers/getPostMetadata";

export default function LatestPost() {
  const posts = getPostMetadata();
  return (
    <div
      id="latestPost"
      className="mx-auto max-w-screen-lg px-3 py-6 animate-fade-up animate-duration-600    animate-ease-out"
    >
      <div className="mb-6 text-2xl font-bold">
        <div className="flex items-baseline justify-between">
          <div>
            Últimos{" "}
            <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              Posts
            </span>
          </div>
          <div className="text-sm hover:text-cyan-400 transition">
            <a href="/posts">Ver todos los posts →</a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.slice(0, 3).map((post, index) => (
          // post.slug post.coverImage post.alt post.title post.date post.description
          <PostCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
}
