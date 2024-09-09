interface UrlProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  newTab?: boolean;
}
export function Url({ children, href, className, newTab = true }: UrlProps) {
  return (
    <a
      href={href}
      target={newTab ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
