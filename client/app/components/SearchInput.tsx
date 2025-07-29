import { Search } from "lucide-react";
import type { ChangeEvent } from "react";

interface SearchInputProps {
  id?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function SearchInput({
  id,
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    <div className="flex items-center px-3 py-2 border border-slate-400 rounded-2xl">
      <Search size={18} />
      <input
        id={id}
        name={id}
        value={value}
        type="search"
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-2 py-1 border-none focus:ring-0 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
      />
    </div>
  );
}
