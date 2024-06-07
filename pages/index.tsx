import { Inter } from "next/font/google";
import Link from "next/link";
import { Icons } from "~/components/icons";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-24 ${inter.className}`}
    >
      <div className="w-1/2 justify-start">
        <h1 className="pb-2 text-3xl font-bold">Hello, I&apos;m Emir 👋</h1>
        <h2 className="text-2xl">
          I am a software developer based in Türkiye.
        </h2>
      </div>
      <div className="my-8 flex w-1/2 flex-col justify-start gap-2">
        <Link href="/posts">
          See all <span className="font-semibold underline"> Posts</span>
        </Link>
      </div>
      <div className="flex gap-2 left">
        <Icons.gitHub className="w-6 h-6" />
        <Icons.User className="w-6 h-6" />
      </div>
    </main>
  );
}
