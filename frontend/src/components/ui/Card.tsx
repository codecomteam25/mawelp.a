import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}

export default function Card({
  children,
  className = "",
  padding = true,
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-ghana-gray-200 shadow-sm",
        padding && "p-5",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-base font-semibold text-ghana-gray-900">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-ghana-gray-400 mt-0.5">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
