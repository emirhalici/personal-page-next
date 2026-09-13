import { BiLogoGmail } from "react-icons/bi";
import { FaGithub, FaLinkedinIn, FaMediumM } from "react-icons/fa";

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
