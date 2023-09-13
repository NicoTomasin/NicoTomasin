import PostCard from "@/components/PostCard";
import getPostMetadata from "@/helpers/getPostMetadata";

export default function LatestPost() {
  const posts = getPostMetadata();
  const today = new Date(); // Obtener la fecha actual

  const recentPosts = posts
    .filter((post) => {
      const postDate = new Date(post.date.split("/").reverse().join("-"));
      return postDate <= today; // Filtrar solo los posts con fecha menor o igual a hoy
    })
    .sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-"));
      const dateB = new Date(b.date.split("/").reverse().join("-"));
      return dateB - dateA; // Ordenar de más nuevo a más antiguo
    })
    .slice(0, 3)
    .map((post) => <PostCard key={post.slug} post={post} />);

  return (
    <div
      id="latestPost"
      className="mx-auto max-w-screen-lg px-3 py-6 animate-fade-up animate-duration-600    animate-ease-out"
    >
      {posts.length === 0 ? (
        <></>
      ) : (
        <>
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
            {recentPosts}
          </div>
        </>
      )}
    </div>
  );
}
