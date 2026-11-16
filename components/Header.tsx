"use client";
import { useEffect, useState } from "react";

const hintText = "To connect run /connect";

export function Header() {
  const [hint, setHint] = useState("");

  useEffect(() => {
    let position = 0;
    let erasing = false;
    let timer: number;
    const tick = () => {
      if (!erasing && position < hintText.length) {
        position += 1;
        setHint(hintText.slice(0, position));
        timer = window.setTimeout(tick, 60);
      } else if (!erasing) {
        timer = window.setTimeout(() => {
          erasing = true;
          tick();
        }, 3000);
      } else if (position > 0) {
        position -= 1;
        setHint(hintText.slice(0, position));
        timer = window.setTimeout(tick, 30);
      } else {
        erasing = false;
        timer = window.setTimeout(tick, 800);
      }
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHint(hintText);
    } else {
      tick();
    }
    return () => window.clearTimeout(timer);
  }, []);

  return <header className="site-header">
    <div className="header-main">
      <div className="wordmark">AnasQABBAL$</div>
      <span className="header-cancel" aria-label="Cancelled">^C</span>
      <div className="profile-placeholder" aria-label="Profile photo placeholder" />
    </div>
    <div className="header-typewriter">
      <span className="block-cursor" />
      <span className="hint">{hint}</span>
    </div>
  </header>;
}
