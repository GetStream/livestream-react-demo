import { createContext, type Context } from "react";

export interface DeviceToggleState {
  isPending: boolean;
  isEnabled: boolean;
}

export const DeviceToggleStateContext: Context<DeviceToggleState> =
  createContext<DeviceToggleState>({
    isPending: false,
    isEnabled: false,
  });
