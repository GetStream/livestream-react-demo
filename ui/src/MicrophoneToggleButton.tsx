import { useCallStateHooks } from "@stream-io/video-react-sdk";
import type { ReactNode } from "react";
import {
  DeviceToggleButton,
  type DeviceToggleButtonProps,
} from "./DeviceToggleButton";
import { microphoneDeviceKey } from "./devices";

export type MicrophoneToggleButtonProps = Omit<
  DeviceToggleButtonProps<typeof microphoneDeviceKey>,
  "deviceKey" | "deviceState"
>;

export function MicrophoneToggleButton(
  props: MicrophoneToggleButtonProps
): ReactNode {
  const { useMicrophoneState } = useCallStateHooks();
  return (
    <DeviceToggleButton
      deviceKey={microphoneDeviceKey}
      deviceState={useMicrophoneState()}
      {...props}
    />
  );
}
