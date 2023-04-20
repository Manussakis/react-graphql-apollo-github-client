import { LinkProps } from "./types";

const Link = ({ children, className, href }: LinkProps) => (
  <a
    target="_blank"
    href={href}
    rel="noopener noreferrer"
    className={className}
  >
    {children}
  </a>
);

export default Link;
