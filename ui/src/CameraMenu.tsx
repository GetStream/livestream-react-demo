import { useCallStateHooks } from "@stream-io/video-react-sdk";
import type { ReactNode } from "react";
import { DeviceMenu, type DeviceMenuProps } from "./DeviceMenu";
import { cameraDeviceKey } from "./devices";

export type CameraMenuProps = Omit<
  DeviceMenuProps<typeof cameraDeviceKey>,
  "deviceKey" | "deviceState"
>;

export function CameraMenu(props: CameraMenuProps): ReactNode {
  const { useCameraState } = useCallStateHooks();
  return (
    <DeviceMenu
      deviceKey={cameraDeviceKey}
      deviceState={useCameraState()}
      {...props}
    />
  );
}
