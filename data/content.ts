export const values = [
  ["Precision", "Details matter. Names, memory, edge cases, pixels."],
  ["Systems thinking", "See the whole machine, not only one part."],
  ["Ownership", "I build it, I test it, I ship it, I fix it."],
  ["Clarity", "Simple code. Simple words. No fake complexity."],
  ["Craft under speed", "Deliver fast, but never sloppy."],
  ["Depth", "Understand how things work under the hood."],
] as const;

export const stack = "C · C++ · JavaScript · TypeScript · Next.js · NestJS · Python · MySQL · PostgreSQL · Bash · Docker";

export const projects = [
  {
    name: "SentinelRAG",
    status: "in progress, not public",
    summary: "Local-first security intelligence and codebase vulnerability engine. A local LLM detects the functions a developer writes in the editor, matches them against a Qdrant vector DB, reranks the results and picks the best match.",
    stack: "Python · FastAPI · Qdrant · Ollama · Docker Compose",
  },
  {
    name: "ft_transcendence",
    status: "42 Network capstone, team project",
    summary: "Real-time multiplayer gaming platform with microservices. Anas built the Liar's Bar game service, the ModSecurity WAF and the HashiCorp Vault secret management.",
    stack: "TypeScript · Next.js · Node.js · Socket.IO · Docker Compose",
    link: "https://github.com/Anasqabbal/ft_transcendence",
  },
  {
    name: "webserv",
    summary: "Non-blocking HTTP/1.1 web server built from scratch in C++98 with I/O multiplexing.",
    stack: "C++98 · HTTP/1.1",
    link: "https://github.com/Anasqabbal/webserv", // TODO: check the repo is public
  },
  {
    name: "inception",
    summary: "Multi-container Docker infrastructure on custom Alpine images.",
    stack: "Docker · Alpine · Nginx · WordPress · MariaDB",
    link: "https://github.com/Anasqabbal/inception", // TODO: check the repo is public
  },
] as const;

export const education = [
  { school: "42 Network", program: "Common core completed", years: "", place: "" }, // TODO: add years and place
];
