"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { startTransition, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-9 w-[8.75rem] shrink-0 animate-pulse rounded-full bg-muted/80 dark:bg-muted/40"
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme !== "light";

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className="relative isolate flex h-9 w-[8.75rem] shrink-0 rounded-full border border-border/90 bg-muted/70 p-0.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] dark:border-border/60 dark:bg-muted/35 dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 z-0 h-[calc(100%-4px)] w-[calc(50%-4px)] -translate-y-1/2 rounded-full bg-background shadow-sm ring-1 ring-black/[0.06] transition-[left,right] duration-200 ease-out dark:bg-card dark:shadow-md dark:ring-white/[0.08]",
          isDark ? "left-0.5 right-auto" : "left-auto right-0.5",
        )}
      />
      <button
        type="button"
        role="radio"
        aria-checked={isDark}
        className={cn(
          "relative z-10 flex flex-1 items-center justify-center gap-1 rounded-full px-2 text-xs font-semibold tracking-wide transition-colors",
          isDark
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground/90",
        )}
        onClick={() => setTheme("dark")}
      >
        <Moon className="size-3.5 shrink-0 opacity-80" aria-hidden />
        Dark
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={!isDark}
        className={cn(
          "relative z-10 flex flex-1 items-center justify-center gap-1 rounded-full px-2 text-xs font-semibold tracking-wide transition-colors",
          !isDark
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground/90",
        )}
        onClick={() => setTheme("light")}
      >
        <Sun className="size-3.5 shrink-0 opacity-80" aria-hidden />
        Light
      </button>
    </div>
  );
}
