import fs from "fs";
import Markdown from "markdown-to-jsx";
import getPostMetadata from "../../../helpers/getPostMetadata";
import matter from "gray-matter";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
const getPostContent = (slug: string) => {
  const folder = "posts/";
  const file = `${folder}${slug}.md`;
  if (!fs.existsSync(file)) {
    notFound();
  }
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};
export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};
type Params = {
  params: {
    slug: string;
  };
};
const imageRendered = (props: { alt: string; src: string }) => {
  return (
    <Image
      className="rounded-md hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
      alt={props.alt}
      src={props.src}
      width={1000}
      height={300}
      style={{
        borderRadius: "10px",
        border: "1px solid #1a5a7a",
        boxShadow: "0 0 10px #1a5a7a",
      }}
    />
  );
};
export default function Page(props: Params) {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  return (
    <main className="flex min-h-screen flex-col items-center md:p-24 p-5">
      <div>
        <div className="my-12 text-center">
          <h1 className="text-3xl text-blue-650 font-bold">
            {post.data.title}
          </h1>
          <Image
            className="rounded-md mt-5"
            src={post.data.coverImage}
            width={1000}
            height={525}
            alt={post.data.alt}
            loading="lazy"
            style={{
              borderRadius: "10px",
              border: "1px solid #1a5a7a",
              boxShadow: "0 0 10px #1a5a7a",
            }}
          />
          <p className="text-blue-750 mt-2 font-bold ">{post.data.date}</p>
        </div>

        <article className="max-w-screen-md mx-auto my-3 prose prose-base dark:prose-invert prose-a:text-blue-650">
          <Markdown
            options={{
              overrides: {
                img: imageRendered,
              },
            }}
          >
            {post.content}
          </Markdown>
        </article>
      </div>
    </main>
  );
}
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = params.slug;
  const post = getPostContent(slug);

  return {
    title: post.data.title,
    openGraph: {
      title: post.data.title,
      description: post.data.description,
      url: "https://nicotomasin.com.ar/blog/" + slug,
      images: "https://nicotomasin.com.ar/api/og?title=" + slug,
    },
    twitter: {
      card: "summary_large_image",
      title: post.data.title,
      description: post.data.description,
      creator: "@NicolasTomasin",
      images: "https://nicotomasin.com.ar/api/og?title=" + slug,
    },
  };
}
