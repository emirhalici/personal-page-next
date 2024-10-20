import { BiLogoGmail } from "react-icons/bi";
import { FaGithub, FaLinkedinIn, FaMediumM } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa6";
import { SiDart } from "react-icons/si";
import { MdLanguage } from "react-icons/md";
import { Separator } from "./separator";

const iconSize = 16;

export function SocialButtons() {
  const divider = <Separator className="mx-2" />;

  return (
    <div>
      <p className="font-light opacity-60 text-sm pb-2">Find me elsewhere</p>
      <div className="flex flex-col space-y-2 border border-input rounded-lg bg-primary-foreground p-1">
        <div className="flex flex-col">
          <SocialButton title={"Github"} href={"https://github.com/emirhalici"} children={<FaGithub size={iconSize} />} />
          {divider}
          <SocialButton title={"Medium"} href={"https://medium.com/@emirhalici"} children={<FaMediumM size={iconSize} />} />
          {divider}
          <SocialButton title={"Linkedin"} href={"https://www.linkedin.com/in/emirhalici/"} children={<FaLinkedinIn size={iconSize} />} />
          {divider}
          <SocialButton title={"Email Me"} href={"mailto:dev@emir.bio"} children={<BiLogoGmail size={iconSize} />} />
        </div>
      </div>
    </div>
  );
}


type SocialButtonProps = {
  title: string;
  href: string;
  children: React.ReactNode;
};
function SocialButton(props: SocialButtonProps) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={props.title}
      className="flex items-center px-2 py-1 hover:bg-accent transition-all rounded-lg"
    >
      <div className="bg-accent p-1.5 rounded-lg">
        {props.children}
      </div>
      <span className="text-xs font-normal p-2">{props.title}</span>
    </a>
  );
}


export function Projects() {
  const divider = <Separator className="mx-2" />;
  return (
    <div>
      <p className="font-light opacity-60 text-sm pb-2 pt-6">Projects</p>
      <div className="flex flex-col border border-input rounded-lg bg-primary-foreground p-1">

        <ProjectButton
          title={"Arithmatik"}
          href={"https://arithmatik.emir.bio/"}
          children={<FaGamepad size={16} />}
          description={"Arithmetic based math game I launched with a couple of days"}
        />
        {divider}
        <ProjectButton
          title={"Dart Date Formatter"}
          href={"https://dartdateformatter.emir.bio/"}
          children={<SiDart size={16} />}
          description={"A simple date formatter library for Dart"}
        />
        {divider}
        <ProjectButton
          title={"React Rendering Playground"}
          href={"https://github.com/emirhalici/react-rendering-playground"}
          children={<FaGithub size={16} />}
          description={"A playground for experimenting with React rendering"}
        />
        {divider}
        <ProjectButton
          title={"Tic Tac Toe"}
          href={"/tic-tac-toe"}
          children={<FaGamepad size={16} />}
          description={"Tic Tac Toe with a twist"}
        />
        {divider}
        <ProjectButton
          title={"Useful Links"}
          href={"/useful-links"}
          children={<MdLanguage size={16} />}
          description={"Small curation of web pages I find useful"}
        />

      </div>
    </div>
  );
}



type ProjectButtonProps = {
  title: string;
  href: string;
  description: string;
  children: React.ReactNode;
};
function ProjectButton(props: ProjectButtonProps) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={props.title}
      className="px-2 py-1 hover:bg-accent transition-all rounded-lg flex flex-col"
    >
      <div className="flex items-center ">
        <div className="bg-accent p-1.5 rounded-lg">
          {props.children}
        </div>
        <span className="text-sm font-normal p-2">{props.title}</span>
      </div>
      <span className="font-light opacity-60 text-xs pt-1 pb-2">{props.description}</span>
    </a>
  );
}