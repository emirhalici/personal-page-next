import { Lexend } from "next/font/google";
import Link from "next/link";

const lexend = Lexend({ subsets: ["latin"] });

export default function Custom404() {
  return (
    <div className={`flex min-h-screen items-center justify-center ${lexend.className}`}>
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-2xl font-light">Page not found</p>
        <Link href="/">
          <button className="mt-4 border border-input bg-primary-foreground p-2 rounded-lg text-lg font-medium hover:bg-accent">
            Go back home
          </button>
        </Link>
      </div>
    </div>
  );
}
