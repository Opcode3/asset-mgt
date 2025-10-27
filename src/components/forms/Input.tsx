import React, { useState } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  error,
  className = "",
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === "password";

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`mb-3 relative ${className}`}>
      {label && (
        <label
          htmlFor={props.name}
          className="block text-[13px] lg:text-sm font-normal text-secondary mb-0.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          type={isPasswordType && showPassword ? "text" : type}
          id={props.name}
          className={`w-full px-3 py-2 text-secondary font-marcellus text-sm sm:text-base font-normal border rounded-md focus:shadow-sm transition-all focus:outline-none focus:ring-0 focus:ring-primary ${
            error ? "border-red-500" : "border-gray-300"
          } ${isPasswordType ? "pr-10" : ""}`}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-2 flex items-center text-lg sm:text-xl lg:text-2xl text-gray-500"
            tabIndex={-1}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
