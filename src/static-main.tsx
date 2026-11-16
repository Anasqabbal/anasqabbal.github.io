import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { TerminalPortfolio } from "./routes/index";
import "./styles.css";
import "./pages-overrides.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TerminalPortfolio />
  </StrictMode>,
);
