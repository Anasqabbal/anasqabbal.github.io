import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Download, Mic, Square } from "lucide-react";

type CommandEntry = { id: number; command: string };
type SpeechRecognitionInstance = {
  start: () => void;
  stop: () => void;
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: { results: { [index: number]: { [index: number]: { transcript: string } } } }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};
type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

const commands = [
  { name: "help", description: "show available commands" },
  { name: "about", description: "profile and focus" },
  { name: "skills", description: "areas of practice" },
  { name: "projects", description: "selected work domains" },
  { name: "contact", description: "contact information" },
  { name: "github", description: "open source profile" },
  { name: "clear", description: "clear the terminal stream" },
];

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
            {commands.map(({ name, description }) => (
              <li key={name}><strong>/{name}</strong><span>{description}</span></li>
            ))}
          </ul>
          <p className="terminal-note">Tip: use ↑ / ↓ to move through command history.</p>
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
          <p>Selected work domains</p>
          <ul className="terminal-output-list">
            <li><strong>Systems</strong><span>Dependable foundations and software tooling</span></li>
            <li><strong>Products</strong><span>Connected full-stack applications</span></li>
            <li><strong>Applied AI</strong><span>Useful intelligence integrated into software</span></li>
            <li><strong>Platform</strong><span>Repeatable builds and operational workflows</span></li>
          </ul>
          <p className="terminal-note">
            Browse current work on{" "}
            <a href="https://github.com/Anasqabbal/anasqabbal.github.io" target="_blank" rel="noreferrer">
              github.com/Anasqabbal/anasqabbal.github.io
            </a>
            .
          </p>
        </>
      );
    case "contact":
      return (
        <>
          <p>Get in touch</p>
          <p className="terminal-muted">
            The best place to connect is{" "}
            <a href="https://github.com/Anasqabbal" target="_blank" rel="noreferrer">
              github.com/Anasqabbal
            </a>
            .
          </p>
        </>
      );
    case "github":
      return (
        <p>
          <a href="https://github.com/Anasqabbal" target="_blank" rel="noreferrer">
            github.com/Anasqabbal
          </a>
        </p>
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
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [isListening, setIsListening] = useState(false);
  const draftBeforeHistory = useRef("");
  const inputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
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
    setSuggestionsOpen(false);
    setSelectedSuggestion(-1);
    setHistoryIndex(-1);
    draftBeforeHistory.current = "";
    if (!command) return;

    if (!command.startsWith("/")) {
      return;
    }

    const commandName = command.slice(1).split(/\s+/)[0];
    if (commandName === "clear") {
      setEntries([]);
      return;
    }

    setHistory((previous) => [...previous, command]);
    setEntries((previous) => [...previous, { id: entryId.current++, command: commandName }]);
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const suggestion = filteredCommands[selectedSuggestion];
    if (suggestionsOpen && suggestion) {
      runCommand(`/${suggestion.name}`);
      return;
    }
    runCommand(draft);
  };

  const filteredCommands = commands.filter(({ name }) =>
    `/${name}`.startsWith(draft.toLowerCase()),
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setDraft("");
      setSuggestionsOpen(false);
      setSelectedSuggestion(-1);
      setHistoryIndex(-1);
      return;
    }

    if (suggestionsOpen && filteredCommands.length > 1) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedSuggestion((current) => (current + 1) % filteredCommands.length);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedSuggestion((current) =>
          current <= 0 ? filteredCommands.length - 1 : current - 1,
        );
        return;
      }

      if (event.key === "Enter" && selectedSuggestion >= 0) {
        event.preventDefault();
        runCommand(`/${filteredCommands[selectedSuggestion].name}`);
        return;
      }
    }

    if (event.key === "ArrowUp" && history.length > 0) {
      event.preventDefault();
      if (historyIndex < 0) draftBeforeHistory.current = draft;
      const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setDraft(history[nextIndex] ?? "");
      setSuggestionsOpen(false);
    } else if (event.key === "ArrowDown" && historyIndex >= 0) {
      event.preventDefault();
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setDraft(draftBeforeHistory.current);
        draftBeforeHistory.current = "";
        setSuggestionsOpen(false);
      } else {
        setHistoryIndex(nextIndex);
        setDraft(history[nextIndex] ?? "");
        setSuggestionsOpen(false);
      }
    }
  };

  const chooseCommand = (command: string) => {
    runCommand(`/${command}`);
    inputRef.current?.focus();
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const speechWindow = window as Window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const Recognition =
      speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

    if (!Recognition) {
      inputRef.current?.focus();
      return;
    }

    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript.trim() ?? "";
      if (transcript) {
        const command = transcript.startsWith("/") ? transcript : `/${transcript}`;
        setDraft(command.toLowerCase());
        setSuggestionsOpen(command.startsWith("/"));
      }
    };
    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };
    recognition.onerror = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };
    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();
  };

  const downloadPortfolio = () => {
    const portfolio = [
      "Anas Qabbal",
      "Software Engineer — Systems, Full-Stack, Applied AI, DevOps",
      "",
      "Focus: dependable systems, thoughtful products, and practical AI-enabled tools.",
      "GitHub: https://github.com/Anasqabbal",
    ].join("\n");
    const url = URL.createObjectURL(new Blob([portfolio], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "anas-qabbal-portfolio.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="terminal-shell">
      <main className="terminal-main" aria-label="Anas Qabbal developer portfolio">
        <div className={`terminal-stream ${entries.length === 0 ? "terminal-stream-empty" : ""}`} ref={streamRef} role="log" aria-label="Terminal output" aria-live="polite" aria-relevant="additions text">
          {entries.length === 0 && (
            <p className="terminal-empty-state">
              enter <span>/help</span> to start exploring
            </p>
          )}
          {entries.map(({ id, command }) => (
            <section className="terminal-entry" key={id}>
              <p className="terminal-prompt"><span>anasqabbal</span>$_ /{command}</p>
              <output className="terminal-output" aria-label={`${command} output`}>
                <CommandOutput command={command} />
              </output>
            </section>
          ))}
        </div>

        <div
          className="terminal-composer"
          style={{ width: "min(100% - 48px, 840px)", margin: "0 auto 24px" }}
        >
          {suggestionsOpen && filteredCommands.length > 0 && (
            <div className="terminal-suggestions" role="listbox" aria-label="Available commands">
              {filteredCommands.map(({ name, description }, index) => (
                <button
                  key={name}
                  type="button"
                  id={`command-suggestion-${name}`}
                  role="option"
                  aria-selected={selectedSuggestion === index}
                  className={`terminal-suggestion ${selectedSuggestion === index ? "is-selected" : ""}`}
                  onClick={() => chooseCommand(name)}
                >
                  <strong>/{name}</strong>
                  <span>{description}</span>
                </button>
              ))}
            </div>
          )}
          <form
            className="terminal-form"
            style={{
              padding: "10px 14px 10px 20px",
              border: "1px solid rgba(138, 138, 138, 0.35)",
              borderRadius: "18px",
              background: "rgba(20, 20, 20, 0.92)",
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.28)",
            }}
            onSubmit={submit}
            aria-label="Run a terminal command"
          >
            <label className="terminal-command-prompt" htmlFor="terminal-command">
              anasqabbal$<span className="terminal-cursor" aria-hidden="true">_</span>
            </label>
            <input
              ref={inputRef}
              id="terminal-command"
              className="terminal-input"
              aria-label="Terminal command"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              value={draft}
              onChange={(event) => {
                const nextDraft = event.target.value;
                setDraft(nextDraft);
                setSuggestionsOpen(nextDraft.startsWith("/"));
                setSelectedSuggestion(nextDraft.startsWith("/") ? 0 : -1);
              }}
              onKeyDown={handleKeyDown}
              placeholder="/help"
            />
            <button
              type="button"
              className="terminal-icon-button"
              aria-label={isListening ? "Stop voice input" : "Start voice input"}
              aria-pressed={isListening}
              onClick={toggleVoiceInput}
              style={{ borderRadius: "10px" }}
            >
              {isListening ? <Square size={16} aria-hidden="true" /> : <Mic size={17} aria-hidden="true" />}
            </button>
            <button
              type="button"
              className="terminal-icon-button"
              aria-label="Download portfolio text file"
              onClick={downloadPortfolio}
              style={{ borderRadius: "10px" }}
            >
              <Download size={17} aria-hidden="true" />
            </button>
            <Button type="submit" variant="outline" className="terminal-run" aria-label="Run command">
              <span aria-hidden="true">↵</span> Run
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}