import { BiLogoGmail } from "react-icons/bi";
import { FaGithub, FaLinkedinIn, FaMediumM } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa6";
import { SiDart } from "react-icons/si";
import { MdLanguage } from "react-icons/md";

const iconSize = 16;

export function SocialButtons() {
  const divider = <hr className="border-t border-input mx-3" />;

  return (
    <div>
      <p className="font-light opacity-60 pb-2">Find me elsewhere</p>
      <div className="flex flex-col space-y-2 border border-input rounded-lg bg-primary-foreground p-1">
        <div className="flex flex-col">
          <SocialButton title={"Github"} href={"https://github.com/emirhalici"}>
            <FaGithub size={iconSize} />
          </SocialButton>
          {divider}
          <SocialButton title={"Medium"} href={"https://medium.com/@emirhalici"} >
            <FaMediumM size={iconSize} />
          </SocialButton>
          {divider}
          <SocialButton title={"Linkedin"} href={"https://www.linkedin.com/in/emirhalici/"} >
            <FaLinkedinIn size={iconSize} />
          </SocialButton>
          {divider}
          <SocialButton title={"Email Me"} href={"mailto:dev@emir.bio"} >
            <BiLogoGmail size={iconSize} />
          </SocialButton>
        </div>
      </div>
    </div>
  );
}


interface SocialButtonProps {
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
      <span className="font-normal p-2">{props.title}</span>
    </a>
  );
}


export function Projects() {
  const divider = <hr className="border-t border-input mx-3" />;
  return (
    <div>
      <p className="font-light opacity-60 pb-2 pt-6">Projects</p>
      <div className="flex flex-col border border-input rounded-lg bg-primary-foreground p-1">
        <ProjectButton
          title={"Arithmatik"}
          href={"https://arithmatik.emir.bio/"}
          description={"Arithmetic based math game I launched with a couple of days"}>
          <FaGamepad size={16} />
        </ProjectButton>
        {divider}
        <ProjectButton
          title={"Dart Date Formatter"}
          href={"https://dartdateformatter.emir.bio/"}
          description={"Helpful utility page to help work with dates in Dart"}>
          {<SiDart size={16} />}
        </ProjectButton>
        {divider}
        <ProjectButton
          title={"React Rendering Playground"}
          href={"https://github.com/emirhalici/react-rendering-playground"}
          description={"A playground for experimenting with React rendering"}>
          {<FaGithub size={16} />}
        </ProjectButton>
        {divider}
        <ProjectButton
          title={"Tic Tac Toe"}
          href={"/tic-tac-toe"}
          description={"Tic Tac Toe with a twist"}>
          {<FaGamepad size={16} />}
        </ProjectButton>
        {divider}
        <ProjectButton
          title={"Useful Links"}
          href={"/useful-links"}
          description={"Small curation of web pages I find useful"}>
          {<MdLanguage size={16} />}
        </ProjectButton>

      </div>
    </div>
  );
}



interface ProjectButtonProps {
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
        <span className="font-normal text-lg p-2">{props.title}</span>
      </div>
      <span className="font-light opacity-60 pt-1 pb-2">{props.description}</span>
    </a>
  );
}