import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col justify-start items-center p-24 ${inter.className}`}
    >
      <div className="justify-start w-1/2">
        <h1 className="text-3xl font-bold pb-2">Hello, I'm Emir 👋</h1>
        <h2 className="text-2xl">I am a software developer based in Türkiye.</h2>
      </div>
    </main>
  );
}
