import { Link } from "react-router";

export function Anchor({
  className,
  text,
  to,
}: {
  className?: string;
  text: string;
  to: string;
}) {
  return (
    <Link
        className={`text-accent1 dark:text-accent1-dark hover:brightness-90 hover:dark:brightness-110 ${className}`}
      to={to}
    >
      {text}
    </Link>
  );
}
