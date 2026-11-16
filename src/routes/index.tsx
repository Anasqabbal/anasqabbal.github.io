import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

type CommandEntry = { id: number; command: string };

const shortcuts = ["about", "skills", "projects", "contact"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anas Qabbal — Software Engineer | Terminal Portfolio" },
      {
        name: "description",
        content:
          "Explore Anas Qabbal's terminal-style portfolio across systems engineering, full-stack development, applied AI, and DevOps.",
      },
      { property: "og:title", content: "Anas Qabbal — Software Engineer" },
      {
        property: "og:description",
        content: "Systems, full-stack engineering, applied AI, and DevOps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TerminalPortfolio,
});

function CommandOutput({ command }: { command: string }) {
  switch (command) {
    case "help":
      return (
        <>
          <p>Available commands</p>
          <ul className="terminal-output-list">
            <li><strong>about</strong><span>Profile and focus</span></li>
            <li><strong>skills</strong><span>Areas of practice</span></li>
            <li><strong>projects</strong><span>Selected work domains</span></li>
            <li><strong>contact</strong><span>Contact information</span></li>
            <li><strong>clear</strong><span>Clear the terminal stream</span></li>
          </ul>
        </>
      );
    case "about":
    case "whoami":
      return (
        <>
          <p><span className="terminal-accent">Anas Qabbal</span> — Software Engineer</p>
          <p className="terminal-muted">
            My focus spans systems, full-stack engineering, applied AI, and DevOps.
          </p>
        </>
      );
    case "skills":
      return (
        <>
          <p>Areas of practice</p>
          <ul className="terminal-output-list">
            <li><strong>Systems</strong><span>Architecture, reliability, and performance</span></li>
            <li><strong>Full-stack</strong><span>Product experiences from interface to service</span></li>
            <li><strong>Applied AI</strong><span>Practical AI-enabled software</span></li>
            <li><strong>DevOps</strong><span>Automation, delivery, and infrastructure</span></li>
          </ul>
        </>
      );
    case "projects":
      return (
        <>
          <p>Work domains</p>
          <ul className="terminal-output-list">
            <li><strong>Systems</strong><span>Dependable foundations and software tooling</span></li>
            <li><strong>Products</strong><span>Connected full-stack applications</span></li>
            <li><strong>Applied AI</strong><span>Useful intelligence integrated into software</span></li>
            <li><strong>Platform</strong><span>Repeatable builds and operational workflows</span></li>
          </ul>
          <p className="terminal-note">Detailed project case studies have not been added yet.</p>
        </>
      );
    case "contact":
      return (
        <>
          <p>Get in touch</p>
          <p className="terminal-muted">
            Direct email and social links have not been added to this profile yet.
          </p>
        </>
      );
    default:
      return (
        <p className="terminal-error">
          {`command not found: ${command.split(/\s+/)[0] ?? command}. Type "help" to see available commands.`}
        </p>
      );
  }
}

export function TerminalPortfolio() {
  const [entries, setEntries] = useState<CommandEntry[]>([]);
  const [draft, setDraft] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const draftBeforeHistory = useRef("");
  const inputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const entryId = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const stream = streamRef.current;
    if (!stream) return;

    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    const start = stream.scrollTop;
    const distance = stream.scrollHeight - stream.clientHeight - start;
    if (distance <= 0) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      stream.scrollTop = stream.scrollHeight;
      return;
    }

    const startTime = performance.now();
    const scroll = (time: number) => {
      const progress = Math.min((time - startTime) / 150, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      stream.scrollTop = start + distance * eased;
      if (progress < 1) animationRef.current = requestAnimationFrame(scroll);
      else animationRef.current = null;
    };

    animationRef.current = requestAnimationFrame(scroll);
    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    };
  }, [entries]);

  const runCommand = useCallback((rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase();
    setDraft("");
    setHistoryIndex(-1);
    draftBeforeHistory.current = "";
    if (!command) return;

    if (command === "clear") {
      setEntries([]);
      return;
    }

    setHistory((previous) => [...previous, command]);
    setEntries((previous) => [...previous, { id: entryId.current++, command }]);
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(draft);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setDraft("");
      setHistoryIndex(-1);
      return;
    }

    if (event.key === "ArrowUp" && history.length > 0) {
      event.preventDefault();
      if (historyIndex < 0) draftBeforeHistory.current = draft;
      const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setDraft(history[nextIndex] ?? "");
    } else if (event.key === "ArrowDown" && historyIndex >= 0) {
      event.preventDefault();
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setDraft(draftBeforeHistory.current);
        draftBeforeHistory.current = "";
      } else {
        setHistoryIndex(nextIndex);
        setDraft(history[nextIndex] ?? "");
      }
    }
  };

  const runShortcut = (command: string) => {
    runCommand(command);
    inputRef.current?.focus();
  };

  return (
    <div className="terminal-shell">
      <header className="terminal-header">
        <div className="terminal-identity">
          <div className="terminal-mark" aria-hidden="true">aq/</div>
          <div>
            <p className="terminal-name">Anas Qabbal</p>
            <p className="terminal-role">SOFTWARE ENGINEER · SYSTEMS · FULL-STACK · AI · DEVOPS</p>
          </div>
        </div>
        <nav className="terminal-nav" aria-label="Portfolio sections">
          {shortcuts.map((command) => (
            <Button
              key={command}
              type="button"
              variant="ghost"
              className="terminal-shortcut"
              onClick={() => runShortcut(command)}
            >
              {command}
            </Button>
          ))}
        </nav>
        <div className="terminal-status" aria-label="Terminal session online">
          <span className="terminal-status-dot" aria-hidden="true" />
          <span>SESSION ONLINE</span>
        </div>
      </header>

      <main className="terminal-main" aria-label="Anas Qabbal developer portfolio">
        <div className="terminal-stream" ref={streamRef} role="log" aria-label="Terminal output" aria-live="polite" aria-relevant="additions text">
          <section className="terminal-welcome" aria-label="Introduction">
            <p className="terminal-prompt"><span>anas@portfolio</span>:~$ whoami</p>
            <output className="terminal-output terminal-welcome-output">
              <h1>Anas Qabbal</h1>
              <p className="terminal-lede">Software Engineer — Systems, Full-Stack, Applied AI, DevOps</p>
              <p className="terminal-intro">
                Building across the stack, from dependable systems and developer platforms to thoughtful products and practical AI.
              </p>
              <div className="terminal-welcome-actions" aria-label="Explore portfolio">
                {shortcuts.map((command) => (
                  <Button
                    key={command}
                    type="button"
                    variant="ghost"
                    className="terminal-shortcut"
                    onClick={() => runShortcut(command)}
                  >
                    <span aria-hidden="true">./</span>{command}
                  </Button>
                ))}
              </div>
            </output>
          </section>

          {entries.map(({ id, command }) => (
            <section className="terminal-entry" key={id}>
              <p className="terminal-prompt"><span>anas@portfolio</span>:~$ {command}</p>
              <output className="terminal-output" aria-label={`${command} output`}>
                <CommandOutput command={command} />
              </output>
            </section>
          ))}
        </div>

        <div className="terminal-composer">
          <form className="terminal-form" onSubmit={submit} aria-label="Run a terminal command">
            <label className="terminal-command-prompt" htmlFor="terminal-command">$</label>
            <input
              ref={inputRef}
              id="terminal-command"
              className="terminal-input"
              aria-label="Terminal command"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command…"
            />
            <Button type="submit" variant="outline" className="terminal-run" aria-label="Run command">
              <span aria-hidden="true">↵</span> Run
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}