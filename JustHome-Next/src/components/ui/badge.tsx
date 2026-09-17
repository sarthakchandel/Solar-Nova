import { cn } from "@/lib/utils";

type Variant = "default" | "accent" | "primary" | "muted";

const variants: Record<Variant, string> = {
  default: "bg-muted text-foreground",
  accent: "bg-accent/15 text-accent border border-accent/30",
  primary: "bg-primary/10 text-primary border border-primary/20",
  muted: "bg-muted text-muted-foreground",
};

export function Badge({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", variants[variant], className)} {...props} />
  );
}
