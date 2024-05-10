import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center  p-24 ${inter.className}`}
    >
      <Image
        alt="EV"
        src="/images/emir_halici.jpg"
        width={400}
        height={400}
        className="my-4 rounded-md border-4 border-gray-800 shadow-md"
      ></Image>
      <h1 className="text-3xl font-bold">Emir Halici</h1>
      <h1 className="text-2xl font-bold">The EV</h1>
      <span className="">(Eternal Virgin)</span>
    </main>
  );
}
