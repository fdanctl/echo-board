interface PrimaryBtnProps {
  className?: string;
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function PrimaryBtn({
  className,
  text,
  type = "button",
  onClick,
}: PrimaryBtnProps) {
  return (
    <button
      type={type}
      className={`text-white bg-accent1 hover:brightness-95 focus:ring-4 focus:ring-gray-100 dark:focus-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-accent1-dark focus:outline-none dark:focus:ring-blue-800 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
