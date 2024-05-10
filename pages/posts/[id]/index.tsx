import { GetStaticPaths, GetStaticProps } from "next";
import { useParams } from "next/navigation";
import posts from "@/lib/assets/posts";
import { useRouter } from "next/router";

export default function Page({ post }: { post: any }) {
  const router = useRouter();
  const { id } = router.query;

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

// this is how you achieve SSG read more https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation

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
    fallback: false,
  };
};
