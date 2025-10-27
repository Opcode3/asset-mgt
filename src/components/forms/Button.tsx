import React from "react";
import "../../module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`relative flex items-center justify-center px-2.5 sm:px-4 py-2 rounded-md font-medium text-white cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      <div className="flex items-center gap-2 sm:gap-3 font-bricolage text-sm sm:text-base ">
        {loading && <span className="loader size-5"></span>}
        <span>{children}</span>
      </div>
      {/* <span className={loading ? "opacity-0" : ""}>{children}</span> */}
    </button>
  );
};

export default Button;
