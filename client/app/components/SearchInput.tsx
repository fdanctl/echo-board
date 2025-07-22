import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    <div className="flex items-center px-3 py-2 border border-gray-200 rounded-2xl">
        <Search size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-2 py-1 border-none focus:ring-0 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
      />
    </div>
  );
}
