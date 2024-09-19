import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Manrope } from "next/font/google";
import { Header } from "~/components/ui/header";


const manrope = Manrope({ subsets: ["latin"] });

interface Link {
  title: string;
  url: string;
  description?: string;
}

interface LinksPageProps {
  links: Link[];
}

export default function Page({ links }: LinksPageProps) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start py-6 px-2 md:px-24 ${manrope.className}`}
    >
      <Header />
      <div className="w-11/12 sm:w-1/2 justify-start pt-6">
        <h1 className="pb-5 text-4xl font-semibold">🔗 Links</h1>
        <ul className="flex flex-col justify-start items-start">
          {links.map((link) => (
            <LinkItem key={link.url} link={link} />
          ))}
        </ul>
      </div>
    </main>
  );
}

function LinkItem({ link }: { link: Link; }) {
  return (
    <li>
      <Button variant={"link"} className="p-0 text-lg">
        <a href={link.url} target="_blank">
          <p>
            - {link.title} {link.description && <span className="text-sm text-gray-500">({link.description})</span>}
          </p>

        </a>
      </Button>
    </li>
  );
}

export async function getStaticProps() {
  const links: Link[] = [
    {
      title: "crontab guru",
      url: "https://crontab.guru/",
      description: "Cron job syntax",
    },
    {
      title: "epochconverter",
      url: "https://www.epochconverter.com/",
      description: "Timestamp converter",
    },
    {
      title: "regex101",
      url: "https://regex101.com/",
      description: "Regex syntax",
    },
    {
      title: "RGBWColor Dartpad",
      url: "https://dartpad.dev/?id=f25977d33fb814e8dcf15f8dcd854be9",
      description: "Simplified RGBWColor implementation and conversion",
    },
  ];
  return {
    props: {
      links,
    },
  };
}
