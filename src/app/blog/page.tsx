import { Metadata } from "next";
import PostCard from "../../components/PostCard";
import getPostMetadata from "../../helpers/getPostMetadata";

export default function posts() {
  const posts = getPostMetadata();
  const sortedPosts = posts
    .sort((a, b) => {
      const dateA: any = new Date(
        a.date.split("/").reverse().join("-") // Convertir a formato aaaa-mm-dd
      );
      const dateB: any = new Date(
        b.date.split("/").reverse().join("-") // Convertir a formato aaaa-mm-dd
      );
      return dateB - dateA;
    })
    .map((post) => <PostCard key={post.slug} post={post} />);
  return (
    <main className="flex min-h-screen flex-col items-center md:p-24 p-5 mt-20">
      <h1 className="text-3xl font-bold animate-fade-up animate-duration-600 animate-ease-out">
        Todos mis <span className="text-cyan-400 bg-clip-text">posts</span> 📄
      </h1>
      <div
        id="allPosts"
        className="mx-auto max-w-screen-lg px-3 py-6 animate-fade-up animate-duration-600    animate-ease-out"
      >
        {posts.length === 0 ? (
          <div className="text-xl col-span-3 text-center text-gray-500">
            No hay posts todavía 😢
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {sortedPosts}
          </div>
        )}
      </div>
    </main>
  );
}
export const metadata: Metadata = {
  title: "Todos mis posts",
  openGraph: {
    title: "Todos mis posts",
    description: "Lista completa de todos mis posts",
    url: "https://nicotomasin.com.ar/blog",
    images: "https://nicotomasin.com.ar/ogImageAllPosts.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Todos mis posts",
    description: "Lista completa de todos mis posts",
    creator: "@NicolasTomasin",
    images: "https://nicotomasin.com.ar/ogImageAllPosts.png",
  },
};
