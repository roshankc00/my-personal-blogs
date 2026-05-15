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
  ],
  hashtags: "#Backend #Database #Mysql #B+tree #PostgreSQL",
};

const databaseLoveCpu: BlogPost = {
  slug: "database-love-cpu",
  title:
    "I always thought database CPUs just chill most of the time and IO is doing all the heavy work… but I was wrong.",
  seoDescription:
    "Queries are slow for more than IO. Parsing, planning, copying buffers, and execution filtering all burn CPU—and expensive queries steal it from everyone else.",
  keywords: [
    "database CPU",
    "query performance",
    "database IO",
    "SQL parser",
    "query planner",
    "query execution",
    "PostgreSQL",
    "MySQL",
    "cache pressure",
    "Backend",
  ],
  publishedAt: "2026-05-15",
  blocks: [
    {
      type: "p",
      text: "I always thought database CPUs just chill most of the time and IO is doing all the heavy work… but I was wrong.",
    },
    {
      type: "h2",
      text: "Here is the reason why??",
    },
    {
      type: "p",
      text: "database server accepts a connection from the client, client sends SQL query bytes, they sit in kernel buffer and then get copied into user space.                copyiiiiinggg ??????  boom who does it its cpuuuuu",
    },
    {
      type: "p",
      text: "Now the parser validates the SQL text, then builds the structured representation of that SQL, and also checks whether requested tables, columns, and things actually exist in the database. ??????  boom who does it its cpuuuuu",
    },
    {
      type: "p",
      text: "Then the planner comes in. It decides which indexes to use based on the WHERE clause  whether it can take shortcuts using indexes or has to scan pages one by one from disk. planning things ??? boom who does it its cpuuuuu",
    },
    {
      type: "p",
      text: "Now execution starts. Yes IO brings pages from disk or memory, but boom  after that??? who does  filtering, sorting, grouping, aggregating all of that is heavy work. ??????  boom who does it its cpuuuuu",
    },
    {
      type: "p",
      text: "So yeah, sometimes queries are slow not only because of IO, but because the query itself is unbounded and expensive and worse, it can slow down other queries too by consuming CPU, memory, and cache pressure. ",
    },
    {
      type: "p",
      text: "We underestimate how much work happens inside the database before and after touching disk. ",
    },
  ],
  hashtags: "#Backend #Database #CPU #PostgreSQL #MySQL #QueryPerformance",
};

const postsBySlug: Record<string, BlogPost> = {
  [dbPerformance.slug]: dbPerformance,
  [databaseLoveCpu.slug]: databaseLoveCpu,
};

export function getBlogSlugs(): string[] {
  return Object.keys(postsBySlug);
}

export function getBlogPosts(): BlogPost[] {
  return Object.values(postsBySlug).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getBlogPostExcerpt(post: BlogPost): string {
  const paragraphs = post.blocks.filter((b) => b.type === "p" && !b.pre);
  const excerpt =
    paragraphs.find((b) => b.text !== post.title) ?? paragraphs[0];
  return excerpt?.text ?? "";
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return postsBySlug[slug];
}
