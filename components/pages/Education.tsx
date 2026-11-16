import { education } from "@/data/content";

export function Education() {
  return <div className="space-y-6">
    <p className="text-[var(--muted)]">// education</p>
    <div className="space-y-5">{education.map((item) => <article key={item.school}>
      <p className="font-bold">{item.school}</p>
      <p className="text-[var(--muted)]">{item.program}</p>
      {/* TODO: add years and place when available. */}
    </article>)}</div>
  </div>;
}
