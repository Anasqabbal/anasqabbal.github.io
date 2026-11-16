"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "aqabbal_profile_avatar_v1";
const rows: readonly [string, string][] = [
  ["LOGIN", "aqabbal"],
  ["FULL_NAME", "Anas QABBAL"],
  ["CAMPUS", "1337 Coding School · UM6P (Khouribga, MA)"],
  ["CURRICULUM", "42 Network Common Core — Level 11.68 (125%)"],
  ["CORE_STACK", "C · C++98/11 · TypeScript · Python · React · FastAPI"],
  ["INFRA_SEC", "Docker · Linux · Nginx · ModSecurity WAF · HashiCorp Vault"],
  ["FLAGSHIPS", "SentinelRAG · ft_transcendence · WEBSERV · Inception"],
  ["STATUS", "Available · 4–6 Month PFE Software Engineering Internship"],
] as const;

export function Profile() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [visible, setVisible] = useState(0);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    setAvatar(window.localStorage.getItem(STORAGE_KEY));
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisible((current) => Math.min(rows.length, current + 1));
    }, 120);
    return () => window.clearInterval(timer);
  }, []);

  const timestamp = useMemo(() => {
    const date = new Date();
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")} ${date.toLocaleTimeString("en-GB")}`;
  }, []);

  const upload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file?.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatar(reader.result);
        window.localStorage.setItem(STORAGE_KEY, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const copy = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(""), 1600);
  };

  return <section className="profile-page" aria-label="Anas QABBAL profile">
    <div className="profile-command">bash$ whoami<span className="profile-cursor" /></div>
    <pre className="profile-header">{`/* ************************************************************************** */
/*                         aqabbal.profile                                  */
/*   By: aqabbal <aqabbal@student.1337.ma>                                  */
/*   Updated: ${timestamp} by aqabbal                                        */
/* ************************************************************************** */`}</pre>
    <h1 className="profile-name">Anas QABBAL<span>_</span></h1>
    <div className="profile-photo-row">
      <button className="profile-photo" type="button" onClick={() => inputRef.current?.click()} aria-label="Upload profile photo">
        {avatar ? <img src={avatar} alt="Anas QABBAL" /> : <strong>[A<span>_</span>]</strong>}
        <small>avatar.jpg</small>
      </button>
      <button className="profile-action" type="button" onClick={() => inputRef.current?.click()}>[ upload ]</button>
      <input ref={inputRef} hidden type="file" accept="image/*" onChange={upload} />
    </div>
    <p className="profile-slogan">&gt; Systems that do not break.</p>
    <p className="profile-bio">Software engineer who thinks in systems. Focused on fast, reliable software from low-level C/C++ to backend infrastructure, full-stack applications, and local AI systems.</p>
    <div className="profile-table">
      <div className="profile-label">// t_profile</div>
      {rows.slice(0, visible).map(([key, value]) => <div className="profile-row" key={key}><span>{key}</span><strong>{value}{key === "STATUS" && <i />}</strong>{(key === "GITHUB" || key === "LINKEDIN") && <button type="button" onClick={() => copy(value, key)}>{copied === key ? "[ copied ]" : "[ copy ]"}</button>}</div>)}
    </div>
    <div className="profile-command">bash$<span className="profile-cursor" /></div>
  </section>;
}
