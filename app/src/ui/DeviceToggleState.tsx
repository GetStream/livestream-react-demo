import { createContext } from "react";

export interface DeviceToggleState {
  isPending: boolean;
  isEnabled: boolean;
}

export const DeviceToggleStateContext = createContext<DeviceToggleState>({
  isPending: false,
  isEnabled: false,
});
