import { atom } from "nanostores";

export type RecorderState =
  | {
      ready: false;
    }
  | {
      ready: true;
      config: RecorderConfig;
    };

export interface RecorderConfig {
  base_url: string;
  api_key: string;
  token: string;
  call_type: string;
  call_id: string;
}

export const recorderStore = atom<RecorderState>({ ready: false });
