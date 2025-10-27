// Button.tsx
import React, { type ReactNode } from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  bgColor?: string; // Tailwind background color class, e.g., "bg-blue-500"
  textColor?: string; // Tailwind text color class, e.g., "text-white"
  icon?: ReactNode; // Any icon component
  className?: string; // Additional custom classes
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  bgColor = "bg-blue-500",
  textColor = "text-white",
  icon,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${bgColor} ${textColor} px-4 py-2 text-sm rounded flex items-center gap-2 hover:opacity-90 transition ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;
