import { useContext, type ReactNode } from "react";
import {
  DeviceToggleStateContext,
  type DeviceToggleState,
} from "./DeviceToggleState";

export interface WithDeviceToggleStateProps {
  children: (state: DeviceToggleState) => ReactNode;
}

export function WithDeviceToggleState(props: WithDeviceToggleStateProps) {
  const state = useContext(DeviceToggleStateContext);
  return props.children(state);
}
