import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getBlogPost, getBlogSlugs } from "@/content/blog/posts";
import {
  defaultKeywords,
  defaultOgImage,
  siteAuthor,
  siteName,
  siteTagline,
  toMetaDescription,
} from "@/lib/site";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return { title: "Post not found" };
  }

  const firstPlain =
    post.blocks.find((b) => b.type === "p" && !b.pre)?.text ?? post.title;

  const description =
    post.seoDescription ??
    (post.description
      ? toMetaDescription(post.description)
      : toMetaDescription(firstPlain));

  const keywords = [...new Set([...defaultKeywords, ...(post.keywords ?? [])])];

  const path = `/blog/${slug}`;
  const publishedTime = `${post.publishedAt}T00:00:00.000Z`;
  const ogImageAlt = `${post.title} — ${siteName}`;

  return {
    title: post.title,
    description,
    keywords,
    authors: [siteAuthor],
    creator: siteAuthor.name,
    publisher: siteAuthor.name,
    alternates: {
      canonical: path,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: path,
      siteName,
      title: post.title,
      description,
      publishedTime,
      modifiedTime: publishedTime,
      authors: [siteAuthor.url],
      section: siteTagline,
      tags: [...(post.keywords ?? [])],
      images: [
        {
          url: defaultOgImage.url,
          width: defaultOgImage.width,
          height: defaultOgImage.height,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [defaultOgImage.url],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background transition-colors">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-6 py-16 font-serif text-lg leading-[1.82] text-foreground/95 transition-colors sm:gap-14 sm:px-10 sm:py-24 sm:text-xl sm:leading-[1.85] lg:text-[1.3125rem] lg:leading-[1.88] dark:text-foreground/90">
        <nav className="font-sans text-base text-muted-foreground sm:text-lg">
          <Link
            href="/#writing"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Writing
          </Link>
          <span className="mx-2 text-border" aria-hidden>
            /
          </span>
          <span className="line-clamp-2 text-balance text-foreground sm:line-clamp-none">
            {post.title}
          </span>
        </nav>

        <header className="space-y-5 sm:space-y-6">
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-base">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="font-sans text-[1.875rem] font-semibold leading-[1.18] tracking-tight text-foreground text-balance sm:text-4xl sm:leading-[1.14] lg:text-[2.75rem] lg:leading-[1.1]">
            {post.title}
          </h1>
          {post.description ? (
            <p className="max-w-[60ch] text-lg text-muted-foreground sm:text-xl dark:text-muted-foreground/95">
              {post.description}
            </p>
          ) : null}
        </header>

        <article className="space-y-7 sm:space-y-9">
          {post.blocks.map((block, i) =>
            block.type === "h2" ? (
              <h2
                key={i}
                className="font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
              >
                {block.text}
              </h2>
            ) : (
              <p
                key={i}
                className={cn(
                  "max-w-[60ch] text-muted-foreground dark:text-muted-foreground/95",
                  block.pre && "whitespace-pre-line",
                )}
              >
                {block.text}
              </p>
            ),
          )}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
