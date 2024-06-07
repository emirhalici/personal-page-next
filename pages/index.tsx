import { Manrope } from "next/font/google";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { SocialButtons } from "~/components/ui/social-buttons";
import { Url } from "~/components/ui/url";

const manrope = Manrope({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-24 ${manrope.className}`}
    >
      <div className="w-1/2 justify-start">
        <h1 className="pb-5 text-5xl font-semibold">Hello, I&apos;m Emir 👋</h1>
        <h2 className="text-2xl opacity-60">
          I am a software developer based in <b>Türkiye</b>.
        </h2>
        <SocialButtons />
        <div className="space-x-2 space-y-2">
          <Link href="/posts">
            <Button variant={"default"}>Read the blog</Button>
          </Link>
          <Button variant={"outline"}>Resume</Button>
        </div>
        <h2 className="text-xl font-bold opacity-90 pt-4">Projects</h2>
        <div className="pt-2 flex flex-col justify-start items-start">
          <Button variant={"link"} className="p-0">
            <Url href={"https://arithmatik.emir.bio/"}>- Arithmatik</Url>
          </Button>
          <Button variant={"link"} className="p-0">
            <Url href={"https://dartdateformatter.emir.bio/"}>
              - Dart Date Formatter
            </Url>
          </Button>
          <Button variant={"link"} className="p-0">
            <Url
              href={"https://github.com/emirhalici/react-rendering-playground"}
            >
              - React Rendering Playground
            </Url>
          </Button>
        </div>
      </div>
    </main>
  );
}
