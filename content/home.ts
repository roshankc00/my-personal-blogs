export const expertise = [
  {
    title: "APIs at scale",
    description:
      "High-throughput REST and GraphQL APIs designed for clarity, versioning, and predictable performance under load.",
  },
  {
    title: "Real-time systems",
    description:
      "WebSocket architectures and streaming patterns that keep clients in sync without sacrificing reliability.",
  },
  {
    title: "Event-driven backends",
    description:
      "Microservices and async pipelines that decouple domains, improve resilience, and scale with traffic.",
  },
] as const;

export const stack = [
  "NestJS",
  "TypeScript",
  "PostgreSQL",
  "AWS",
  "Clean architecture",
  "Observability",
] as const;

export const domains = [
  "Dating & social",
  "E-commerce",
  "Learning (LMS)",
  "Fintech",
] as const;

export const lifecycle = [
  "System design and trade-off analysis",
  "Implementation with maintainable boundaries",
  "Testing with TDD and Jest",
  "Containerization and repeatable environments",
  "Cloud deployment and operational readiness",
] as const;
