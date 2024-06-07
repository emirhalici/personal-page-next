import { GetStaticPaths, GetStaticProps } from "next";
import { Header } from "~/components/ui/header";
import posts from "~/lib/assets/posts";
import { Post } from "~/lib/assets/posts";
import { Manrope } from "next/font/google";
import { FaChevronLeft } from "react-icons/fa6";
import Link from "next/link";

const manrope = Manrope({ subsets: ["latin"] });
interface PostPageProps {
  post: Post;
}

export default function Page({ post }: PostPageProps) {
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start py-6 px-2 md:px-24 ${manrope.className}`}
    >
      <Header />
      <div className="flex flex-col items-start w-11/12 sm:w-1/2 pt-4">
        <div className="flex flex-row w-full pb-5 items-center">
          <Link
            href="/posts"
            className="p-2 mr-4 rounded-lg bg-primary-foreground hover:bg-accent border border-input"
          >
            <FaChevronLeft />
          </Link>
          <h1 className="text-4xl font-semibold">📖 {post.title}</h1>
        </div>
        <p>{post.content}</p>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postId = parseInt(params?.id as string, 10);
  const post = posts.find((post) => post.id === postId);

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: false, // fallback: false means pages that don’t have the correct id will 404.
  };
};
