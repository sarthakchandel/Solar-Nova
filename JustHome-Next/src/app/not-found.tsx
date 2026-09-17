import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-8xl font-semibold text-gradient">404</p>
      <h2 className="mt-4 font-display text-2xl font-semibold text-primary dark:text-foreground">Page not found</h2>
      <p className="mt-2 text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="mt-8"><Button>Go Home</Button></Link>
    </div>
  );
}
