export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string; pre?: boolean };

export type BlogPost = {
  slug: string;
  title: string;
  /** Optional; used for metadata / listings. Omitted when the post has no separate subtitle. */
  description?: string;
  /** Curated excerpt for HTML meta description, Open Graph, and Twitter when the body is long. */
  seoDescription?: string;
  /** Merged with site-wide keywords for meta and Open Graph article tags. */
  keywords?: readonly string[];
  publishedAt: string;
  blocks: readonly BlogBlock[];
};
