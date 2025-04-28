import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { recorderStore, type RecorderConfig } from "./stores/recorderStore.ts";
import { viewerModeStore } from "./stores/viewerMode.ts";

import "./index.css";
import App from "./App.tsx";
import RecorderApp from "./RecorderApp.tsx";

const rootEl = document.getElementById("root")!;
const root = createRoot(rootEl);

if (viewerModeStore.get().mode === "recorder") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).setupLayout = (config: RecorderConfig) => {
    recorderStore.set({ ready: true, config });
  };

  rootEl.style.padding = "0";

  root.render(
    <StrictMode>
      <RecorderApp />
    </StrictMode>
  );
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
