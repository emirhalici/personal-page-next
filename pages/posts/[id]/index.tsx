import { GetStaticPaths, GetStaticProps } from "next";
import posts from "~/lib/assets/posts";
import { Post } from "~/lib/assets/posts";

interface PostPageProps {
  post: Post;
}

export default function Page({ post }: PostPageProps) {
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
