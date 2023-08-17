import PostCard from "../PostCard";
import getPostMetadata from "../../helpers/getPostMetadata";

export default function LatestPost() {
  const posts = getPostMetadata();
  const recentPosts = posts
    .sort((a, b) => {
      const dateA: any = new Date(
        a.date.split("/").reverse().join("-") // Convertir a formato aaaa-mm-dd
      );
      const dateB: any = new Date(
        b.date.split("/").reverse().join("-") // Convertir a formato aaaa-mm-dd
      );
      return dateB - dateA;
    })
    .slice(0, 3)
    .map((post) => <PostCard key={post.slug} post={post} />);
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
        {posts.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">
            No hay posts aún
          </div>
        ) : (
          recentPosts
        )}
      </div>
    </div>
  );
}
