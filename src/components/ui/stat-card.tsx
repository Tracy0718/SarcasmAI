import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon?: LucideIcon;
  value: string;
  label: string;
  className?: string;
  variant?: "default" | "gradient";
}

export function StatCard({
  icon: Icon,
  value,
  label,
  className,
  variant = "default",
}: StatCardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl border transition-all duration-300 hover:scale-[1.02]",
        variant === "default"
          ? "bg-card border-border hover:border-primary/50"
          : "bg-gradient-primary border-transparent",
        className
      )}
    >
      {Icon && (
        <div className="mb-4">
          <div
            className={cn(
              "inline-flex p-3 rounded-lg",
              variant === "default"
                ? "bg-primary/10 text-primary"
                : "bg-white/10 text-white"
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
        </div>
      )}
      <div
        className={cn(
          "text-3xl md:text-4xl font-bold mb-1",
          variant === "gradient" && "text-white"
        )}
      >
        {value}
      </div>
      <div
        className={cn(
          "text-sm",
          variant === "default" ? "text-muted-foreground" : "text-white/80"
        )}
      >
        {label}
      </div>
    </div>
  );
}
