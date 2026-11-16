import { About } from "@/components/pages/About";
import { Contact } from "@/components/pages/Contact";
import { Education } from "@/components/pages/Education";
import { Help } from "@/components/pages/Help";
import { Projects } from "@/components/pages/Projects";
import type { TerminalEntry } from "@/hooks/useTerminal";

export function Block({ entry, onCommand }: { entry: TerminalEntry; onCommand: (command: string) => void }) {
  return <article className="animate-[fade-in_150ms_ease-out] space-y-6">
    <p><span className="font-bold text-[var(--accent)]">AnasQABBAL$</span> <span className="text-[var(--text)]">/{entry.raw.replace(/^\/+/, "")}</span></p>
    <div className="max-w-[720px] text-[15px] leading-6">
      {entry.command === "about" && <About />}
      {entry.command === "contact" && <Contact />}
      {entry.command === "projects" && <Projects />}
      {entry.command === "education" && <Education />}
      {entry.command === "help" && <Help onCommand={onCommand} />}
      {!entry.command && <p className="text-[var(--error)]">error: command not found: {entry.raw}. type /help</p>}
    </div>
  </article>;
}
