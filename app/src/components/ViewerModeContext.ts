import { createContext, useContext } from "react";

export interface ViewerModeContextValue {
  mode: "host" | "viewer";
}

export const ViewerModeContext = createContext<
  ViewerModeContextValue | undefined
>(undefined);

export function useViewerMode() {
  const context = useContext(ViewerModeContext);

  if (!context) {
    throw new Error("Viewer mode used outside of context");
  }

  return context.mode;
}
