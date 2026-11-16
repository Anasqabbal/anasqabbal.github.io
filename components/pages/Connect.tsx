import { Label, ScanText } from "@/components/Block";

export function Connect() {
  return <div className="space-y-4">
    <Label>// connect</Label>
    <div className="space-y-2 code-text">
      <p><ScanText className="mr-4 inline-block w-20 text-[var(--muted)]">github:</ScanText><a data-stream="scan" href="https://github.com/Anasqabbal" target="_blank" rel="noopener noreferrer">github.com/Anasqabbal</a></p>
      <p><ScanText className="mr-4 inline-block w-20 text-[var(--muted)]">linkedin:</ScanText><a data-stream="scan" href="https://linkedin.com/in/anasqabbal" target="_blank" rel="noopener noreferrer">linkedin.com/in/anasqabbal</a></p>
      {/* TODO: add email address. */}
    </div>
  </div>;
}
