import { useRef, type Dispatch, type SetStateAction } from "react";

interface FileInputProps {
  className?: string;
  label: string;
  id: string;
  info?: string;
  acceptedFiles?: string;
  required?: boolean;
  file: File | null;
  setFile: (f: File | null) => void;
}

export function FileInput({
  className,
  label,
  id,
  file,
  info,
  acceptedFiles,
  required,
  setFile,
}: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    console.log("Selected file (input):", selectedFile);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <div
        className="flex items-center gap-2 bg-gray-50 text-gray-700 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg cursor-pointer"
        onClick={handleButtonClick}
      >
        <div className="bg-accent2 dark:bg-accent2-dark text-white px-4 py-1.5 rounded-l-lg">
          {label}
        </div>
        <div>{file ? file.name : "No file selected"}</div>

        <input
          type="file"
          id={id}
          name={id}
          accept={`${acceptedFiles}`}
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
          required={required}
        />
      </div>
      {info && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{info}</p>
      )}
    </div>
  );
}
