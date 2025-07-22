import { useState, useRef, useEffect } from "react";
import { SearchInput } from "./SearchInput";
import { ChevronDown } from "lucide-react";
import type { Options } from "~/types/trackOptions";

interface DropdownWithSearchProps {
  label: string;
  options: Options[];
  onChange?: (selected: number[]) => void;
}

export function DropdownWithSearch({
  label,
  options,
  onChange,
}: DropdownWithSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: Options) => {
    console.log(option)
    const exists = selected.some((item) => item === option.id);
    const newSelected = exists
      ? selected.filter((item) => item !== option.id)
      : [...selected, option.id];
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const filteredOptions = options.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-72" ref={dropdownRef}>
      <p
        className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </p>
      <button
        type="button"
        onClick={toggleDropdown}
        className="py-1.5 pl-5 pr-3 me-2 mb-2 text-base text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-accent1 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex gap-2 items-center"
      >
        {label}
        <ChevronDown size={16}/>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="border-b border-gray-100 px-2 py-2">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search..."
            />
          </div>
          <ul className="max-h-60 overflow-y-auto text-sm">
            {filteredOptions.length ? (
              filteredOptions.map((option) => (
                <li
                  key={option.id}
                  className="px-4 py-2 flex items-center hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected.some(
                      (item) => item === option.id
                    )}
                    name={option.name}
                    id={option.name}
                    onChange={() => handleSelect(option)}
                    className="text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-3"
                  />
                  <label className="text-gray-800 cursor-pointer w-full" htmlFor={option.name}>
                    {option.name}
                  </label>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">No results</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
