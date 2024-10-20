import { Lexend } from "next/font/google";
import Link from "next/link";
import { Projects, SocialButtons } from "~/components/ui/cards";
import { Header } from "~/components/ui/header";
import { Separator } from "~/components/ui/separator";
import { screenWidth } from "~/lib/utils";


const lexend = Lexend({ subsets: ["latin"] });

export default function Home() {
  const urlStyle = 'underline text-primary hover:text-primary';
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start py-6 px-2 ${lexend.className}`}
    >
      <Header />
      <div className={`${screenWidth} justify-start pt-6`}>
        <h1 className="pb-5 text-3xl">Software engineer fixing problems and writing code.</h1>
        <div className="text-sm opacity-80 font-light space-y-3">
          <p>
            Hi there 👋. I&apos;m Emir, a software developer based in <b>Türkiye</b>. I specialise in mobile applications and it&apos;s supporing infrastructures.
          </p>
          <p>
            I&apos;m currently working at Gemstone Lights where I help build the best smart lighting on the market!
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

