import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  variant?: "default" | "green" | "gold" | "red";
}

const variantStyles = {
  default: "bg-white border-ghana-gray-200",
  green: "bg-ghana-green/5 border-ghana-green/20",
  gold: "bg-ghana-gold/5 border-ghana-gold/20",
  red: "bg-ghana-red/5 border-ghana-red/20",
};

const iconVariantStyles = {
  default: "bg-ghana-gray-100 text-ghana-gray-600",
  green: "bg-ghana-green/10 text-ghana-green",
  gold: "bg-ghana-gold/20 text-ghana-gold-dark",
  red: "bg-ghana-red/10 text-ghana-red",
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-5 transition-shadow hover:shadow-md",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-ghana-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1 text-ghana-gray-900 truncate">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-ghana-gray-400 mt-0.5">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                "text-xs mt-1 font-medium",
                trend.positive ? "text-ghana-green" : "text-ghana-red"
              )}
            >
              {trend.positive ? "+" : "-"} {trend.value}
            </p>
          )}
        </div>
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
            iconVariantStyles[variant]
          )}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}
