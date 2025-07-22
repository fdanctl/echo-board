import googleSvg from "../assets/googleLogo.svg";

interface ProviderBtnProps {
  className?: string;
  provider: "Google";
  type?: "button" | "submit" | "reset";
  minWidth?: boolean;
  onClick?: () => void;
}

export function ProviderBtn({
  className,
  provider,
  type = "button",
  minWidth = false,
  onClick,
}: ProviderBtnProps) {
  const providerMap = new Map([["Google", googleSvg]]);

  return (
    <button
      className={`flex justify-center items-center gap-2 px-8 py-2 ${
        minWidth && "w-fit"
      } border border-obsidian dark:border-isabelline rounded-lg duration-100 cursor-pointer ${className}`}
      type={type}
      onClick={onClick}
    >
      <img
        src={providerMap.get(provider)}
        alt="google logo"
        width={18}
        height={18}
      />
      <p className="font-medium">Continue with {provider}</p>
    </button>
  );
}
