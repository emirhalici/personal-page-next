import { GetStaticPaths, GetStaticProps } from "next";
import { Header } from "~/components/ui/header";
import { Lexend } from "next/font/google";
import { FaChevronLeft } from "react-icons/fa6";
import Link from "next/link";
import { getPostData, getAllPostIds } from "~/lib/markdown";


const lexend = Lexend({ subsets: ["latin"] });

interface PostPageProps {
  postData: {
    id: string;
    title: string;
    date: string;
    contentHtml: string;
  };
}

export default function Page({ postData }: PostPageProps) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start py-6 px-2 md:px-24 ${lexend.className} font-light`}
    >
      <Header />
      <article className="w-11/12 max-w-xl pt-4">
        <div className="flex flex-row w-full pb-5 items-center">
          <Link
            href="/posts"
            className="p-2 mr-4 rounded-lg bg-primary-foreground hover:bg-accent border border-input"
          >
            <FaChevronLeft />
          </Link>
          <h1 className="text-4xl font-normal">📖 {postData.title}</h1>
        </div>
        <div className="text-sm text-gray-500 mb-4">
          Published on {publishDate()}
        </div>
        <div
          className="prose prose-sm sm:prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </main>
  );

  function publishDate() {
    return new Date(postData.date).toISOString().split("T")[0];
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};
