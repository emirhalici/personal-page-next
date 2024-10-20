import { Lexend } from "next/font/google";
import Link from "next/link";
import { Projects, SocialButtons } from "~/components/ui/cards";
import { Header } from "~/components/ui/header";
import { Separator } from "~/components/ui/separator";
import { Url } from "~/components/ui/url";



const lexend = Lexend({ subsets: ["latin"] });

export default function Home() {
  const urlStyle = 'underline text-primary hover:text-primary';
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start py-6 px-2 ${lexend.className}`}
    >
      <Header />
      <div className="w-11/12 max-w-2xl justify-start pt-6">
        <h1 className="pb-5 text-4xl">Software engineer fixing problems and writing code.</h1>
        <div className="text-lg opacity-80 font-light space-y-3">
          <p>
            Hi there 👋. I&apos;m Emir, a software developer based in <b>Türkiye</b>. I specialise in mobile applications and it&apos;s supporing infrastructures.
          </p>
          <p>
            I&apos;m currently working at <Url href="https://www.gemstonelights.com/" className={urlStyle}>Gemstone Lights</Url> where I help build the best smart lighting product on the market!
          </p>
          <p>
            I also sometimes write <Link href={"/posts"} className={urlStyle}>blog posts</Link>  here and there about things I find interesting. Learn more <Link href="/about" className={urlStyle}>
              about me
            </Link>
          </p>
        </div>
        <Separator className="my-4" />

        <SocialButtons />
        <Projects />
      </div>
    </main >
  );
}

