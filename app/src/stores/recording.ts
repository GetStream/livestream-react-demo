import { atom } from "nanostores";

export type RecordingState =
  | "never-started"
  | "start-pending"
  | "started"
  | "stop-pending"
  | "stopped";

export const recordingStateStore = atom<RecordingState>("never-started");
