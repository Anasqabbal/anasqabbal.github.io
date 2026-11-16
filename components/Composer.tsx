"use client";
import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";

export function Composer({ value, onChange, onSubmit, onKeyDown }: { value: string; onChange: (value: string) => void; onSubmit: () => void; onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);
  const [cursorOffset, setCursorOffset] = useState(0);
  const [hint, setHint] = useState("");
  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    const text = 'type "/" or disc to start chat';
    let position = 0;
    let erasing = false;
    let timer: number;
    const tick = () => {
      if (!erasing && position < text.length) {
        position += 1;
        setHint(text.slice(0, position));
        timer = window.setTimeout(tick, 60);
      } else if (!erasing) {
        timer = window.setTimeout(() => {
          erasing = true;
          tick();
        }, 3000);
      } else if (position > 0) {
        position -= 1;
        setHint(text.slice(0, position));
        timer = window.setTimeout(tick, 30);
      } else {
        erasing = false;
        timer = window.setTimeout(tick, 800);
      }
    };
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setHint(text);
    } else {
      tick();
    }
    return () => window.clearTimeout(timer);
  }, []);
  useLayoutEffect(() => {
    setCursorOffset(mirrorRef.current?.getBoundingClientRect().width ?? 0);
  }, [value]);
  const submit = (event: FormEvent) => { event.preventDefault(); onSubmit(); };
  return <form className="composer" onSubmit={submit}>
    <span className="composer-prompt">anasqabbal_$:</span>
    <span className={`composer-input${!value && hint ? " has-hint" : ""}`}>
      <span ref={mirrorRef} className="composer-mirror" aria-hidden="true">{value}</span>
      <span className="input-cursor" aria-hidden="true" style={{ left: `${cursorOffset}px` }} />
      {!value && <span className="composer-hint" aria-hidden="true" style={{ left: `${cursorOffset + 14}px` }}>{hint}</span>}
      <input ref={inputRef} aria-label="Command" value={value} onChange={(event) => onChange(event.target.value)} onKeyDown={onKeyDown} autoComplete="off" />
    </span>
  </form>;
}
