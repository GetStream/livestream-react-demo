import { createContext, useContext, type ReactNode } from "react";

export interface DeviceToggleState {
  isPending: boolean;
  isEnabled: boolean;
}

export const DeviceToggleStateContext = createContext<DeviceToggleState>({
  isPending: false,
  isEnabled: false,
});

export interface DeviceToggleStateProps {
  children: (state: DeviceToggleState) => ReactNode;
}

export function WithDeviceToggleState(props: DeviceToggleStateProps) {
  const state = useContext(DeviceToggleStateContext);
  return props.children(state);
}
