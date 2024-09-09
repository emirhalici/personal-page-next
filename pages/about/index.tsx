import { Manrope } from "next/font/google";
import { Header } from "~/components/ui/header";

const manrope = Manrope({ subsets: ["latin"] });

export default function Page() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start py-6 px-2 md:px-24 ${manrope.className}`}
    >
      <Header />
      <div className="w-11/12 sm:w-1/2 justify-start pt-6">
        <h1 className="pb-5 text-4xl font-semibold">📑 About</h1>
        <p>
          I'm Emir, a software developer based in Türkiye. I enjoy fiddling with code and building prototypes.
        </p>
        <h2 className="pt-5 pb-2 text-xl opacity-80 font-semibold">Experience</h2>
        <p>
          I work as a software developer since 2022 primarily with Flutter and AWS.
          In recent years, I have been working on an IoT system with a serverless architecture.
        </p>
        <h2 className="pt-5 pb-2 text-xl opacity-80 font-semibold">Education</h2>
        <p>I studied Computer Engineering at Ankara University. I graduated in 2024 with a GPA of <b>3.59</b>. </p>
      </div>
    </main>
  );
}
