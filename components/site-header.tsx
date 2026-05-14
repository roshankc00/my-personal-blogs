import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 font-sans backdrop-blur-md transition-colors supports-[backdrop-filter]:bg-background/75 dark:border-border/50 dark:bg-background/85 dark:supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 px-6 sm:h-16 sm:px-10">
        <Link
          href="/"
          className="min-w-0 truncate text-base font-semibold tracking-tight text-foreground sm:text-lg"
        >
          Roshan Karki
        </Link>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <nav className="flex items-center gap-0.5 text-base sm:text-lg">
            <Button variant="ghost" size="sm" asChild>
              <Link href="#writing">Writing</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="#about">About</Link>
            </Button>
          </nav>
          <div className="mx-1 hidden h-5 w-px bg-border sm:block dark:bg-border/80" aria-hidden />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
