import { projects } from "@/data/content";
import { Label, ReadText, ScanText } from "@/components/Block";

export function Projects() {
  return <div className="space-y-12">
    <Label>// projects</Label>
    {projects.map((project, index) => <article key={project.name} className="space-y-2">
      <p className="label-text"><ScanText>{String(index + 1).padStart(2, "0")} / 04</ScanText></p>
      <p className="body-text"><ScanText className="font-bold">{project.name}</ScanText>{"status" in project && project.status && <ScanText className="ml-3 text-[var(--muted)]">[{project.status}]</ScanText>}</p>
      <ReadText>{project.summary}</ReadText>
      <p className="code-text"><ScanText>{project.stack}</ScanText></p>
      {"link" in project && project.link && <p className="code-text"><a data-stream="scan" href={project.link} target="_blank" rel="noopener noreferrer">↳ repository</a></p>}
    </article>)}
  </div>;
}
