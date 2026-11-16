import { stack, values } from "@/data/content";
import { Label, ReadText, ScanText } from "@/components/Block";

export function About() {
  return <div className="space-y-6">
    <Label>// about</Label>
    <ReadText>I am a software engineer who thinks in systems. I build software that is fast, clear, and reliable. From low-level code to full products.</ReadText>
    <section><Label>// mission</Label><ReadText>Turn hard technical problems into simple, solid software. Every time.</ReadText></section>
    <section><Label>// values</Label><div className="space-y-2">{values.map(([name, text]) => <p key={name}><ScanText className="font-bold">{name}:</ScanText>{" "}<span className="stream-read">{text.split(/(\s+)/).map((part, index) => part.trim() ? <span key={index} data-stream="read">{part}</span> : part)}</span></p>)}</div></section>
    <section><Label>// focus</Label><p className="code-text"><ScanText>Software Engineer · Full Stack · Systems · Applied AI · DevOps</ScanText></p></section>
    <section><Label>// stack</Label><p className="code-text"><ScanText>{stack}</ScanText></p></section>
    <section><Label>// status</Label><p className="code-text"><ScanText>Building resilient low-level + distributed systems</ScanText></p></section>
  </div>;
}
