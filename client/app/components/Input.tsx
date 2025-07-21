export function Input({
  type = "text",
  label,
  placeholder,
  id,
  required = false,
}: {
  type?: "text" | "email" | "password" | "url";
  label: string;
  placeholder: string;
  id: string;
  required: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accent1 focus:border-accent1 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent1-dark dark:focus:border-accent1-dark"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
