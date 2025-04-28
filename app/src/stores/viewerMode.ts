import { atom } from "nanostores";

const params = new URLSearchParams(location.search);
const viewCallId = params.get("view");
const recorder = params.get("rec");

export const viewerModeStore = atom(
  viewCallId
    ? {
        mode: "viewer" as const,
        viewCallId,
      }
    : recorder !== null
    ? {
        mode: "recorder" as const,
        viewCallId: null,
      }
    : {
        mode: "host" as const,
        viewCallId: null,
      }
);
