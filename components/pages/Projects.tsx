import { projects } from "@/data/content";

export function Projects() {
  return <div className="space-y-8">
    <p className="text-[var(--muted)]">// projects</p>
    {projects.map((project, index) => <article key={project.name} className="space-y-2">
      <p className="text-[var(--muted)]">{String(index + 1).padStart(2, "0")} / 04</p>
      <p><strong>{project.name}</strong>{"status" in project && project.status && <span className="ml-3 text-[var(--muted)]">[{project.status}]</span>}</p>
      <p>{project.summary}</p>
      <p className="text-[var(--muted)]">{project.stack}</p>
      {"link" in project && project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">↳ repository</a>}
    </article>)}
  </div>;
}
