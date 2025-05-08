import { useCallStateHooks } from "@stream-io/video-react-sdk";
import type { ReactNode } from "react";
import {
  DeviceToggleButton,
  type DeviceToggleButtonProps,
} from "./DeviceToggleButton";
import { cameraDeviceKey } from "./devices";

export type CameraToggleButtonProps = Omit<
  DeviceToggleButtonProps<typeof cameraDeviceKey>,
  "deviceKey" | "deviceState"
>;

export function CameraToggleButton(props: CameraToggleButtonProps): ReactNode {
  const { useCameraState } = useCallStateHooks();
  return (
    <DeviceToggleButton
      deviceKey={cameraDeviceKey}
      deviceState={useCameraState()}
      {...props}
    />
  );
}
