import { Link } from "react-router";

interface AnchorProps {
  className?: string;
  text: string;
  to: string;
}

export function Anchor({ className, text, to }: AnchorProps) {
  return (
    <Link
      className={`text-accent1 dark:text-accent1-dark hover:brightness-90 hover:dark:brightness-110 ${className}`}
      to={to}
    >
      {text}
    </Link>
  );
}
