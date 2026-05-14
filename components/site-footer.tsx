export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12 font-sans text-base text-muted-foreground transition-colors sm:py-14 sm:text-lg dark:border-border/60">
      <p className="mx-auto max-w-3xl px-6 text-center sm:px-10">
        © {new Date().getFullYear()} Roshan Karki.
      </p>
    </footer>
  );
}
