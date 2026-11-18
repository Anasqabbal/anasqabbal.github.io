import { about } from "@/data/content";
export function About() { return <Page label="about"><p className="read">{about.statement}</p><Section label="mission"><p className="read">{about.mission}</p></Section><Section label="values"><div className="rows">{about.values.map(([name, text]) => <p key={name}><b>{name}</b><span>{text}</span></p>)}</div></Section><Fact label="focus">{about.focus}</Fact><Fact label="stack">{about.stack}</Fact><Fact label="status">{about.status}</Fact></Page>; }
function Page({ label, children }: { label: string; children: React.ReactNode }) { return <div className="page"><Label text={label}/>{children}</div>; }
function Section({ label, children }: { label: string; children: React.ReactNode }) { return <section><Label text={label}/>{children}</section>; }
function Label({ text }: { text: string }) { return <div className="label">// {text}</div>; }
function Fact({ label, children }: { label: string; children: React.ReactNode }) { return <p className="fact"><span className="muted">{label}</span>{children}</p>; }
