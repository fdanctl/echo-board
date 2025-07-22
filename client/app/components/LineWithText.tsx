interface LineWithTextProps {
  className?: string;
  text: string;
}
export function LineWithText({ className, text }: LineWithTextProps) {
  return (
    <div className={`flex items-center justify-center relative ${className}`}>
      <div className="flex-1 border border-neutral-500 mr-2.5 rounded-full opacity-15"></div>
      <span className="font-medium">{text}</span>
      <div className="flex-1 border border-neutral-500 ml-2.5 rounded-full opacity-15"></div>
    </div>
  );
}
