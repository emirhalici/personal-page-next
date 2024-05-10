import posts, {Post} from "@/lib/assets/posts";
import Link from "next/link";

interface PostPageProps {
  posts: Post[];
}

export default function Page({ posts }: PostPageProps) {
  return <div className="flex justify-start p-24 items-center w-1/2 flex-col">
    <h1 className="text-3xl mb-4 font-bold">POSTS</h1>
    <div className="flex flex-col gap-4">
    {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            {post.title}
          </Link>
        ))}
    </div>
  </div>;
}



export async function getStaticProps() {
  return {
    props: {
      posts,
    },
  };
}