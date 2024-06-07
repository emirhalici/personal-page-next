import posts, { Post } from "~/lib/assets/posts";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Manrope } from "next/font/google";
import { Header } from "~/components/ui/header";

const manrope = Manrope({ subsets: ["latin"] });

interface PostPageProps {
  posts: Post[];
}

export default function Page({ posts }: PostPageProps) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start py-6 px-2 md:px-24 ${manrope.className}`}
    >
      <Header />
      <div className="w-11/12 sm:w-1/2 justify-start pt-6">
        <h1 className="pb-5 text-4xl font-semibold">📘 Posts</h1>
        <ul className="flex flex-col justify-start items-start">
          {posts.map((post) => (
            <li key={post.id}>
              <Button variant={"link"} className="p-0 text-lg">
                <Link href={`/posts/${post.id}`}>- {post.title}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts,
    },
  };
}
