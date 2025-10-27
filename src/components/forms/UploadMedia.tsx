import React, { useState, useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";

type UploadMediaProps = {
  accept?: string;
  onFileSelect?: (files: File[]) => void;
  label?: string;
  name: string;
  multiple?: boolean;
  error?: string;
};

const UploadMedia: React.FC<UploadMediaProps> = ({
  accept = "image/*",
  onFileSelect,
  label,
  name,
  multiple = false,
  error = "",
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    const totalFiles = [...files, ...selectedFiles].slice(0, 5); // limit 5
    setFiles(totalFiles);
    onFileSelect?.(totalFiles);
  };

  const handleClick = () => fileInputRef.current?.click();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm text-secondary mb-1">
          {label}
        </label>
      )}

      <input
        type="file"
        multiple={multiple}
        accept={accept}
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        onClick={handleClick}
        className={`cursor-pointer border ${
          error ? "border-red-400" : "border-gray-200"
        } rounded-lg p-3 flex items-center justify-between hover:bg-gray-50 transition`}
      >
        <p className="text-secondary text-sm">
          {files.length > 0
            ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
            : "Click to upload images"}
        </p>
        <FiUploadCloud className="text-gray-400 size-5" />
      </div>

      {files.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {files.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-md border"
              />
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default UploadMedia;
