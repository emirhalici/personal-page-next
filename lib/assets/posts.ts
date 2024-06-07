export type Post = {
  id: number;
  title: string;
  content: string;
};

const posts: Post[] = [
  {
    id: 1,
    title: "Post 1",
    content: "This is my first post",
  },
  {
    id: 2,
    title: "Post 2",
    content: "This is my second post",
  },
  {
    id: 3,
    title: "Post 3",
    content: "This is my third post",
  },
];

export default posts;
