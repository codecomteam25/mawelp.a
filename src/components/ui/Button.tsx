import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  icon?: ReactNode;
}

const variantStyles = {
  primary: "bg-ghana-green text-white hover:bg-ghana-green-dark shadow-sm",
  secondary: "bg-ghana-gold text-ghana-black hover:bg-ghana-gold-dark shadow-sm",
  outline:
    "border border-ghana-gray-300 text-ghana-gray-700 hover:bg-ghana-gray-50",
  ghost:
    "text-ghana-gray-600 hover:bg-ghana-gray-100 hover:text-ghana-gray-900",
  danger: "bg-ghana-red text-white hover:bg-ghana-red-dark shadow-sm",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-2.5 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  icon,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ghana-green/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
