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
      text: "database server accepts a connection from the client, client sends SQL query bytes, they sit in kernel buffer and then get copied into user space.                copyiiiiinggg ??????  boom who does it it's me again your  cpuuuuu",
    },
    {
      type: "p",
      text: "Now the parser validates the SQL text, then builds the structured representation of that SQL, and also checks whether requested tables, columns, and things actually exist in the database. ??????  boom who does it it's me again your  cpuuuuu",
    },
    {
      type: "p",
      text: "Then the planner comes in. It decides which indexes to use based on the WHERE clause  whether it can take shortcuts using indexes or has to scan pages one by one from disk. planning things ??? boom who does it it's me again your  cpuuuuu",
    },
    {
      type: "p",
      text: "Now execution starts. Yes IO brings pages from disk or memory, but boom  after that??? who does  filtering, sorting, grouping, aggregating all of that is heavy work. ??????  boom who does it it's me again your  cpuuuuu",
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

const memcachedExplained: BlogPost = {
  slug: "memcached-explained",
  title:
    "Memcached is often called a simple key value cache  but internally, cache invalidation is actually one of the most carefully engineered parts of the system.",
  seoDescription:
    "Memcached does not delete keys on a timer. TTL, lazy expiry, slab allocation, LRU, and background crawlers work together so the hot path stays fast.",
  keywords: [
    "Memcached",
    "cache invalidation",
    "TTL",
    "LRU",
    "slab allocator",
    "HOT WARM COLD",
    "caching",
    "Backend",
  ],
  publishedAt: "2026-05-16",
  blocks: [
    {
      type: "p",
      text: "Memcached is often called a simple key value cache  but internally, cache invalidation is actually one of the most carefully engineered parts of the system.",
    },
    {
      type: "p",
      text: "It does NOT actively track every key and delete it when TTL expires.",
    },
    {
      type: "p",
      text: "Instead, it uses a lazy invalidation model where expiration is only checked when a key is accessed or when memory pressure forces cleanup.",
    },
    {
      type: "p",
      text: "When you set a key with TTL, Memcached does not start a timer.it simply stores an absolute expiration timestamp.so the data still physically stays in memory even after it is logically expired.no background timers. No per key deletion jobs because that would be too expensive at scale.",
    },
    {
      type: "p",
      text: "cache invalidation happens in a reactive way.when a GET request comes in, Memcached checks the item.If it is expired, it is treated as a cache miss and removed at that moment.So cleanup happens inside normal traffic flow, not separately.but but but question comes in mind what if they are not accessed again haha they  just sit in memory and waste space and that would be a great problem ",
    },
    {
      type: "p",
      text: "to solve this, Memcached also uses LRU eviction and background cleanup.LRU means Least Recently Used.So old and unused data gets removed first when memory is needed.",
    },
    {
      type: "p",
      text: "Memcached does not use normal memory allocation.It uses something called slab allocator.memory is split into size-based groups.small objects in one group, medium in another, large in another.Each group manages its own memory and eviction.",
    },
    {
      type: "p",
      text: "Inside each slab, there is an LRU list.Recently used items stay at the front.Old unused items move to the back.When memory is full, Memcached removes items from the back.",
    },
    {
      type: "p",
      text: "In early versions, this LRU system used a single global lock.So every read and write had to fight for the same structure.On multi-core systems, this created serious slowdowns. daamn man this is soooo soo expensive every read comes with tons of update that LRU queue man thats gets fired ",
    },
    {
      type: "p",
      text: "To fix this, Memcached evolved.Instead of one LRU, it now uses multiple groups:",
    },
    {
      type: "p",
      text: "HOT, WARM, and COLD.",
    },
    {
      type: "p",
      text: "HOT = frequently used data",
    },
    {
      type: "p",
      text: "WARM = sometimes used data",
    },
    {
      type: "p",
      text: "COLD = rarely used data",
    },
    {
      type: "p",
      text: "This reduces contention and improves performance.",
    },
    {
      type: "p",
      text: "Memcached also added background LRU crawler threads.These threads slowly scan memory and clean expired or unused items.So cleanup happens in the background without blocking real requests.",
    },
    {
      type: "p",
      text: "Cache invalidation in Memcached is not one system.It is multiple systems working together: TTL, LRU, slab allocation, and background cleanup.Each one handles a different job.",
    },
    {
      type: "p",
      text: "TTL decides if data is still valid.LRU decides what to remove when memory is full.Slab decides where data is stored.Crawler handles slow cleanup in background.",
    },
    {
      type: "p",
      text: "Because of this design, a key can be expired but still exist in memory.Or still valid but already evicted.This feels weird at first… but this is what keeps the system fast.",
    },
    {
      type: "p",
      text: "Modern Memcached avoids heavy work on the request path.No strict deletion. No expensive tracking. No immediate cleanup everywhere.Everything is delayed, batched, and handled in background.",
    },
    {
      type: "p",
      text: "At the end of the day, Memcached is not about perfect cache invalidation.It is about speed, simplicity, and scaling under heavy load.It chooses “fast and good enough” over “perfect and slow”.",
    },
    {
      type: "p",
      text: "boom boom Moral: hey you  yes you fellow you don't design perfect system from day one .  you build something that works, then you observe how it fails under scale, and then you improve it step by step. The more i learn about these internals the more i love the journey of the things and all how they are built and improve over the time.",
    },
    {
      type: "p",
      text: "Note: To Build the simple systems in the software industry is really hard and takes a lot of time and effort to get it right. but the good thing is that once you get it right, it's really easy to maintain and scale and the people will love the simple things and the things that are easy to understand and maintain.",
    },
    {
      type: "p",
      text: "I love how Memcached is built, and how it has been maintained and scaled over time. I love how systems are built and how they are continuously improved over time.",
    },
  ],
  hashtags: "#Backend #Memcached #Caching #LRU #TTL #SlabAllocator",
};

const postsBySlug: Record<string, BlogPost> = {
  [dbPerformance.slug]: dbPerformance,
  [databaseLoveCpu.slug]: databaseLoveCpu,
  [memcachedExplained.slug]: memcachedExplained,
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
