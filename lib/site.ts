/** Canonical site origin (no trailing slash). */
export const siteUrl = "https://blog.roshankarki1.com.np";

export const siteOrigin = new URL(siteUrl);

export const siteName = "Roshan Karki";

export const siteTagline = "Backend engineering blog";

export const defaultTitle = `${siteName} — ${siteTagline}`;

export const defaultDescription =
  "Backend engineer writing about scalable APIs, Node.js and mainstream frameworks, PostgreSQL, AWS, and observable systems.";

/** Shared across pages; blog posts merge post-specific keywords. */
export const defaultKeywords = [
  siteName,
  "backend engineering",
  "Node.js",
  "NestJS",
  "Express",
  "Fastify",
  "TypeScript",
  "PostgreSQL",
  "MySQL",
  "AWS",
  "API design",
  "observability",
  "scalable systems",
] as const;

export const siteAuthor = {
  name: siteName,
  url: siteUrl,
} as const;

/** Default Open Graph / Twitter preview image (same asset sitewide). */
export const defaultOgImage = {
  url: "/og/og.png",
  width: 768,
  height: 1024,
  alt: defaultTitle,
} as const;

/** Shorten running text for meta description and OG/Twitter description (~155 chars). */
export function toMetaDescription(source: string, max = 155): string {
  const singleLine = source.replace(/\s+/g, " ").trim();
  if (singleLine.length <= max) {
    return singleLine;
  }
  const slice = singleLine.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  const head = lastSpace > 70 ? slice.slice(0, lastSpace) : slice;
  return `${head.trimEnd()}…`;
}
