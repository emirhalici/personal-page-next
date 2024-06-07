import { Manrope } from "next/font/google";
import Link from "next/link";
import { Button } from "~/components/ui/button";
const manrope = Manrope({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-24 ${manrope.className}`}
    >
      <div className="w-1/2 justify-start">
        <h1 className="pb-8 text-3xl font-semibold">Hello, I'm Emir 👋</h1>
        <h2 className={`text-2xl`}>
          I am a software developer based in <b>Türkiye</b>.
        </h2>
        <div className="pt-6 space-x-2 space-y-2">
          <Link href="/posts">
            <Button variant={"default"}>Read the blog</Button>
          </Link>
          <Button variant={"outline"}>Resume</Button>
          <Button variant={"outline"}>Projects</Button>
        </div>
      </div>
    </main>
  );
}
