"use client";

import { useEffect, useState } from "react";

export function Header({ onConnect }: { onConnect: () => void }) {
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    const loop = () => {
      if (paused) return;
      setVisible(true);
      timer = setTimeout(() => {
        setVisible(false);
        timer = setTimeout(loop, 6_000);
      }, 4_000);
    };
    loop();
    return () => clearTimeout(timer);
  }, [paused]);

  return (
    <header className="site-header">
      <div className="wordmark">AnasQABBAL$<span className="header-cursor" aria-hidden="true" /></div>
      <div className="header-hint-wrap">
        <button
          className={`header-hint ${visible ? "hint-visible" : "hint-hidden"}`}
          onClick={onConnect}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          tabIndex={visible ? 0 : -1}
          aria-hidden={!visible}
        >
          to connect run <span>/connect</span>
        </button>
      </div>
    </header>
  );
}
