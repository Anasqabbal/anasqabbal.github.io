"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { ReactNode } from "react";
import { About } from "@/components/pages/About";
import { Connect } from "@/components/pages/Connect";
import { Education } from "@/components/pages/Education";
import { Help } from "@/components/pages/Help";
import { Projects } from "@/components/pages/Projects";
import type { TerminalEntry } from "@/hooks/useTerminal";
import {
  COMMA_PAUSE_MS,
  PARAGRAPH_PAUSE_MS,
  READ_WORD_MS,
  SENTENCE_PAUSE_MS,
  SCAN_LINE_MS,
} from "@/lib/stream";

export type BlockHandle = { finish: () => void };

export function ReadText({ children }: { children: string }) {
  const words = children.split(/(\s+)/);
  return <p className="stream-read">{words.map((part, index) => part.trim() ? <span key={index} data-stream="read">{part}</span> : part)}</p>;
}

export function ScanText({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`stream-scan ${className}`} data-stream="scan">{children}</span>;
}

export function Label({ children }: { children: ReactNode }) {
  return <p className="stream-label"><ScanText>{children}</ScanText></p>;
}

export const Block = forwardRef<BlockHandle, { entry: TerminalEntry; onCommand: (command: string) => void }>(
  function Block({ entry, onCommand }, ref) {
    const rootRef = useRef<HTMLElement>(null);
    const finishRef = useRef<() => void>(() => undefined);

    useImperativeHandle(ref, () => ({ finish: () => finishRef.current() }), []);

    useEffect(() => {
      const root = rootRef.current;
      if (!root) return;
      const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-stream]"));
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let index = 0;
      let nextAt = performance.now();
      let frame = 0;
      let finished = false;
      const cursor = document.createElement("span");
      cursor.className = "stream-cursor";
      root.setAttribute("aria-busy", "true");

      const revealNode = (node: HTMLElement) => {
        node.classList.add("is-revealed");
        node.style.pointerEvents = node.tagName === "A" ? "auto" : "";
        const text = node.textContent ?? "";
        if (node.dataset.stream === "read") {
          if (/[,:;]/.test(text)) return READ_WORD_MS + COMMA_PAUSE_MS;
          if (/[.:;]$/.test(text)) return READ_WORD_MS + SENTENCE_PAUSE_MS;
          return READ_WORD_MS;
        }
        return SCAN_LINE_MS;
      };

      const finish = () => {
        if (finished) return;
        finished = true;
        cancelAnimationFrame(frame);
        nodes.forEach((node) => {
          node.classList.add("is-revealed");
          node.style.pointerEvents = node.tagName === "A" ? "auto" : "";
        });
        cursor.remove();
        root.removeAttribute("aria-busy");
      };
      finishRef.current = finish;

      const tick = (time: number) => {
        if (finished) return;
        if (index >= nodes.length) {
          cursor.remove();
          root.removeAttribute("aria-busy");
          finished = true;
          return;
        }
        if (time >= nextAt) {
          const node = nodes[index];
          node.classList.add("is-revealed");
          node.parentElement?.append(cursor);
          cursor.style.top = `${node.offsetTop + node.offsetHeight / 2}px`;
          cursor.style.left = `${node.offsetLeft + node.offsetWidth + 4}px`;
          node.style.pointerEvents = node.tagName === "A" ? "auto" : "";
          const pause = reduced ? 0 : revealNode(node);
          nextAt = time + pause + (node.dataset.stream === "read" ? 0 : PARAGRAPH_PAUSE_MS);
          index += 1;
        }
        frame = requestAnimationFrame(tick);
      };

      if (reduced) finish();
      else frame = requestAnimationFrame(tick);
      return () => { cancelAnimationFrame(frame); cursor.remove(); };
    }, []);

    return (
      <article ref={rootRef} className="stream-block space-y-6" onClick={() => finishRef.current()}>
        <p className="body-text"><span className="font-bold text-[var(--accent)]">AnasQABBAL$</span>{" "}<span>{entry.raw.replace(/^\/+/, "") === "contact" ? "/connect" : `/${entry.raw.replace(/^\/+/, "")}`}</span></p>
        <div className="max-w-[720px] body-text">
          {entry.command === "about" && <About />}
          {entry.command === "connect" && <Connect />}
          {entry.command === "projects" && <Projects />}
          {entry.command === "education" && <Education />}
          {entry.command === "help" && <Help onCommand={onCommand} />}
          {!entry.command && <p className="text-[var(--error)]">error: command not found: {entry.raw}. type /help</p>}
        </div>
      </article>
    );
  },
);
