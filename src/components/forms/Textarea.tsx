import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  className?: string;
};

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={props.name}
          // className="block text-sm sm:text-[15px] lg:text-base font-medium text-secondary mb-1 "
          className="block text-[13px] lg:text-sm font-normal text-secondary mb-0.5 "
        >
          {label}
        </label>
      )}
      <textarea
        {...props}
        id={props.name}
        className={`w-full px-3 py-2 text-secondary text-sm sm:text-base font-normal border rounded-md focus:shadow-sm transition-all focus:outline-none focus:ring-0 focus:ring-primary  resize-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Textarea;
