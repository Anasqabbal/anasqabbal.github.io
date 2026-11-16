# Anas Terminal Story

Build a single-page, interactive terminal-style developer portfolio for **Anas Qabbal** (Software Engineer — Systems, Full-Stack, Applied AI, DevOps).

### 1. CORE ARCHITECTURAL CONCEPT ("ChatGPT-meets-TTY")

- **Zero Chrome / Borderless Shell:** Do NOT build a macOS window frame, traffic-light dots, sidebars, chat bubbles, or rounded message boxes. The entire viewport (`100dvh`) IS the terminal screen.

- **Stream Layout (ChatGPT-style vertical flow):** As commands are executed or selected, new output appends chronologically into a scrollable, centered stream (`max-width: 1120px`, padded with `24px`/`32px` spacing steps) above a pinned bottom command bar. Smooth auto-scroll to the newest output (`150ms ease-out`).

- **Accessibility & Performance:** Respect `prefers-reduced-motion`. Semantic HTML (`<main>`, `<nav>`, `<form>`, `<output>`), keyboard navigable (`Tab`, `Enter`, `Escape`, `ArrowUp`/`ArrowDown` for command history), and high-contrast focus rings (`2px solid #39FF14`, `outline-offset: 3px`).

### 2. DESIGN SYSTEM & TOKENS (STRICT ADHERENCE)

Define and use these exact CSS custom properties:

```css

:root {

  --bg: #0A0A0A;

  --bg-deep: #000000;

  --surface: #141414;

  --border: #262626;

  --text: #EDEDED;

  --muted: #8A8A8A;

  --accent: #39FF14;

  --accent-dim: #0F5C06;

  --glow: 0 0 12px rgba(57, 255, 20, 0.45);

  --warn: #FFB000;

  --error: #FF4D4D;

  --font-head: 'Space Grotesk', system-ui, sans-serif;

  --font-body: 'Inter', system-ui, sans-serif;

  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

}

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://anas-terminal-story.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0c050c94-de0e-4e7b-a42b-d290332e12fb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
