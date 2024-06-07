import { FaGithub, FaLinkedinIn, FaMediumM } from "react-icons/fa";

interface IconButtonProps {
  label: string;
  href: string;
  children: React.ReactNode;
}
function IconButton({ children, href, label }: IconButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-2.5 rounded-lg bg-primary-foreground hover:bg-accent border border-input"
    >
      {children}
    </a>
  );
}

export function SocialButtons() {
  const size = 22;
  return (
    <div className="flex py-4 space-x-2">
      <IconButton label="Github" href="https://github.com/emirhalici">
        <FaGithub size={size} />
      </IconButton>
      <IconButton label="Medium" href="https://medium.com/@emirhalici">
        <FaMediumM size={size} />
      </IconButton>
      <IconButton
        label="Linkedin"
        href="https://www.linkedin.com/in/emirhalici/"
      >
        <FaLinkedinIn size={size} />
      </IconButton>
    </div>
  );
}
