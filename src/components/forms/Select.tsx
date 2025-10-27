import React from "react";

type Option = {
  value: string | number;
  label: string;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  className?: string;
  options: Option[];
};

const Select: React.FC<SelectProps> = ({
  label,
  error,
  className = "",
  options,
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
      <select
        {...props}
        id={props.name}
        className={`w-full px-3 py-2 ${props.disabled == true ? "bg-primary/10" : ""} text-secondary text-sm sm:text-base font-normal border rounded-md focus:shadow-sm transition-all focus:outline-none focus:ring-0 focus:ring-primary  ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="" disabled>
          Select {label?.toLowerCase() || "an option"}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Select;
