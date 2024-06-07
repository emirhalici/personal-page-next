interface UrlProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}
export function Url({ children, href, className }: UrlProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
