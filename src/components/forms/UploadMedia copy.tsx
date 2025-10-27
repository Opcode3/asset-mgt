import React, { useState, useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { MdImage, MdVideoLibrary } from "react-icons/md";

type UploadMediaProps = {
  accept?: string; // e.g. 'image/*,video/*'
  onFileSelect?: (file: File) => void;
  label?: string;
  error?: string;
  name: string;
};

const UploadMedia: React.FC<UploadMediaProps> = ({
  accept = "image/*,video/*",
  onFileSelect,
  label,
  name,
  error = "",
}) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileSelect?.(selectedFile);
    }

    console.log({ error });
  };

  const getFileIcon = () => {
    if (!file) return <FiUploadCloud className="text-gray-400 size-5" />;
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (isImage) return <MdImage className="text-blue-500 size-5" />;
    if (isVideo) return <MdVideoLibrary className="text-purple-500 size-5" />;
    return <FiUploadCloud className="text-gray-400 size-5" />;
  };

  return (
    <div className=" w-full relative">
      <input
        type="file"
        accept={accept}
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      {label && (
        <label
          htmlFor={name}
          className="block text-base font-medium text-secondary mb-1"
        >
          {label}
        </label>
      )}

      <div 
      className=" border border-gray-200 rounded-lg w-full p-3 grid grid-cols-[auto_30px] gap-3"
      >
        <div className="">
          <div>
            {file ? (
              <p className="mt-2 text-secondary text-sm font-medium text-center">
                {file.name}
              </p>
            ) : (
              <p className="text-secondary text-sm">
                Click to upload {accept.includes("image") && "an image"}
                {accept.includes("video") && accept.includes("image")
                  ? " or "
                  : ""}
                {accept.includes("video") && "a video"}
              </p>
            )}
          </div>
        </div>
        <span>{getFileIcon()}</span>
      </div>
    </div>
  );
};

export default UploadMedia;
