import { stack, values } from "@/data/content";

export function About() {
  return <div className="space-y-6">
    <p className="text-[var(--muted)]">// about</p>
    <div><p className="font-bold">Anas QABBAL</p><p className="text-[var(--muted)]">Software engineer</p></div>
    <p>I am a software engineer who thinks in systems. I build software that is fast, clear, and reliable. From low-level code to full products.</p>
    <section><p className="mb-2 text-[var(--muted)]">// mission</p><p>Turn hard technical problems into simple, solid software. Every time.</p></section>
    <section><p className="mb-3 text-[var(--muted)]">// values</p><div className="space-y-2">{values.map(([name, text]) => <p key={name}><strong>{name}:</strong> <span className="text-[var(--muted)]">{text}</span></p>)}</div></section>
    <section><p className="text-[var(--muted)]">// focus</p><p>Software Engineer · Full Stack · Systems · Applied AI · DevOps</p></section>
    <section><p className="text-[var(--muted)]">// stack</p><p>{stack}</p></section>
    <section><p className="text-[var(--muted)]">// status</p><p>Building resilient low-level + distributed systems</p></section>
  </div>;
}
