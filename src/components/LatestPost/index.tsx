import PostCard from "../PostCard";
import getPostMetadata from "@/helpers/getPostMetadata";
import View from "./view";

export default function LatestPost() {
  const posts = getPostMetadata();

  return (
    <>
      {posts.length === 0 ? (
        <></>
      ) : (
        <>
          <View posts={posts} />
        </>
      )}
    </>
  );
}
