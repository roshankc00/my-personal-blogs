import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  getBlogPostExcerpt,
  getBlogPosts,
} from "@/content/blog/posts";
import { domains, expertise, lifecycle, stack } from "@/content/home";

export function HomeContent() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-20 px-6 py-16 font-serif text-lg leading-[1.82] text-foreground/95 transition-colors sm:gap-28 sm:px-10 sm:py-24 sm:text-xl sm:leading-[1.85] lg:text-[1.3125rem] lg:leading-[1.88] dark:text-foreground/90">
      <section className="space-y-8 sm:space-y-10">
        <p className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-base">
          Backend engineering
        </p>
        <h1 className="font-sans text-[1.875rem] font-semibold leading-[1.18] tracking-tight text-foreground text-balance sm:text-4xl sm:leading-[1.14] lg:text-[2.75rem] lg:leading-[1.1]">
          Building scalable systems that power modern products.
        </h1>
        <p className="max-w-[60ch] font-serif text-lg leading-[1.82] text-muted-foreground sm:text-xl sm:leading-[1.85] dark:text-muted-foreground/95">
          I am a backend engineer with 3+ years of experience shipping production
          infrastructure for concurrent users. I focus on clean architecture,
          TypeScript-first Node.js codebases, and systems that are observable, testable, and
          resilient when things go wrong.
        </p>
        <div className="flex flex-wrap gap-3 pt-1 font-sans">
          <Button asChild size="lg">
            <Link href="#writing">Read the blog</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#about">About my work</Link>
          </Button>
        </div>
      </section>

      <section
        id="writing"
        className="scroll-mt-28 rounded-2xl border border-border bg-muted/35 p-8 transition-colors sm:p-12 dark:border-border/60 dark:bg-muted/25"
      >
        <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Writing
        </h2>
        <p className="mt-5 max-w-[60ch] text-muted-foreground dark:text-muted-foreground/95">
          Notes on backend design, Node.js and the frameworks I use with it, data
          modeling, and running systems in production will appear here as posts go
          live.
        </p>
        <ul className="mt-10 space-y-4 font-sans">
          {getBlogPosts().map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group inline-flex w-full flex-col gap-2 rounded-xl border border-border/80 bg-background/80 px-5 py-4 text-left shadow-sm ring-1 ring-black/[0.03] transition-[border-color,box-shadow] hover:border-foreground/20 hover:shadow-md sm:px-6 sm:py-5 dark:border-border/60 dark:bg-card/60 dark:ring-white/[0.06] dark:hover:border-border"
              >
                <span className="text-lg font-semibold tracking-tight text-foreground group-hover:underline group-hover:underline-offset-4 sm:text-xl">
                  {post.title}
                </span>
                <span className="line-clamp-2 text-base leading-snug text-muted-foreground sm:text-lg sm:leading-snug">
                  {getBlogPostExcerpt(post)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="about" className="scroll-mt-28 space-y-8 sm:space-y-10">
        <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          What I build
        </h2>
        <p className="max-w-[60ch] text-muted-foreground dark:text-muted-foreground/95">
          I specialize in backends that need to stay correct and fast as product
          surface area grows: bounded contexts, clear contracts between services,
          and operational signals that make incidents boring to diagnose.
        </p>
        <ul className="grid gap-5">
          {expertise.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-border/90 bg-card p-6 shadow-sm ring-1 ring-black/[0.03] transition-[box-shadow,background-color,border-color] sm:p-7 dark:border-border/60 dark:bg-card/80 dark:shadow-none dark:ring-white/[0.06]"
            >
              <h3 className="font-sans text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-4 text-lg leading-[1.75] text-muted-foreground sm:leading-[1.8] dark:text-muted-foreground/95">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-8 sm:space-y-10">
        <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Stack and principles
        </h2>
        <p className="max-w-[60ch] text-muted-foreground dark:text-muted-foreground/95">
          Day to day I reach for Node.js and the right framework for the job—Nest,
          Express, Fastify, and others when they fit—alongside PostgreSQL and AWS,
          with TypeScript as the default language for shared types across services and
          clients. I care about
          naming, module boundaries, and making the “happy path” and failure modes
          equally explicit in code and in dashboards.
        </p>
        <div className="flex flex-wrap gap-2 font-sans">
          {stack.map((label) => (
            <span
              key={label}
              className="rounded-full border border-border bg-muted/60 px-4 py-2 text-sm font-medium leading-none text-foreground sm:text-base dark:border-border/70 dark:bg-muted/40"
            >
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-8 sm:space-y-10">
        <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Where I have shipped
        </h2>
        <p className="max-w-[60ch] text-muted-foreground dark:text-muted-foreground/95">
          Production systems I have contributed to span several domains. That variety
          shaped how I think about compliance, payments, real-time messaging, catalog
          and inventory, and learning progress—all with different consistency and
          latency requirements.
        </p>
        <ul className="grid gap-3 font-sans sm:grid-cols-2 sm:gap-4">
          {domains.map((d) => (
            <li
              key={d}
              className="rounded-xl border border-dashed border-border/90 px-5 py-4 text-base leading-snug text-muted-foreground sm:px-6 sm:py-5 sm:text-lg dark:border-muted-foreground/25 dark:bg-muted/15 dark:text-muted-foreground/95"
            >
              {d}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-8 sm:space-y-10">
        <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Owning the full backend lifecycle
        </h2>
        <p className="max-w-[60ch] text-muted-foreground dark:text-muted-foreground/95">
          I am comfortable owning work from design through deployment: sketching
          interfaces and data models, implementing with tests, packaging for
          reproducible runs, and shipping to the cloud with monitoring in place. I am
          effective as an individual contributor and as a technical lead—pairing,
          reviewing, and aligning the team on architecture without slowing delivery.
        </p>
        <ol className="list-decimal space-y-4 pl-7 font-sans text-lg leading-relaxed text-muted-foreground marker:font-semibold marker:text-foreground sm:pl-8 sm:leading-[1.75] dark:text-muted-foreground/95 dark:marker:text-foreground">
          {lifecycle.map((step) => (
            <li key={step} className="pl-2 marker:font-sans">
              {step}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
