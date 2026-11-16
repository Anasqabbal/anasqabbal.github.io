import { commandNames, type CommandName } from "@/lib/commands";
import { Label, ScanText } from "@/components/Block";

const descriptions: Record<CommandName, string> = {
  about: "who I am",
  connect: "how to reach me",
  projects: "what I built",
  education: "where I studied",
  help: "show available commands",
  clear: "reset the screen",
};

export function Help({ onCommand }: { onCommand: (command: string) => void }) {
  return <div className="space-y-3">
    <Label>// help</Label>
    <div className="space-y-2 code-text">{commandNames.map((command) => <p key={command}><button className="stream-scan text-left text-[var(--text)] hover:text-[var(--accent)] hover:underline" data-stream="scan" onClick={() => onCommand(command)}>/{command}</button><ScanText className="ml-5 text-[var(--muted)]">{descriptions[command]}</ScanText></p>)}</div>
  </div>;
}
