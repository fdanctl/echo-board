import type { ChangeEvent } from "react";
import { capitalize } from "~/lib/utils";
import type { Options } from "~/types/trackOptions";

interface DropdownWithSearchProps {
  label: string;
  id: string;
  options: Options[];
  placeholder: string;
  value?: string;
  onChange?: (selected: string) => void;
}

export function SelectInput({
  label,
  id,
  options,
  placeholder,
  onChange,
}: DropdownWithSearchProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value)
  }
  return (
    <div>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id={id}
        name={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleChange}
      >
        <option value="">--{placeholder}--</option>
        {options.map((e) => (
          <option key={e.id} value={e.id}>
            {capitalize(e.name)}
          </option>
        ))}
      </select>
    </div>
  );
}
