import { Manrope } from "next/font/google";
import Link from "next/link";
import { screenWidth } from "~/lib/utils";
const manrope = Manrope({ subsets: ["latin"] });

export function Header() {
  return (
    <header className={`${screenWidth} ${manrope.className} pb-4`}>
      <div className="flex flex-col items-start">
        <h1 className="text-lg font-semibold text-primary hover:opacity-80 transition-all">
          <Link href="/">Emir Halıcı</Link>
        </h1>
        <h4 className="text-sm opacity-70 hover:opacity-85 transition-all">
          <a href="mailto:dev@emir.bio">dev@emir.bio</a>
        </h4>
      </div>
    </header>
  );
}
