import { atom } from "nanostores";

const params = new URLSearchParams(location.search);
const viewCallId = params.get("view");

export const viewerModeStore = atom(
  viewCallId
    ? {
        mode: "viewer" as const,
        viewCallId,
      }
    : {
        mode: "host" as const,
        viewCallId: null,
      }
);
