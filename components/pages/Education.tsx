import { education } from "@/data/content";
import { Label, ScanText } from "@/components/Block";

export function Education() {
  return <div className="space-y-6">
    <Label>// education</Label>
    <div className="space-y-5">{education.map((item) => <article key={item.school}>
      <p className="body-text"><ScanText className="font-bold">{item.school}</ScanText></p>
      <p className="body-text text-[var(--muted)]"><ScanText>{item.program}</ScanText></p>
      {/* TODO: add years and place when available. */}
    </article>)}</div>
  </div>;
}
