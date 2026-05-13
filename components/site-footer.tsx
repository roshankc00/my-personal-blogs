export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10 font-sans text-[0.9375rem] text-muted-foreground transition-colors dark:border-border/60">
      <p className="mx-auto max-w-2xl px-5 text-center sm:px-8">
        © {new Date().getFullYear()} Roshan Karki.
      </p>
    </footer>
  );
}
