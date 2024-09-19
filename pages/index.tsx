import { Manrope } from "next/font/google";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Header } from "~/components/ui/header";
import { SocialButtons } from "~/components/ui/social-buttons";
import { Url } from "~/components/ui/url";

const manrope = Manrope({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start py-6 px-2 md:px-24 ${manrope.className}`}
    >
      <Header />
      <div className="w-11/12 sm:w-1/2 justify-start pt-6">
        <h1 className="pb-5 text-5xl font-semibold">Hello, I&apos;m Emir 👋</h1>
        <h2 className="text-2xl opacity-60">
          <p>
            I am a software developer based in <b>Türkiye</b>.
          </p>
        </h2>
        <SocialButtons />
        <div className="space-x-2 space-y-2">
          <Link href="/posts">
            <Button variant={"default"}>Blog</Button>
          </Link>
          <Link href="/about">
            <Button variant={"outline"}>About me</Button>
          </Link>
          {/* TODO: RESUME */}
          {/* <Button variant={"outline"}>Resume</Button> */}
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
          <Button variant={"link"} className="p-0">
            <Link href={"/useful-links"}>- Useful Links</Link>
          </Button>
        </div>
      </div>
    </main >
  );
}
