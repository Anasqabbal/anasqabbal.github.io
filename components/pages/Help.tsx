import { commandNames, type CommandName } from "@/lib/commands";

const descriptions: Record<CommandName, string> = {
  about: "who I am",
  contact: "how to reach me",
  projects: "what I built",
  education: "where I studied",
  help: "show available commands",
  clear: "reset the screen",
};

export function Help({ onCommand }: { onCommand: (command: string) => void }) {
  return <div className="space-y-3">
    <p className="text-[var(--muted)]">// help</p>
    <div className="space-y-2">{commandNames.map((command) => <p key={command}><button className="text-left text-[var(--text)] hover:text-[var(--accent)] hover:underline" onClick={() => onCommand(command)}>/{command}</button><span className="ml-5 text-[var(--muted)]">{descriptions[command]}</span></p>)}</div>
  </div>;
}
