import type { BlogPost } from "./types";

const dbPerformance: BlogPost = {
  slug: "db-performance",
  title:
    "Caching is never a solution for your slow query! Yeah, you heard it right.",
  seoDescription:
    "Stop throwing Redis at every slow query. Most of the time your schema, indexing strategy, and query design are the real bottlenecks.",
  keywords: [
    "database performance",
    "indexing",
    "composite index",
    "UUIDv4",
    "UUIDv7",
    "ULID",
    "PostgreSQL",
    "MySQL",
    "B+ tree",
    "Redis",
    "caching",
    "JSONB",
    "schema design",
    "query optimization",
    "primary key",
    "Backend",
  ],
  publishedAt: "2026-05-14",
  blocks: [
    {
      type: "p",
      text: "last night I was on a call with my friend ! they were trying to figure out how to add caching  to speed things up, but after looking into the database we found the real issues were missing indexes, poor composite index ordering, unordered UUID primary keys, and unnecessary scans. We also discussed storing some redundant data in jsonb to reduce joins because coming into 2026, performance is key rather than storage size and all also about the precomputed small table joins incase if we care about the aggregated data! ",
    },
    {
      type: "p",
      text: "composite index order matters a lot. Databases use indexes from left to right, so the order of columns inside the index should match how queries actually filter, sort, and access data. A different order can make the database partially use the index or completely skip it, leading to unnecessary scans and slower queries. Having a composite index alone is not enough  the ordering strategy is equally important.",
    },
    {
      type: "p",
      text: "also they were using UUIDv4 as the primary key. In MySQL, rows are clustered around the primary key, and with unordered primary keys you are killing DB performance with page splits on every insertion. This hurts both read and write performance.",
    },
    {
      type: "p",
      text: "when you have an ordered primary key, write performance increases because pages do not have to reorganize constantly on every insertion. And for range queries? Beautiful. Everything sits nicely in the leaf nodes of the B+ tree one after another.",
    },
    {
      type: "p",
      text: "In PostgreSQL, things are a bit different because of tuple IDs (CTID) and heap storage, so rows are not physically clustered around the primary key like MySQL. But still, ordered indexes help a lot with index locality, reduced fragmentation, better cache efficiency, and sequential scans.",
    },
    {
      type: "p",
      pre: true,
      text: `Key points:
• Composite index order matters (left-to-right access pattern)
• Proper indexing matters more than blindly adding cache
• Ordered primary keys improve insertion performance
• Integer IDs keep indexes smaller and faster
• UUIDv4 can heavily fragment clustered indexes
• Ordered UUIDs like UUIDv7/ULID are much better
• Redundant JSONB data is sometimes worth it for performance
• Good schema design beats premature caching`,
    },
    {
      type: "p",
      text: "Note: In postgres there is no primary index concept every index comes with 2 B tree scans boom! ",
    },
    {
      type: "p",
      text: "Stop throwing Redis at every slow query. Most of the time your schema, indexing strategy, and query design are the real bottlenecks.",
    },
    {
      type: "p",
      text: "#Backend #Database #Mysql #B+tree #PostgreSQL",
    },
  ],
};

const postsBySlug: Record<string, BlogPost> = {
  [dbPerformance.slug]: dbPerformance,
};

export function getBlogSlugs(): string[] {
  return Object.keys(postsBySlug);
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return postsBySlug[slug];
}
