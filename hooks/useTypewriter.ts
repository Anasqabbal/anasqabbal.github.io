"use client";
import { useEffect, useState } from "react";

export function useTypewriter(text: string, speed: number, active = true) {
  const [value, setValue] = useState(active ? "" : text);
  useEffect(() => {
    if (!active) return;
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setValue(text.slice(0, i));
      if (i >= text.length) window.clearInterval(timer);
    }, speed);
    return () => window.clearInterval(timer);
  }, [text, speed, active]);
  return value;
}
