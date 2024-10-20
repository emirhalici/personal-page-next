import Link from "next/link";
import { Lexend } from "next/font/google";
import { Header } from "~/components/ui/header";
import { getSortedPostsData } from "~/lib/markdown";
import { cn } from "~/lib/utils";

const lexend = Lexend({ subsets: ["latin"] });

interface PostPageProps {
  posts: {
    id: string;
    title: string;
    date: string;
  }[];
}

export default function Page({ posts }: PostPageProps) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start py-6 px-2 md:px-24 ${lexend.className} font-light`}
    >
      <Header />
      <div className="w-11/12 max-w-xl justify-start pt-6">
        <h1 className="pb-5 text-4xl font-normal">📘 Posts</h1>
        <ul className="flex flex-col justify-start items-start">
          {posts.map((post) => (
            <li key={post.id}>
              <button className={cn(
                "ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                "inline-flex items-start justify-start rounded-md",
                "text-primary underline-offset-4 hover:underline text-lg h-10 text-left"
              )}>
                <Link href={`/posts/${post.id}`}>- {post.title}</Link>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const posts = getSortedPostsData();
  return {
    props: {
      posts,
    },
  };
}
