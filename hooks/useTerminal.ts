import { useCallback, useEffect, useRef, useState } from "react";
import { normalizeCommand, resolveCommand } from "@/lib/commands";

export type TerminalEntry = { id: number; raw: string; command: string | null };

export function useTerminal() {
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const id = useRef(0);

  const run = useCallback((raw: string) => {
    const value = raw.trim();
    if (!value) return;
    const command = normalizeCommand(value);
    if (command === "clear") {
      setEntries([]);
    } else {
      setEntries((current) => [...current, { id: id.current++, raw: value, command: resolveCommand(value) }]);
    }
    setHistory((current) => [...current, value]);
    setHistoryIndex(-1);
  }, []);

  useEffect(() => {
    if (entries.length === 0) setHistoryIndex(-1);
  }, [entries.length]);

  const browseHistory = (direction: 1 | -1) => {
    if (history.length === 0) return "";
    const next = historyIndex < 0
      ? (direction < 0 ? history.length - 1 : -1)
      : Math.max(-1, Math.min(history.length - 1, historyIndex + direction));
    setHistoryIndex(next);
    return next < 0 ? "" : history[next] ?? "";
  };

  return { entries, run, browseHistory };
}
