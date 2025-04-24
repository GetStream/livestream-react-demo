import { useCallStateHooks } from "@stream-io/video-react-sdk";
import {
  DeviceToggleButton,
  type DeviceToggleButtonProps,
} from "./DeviceToggleButton";
import { cameraDeviceKey } from "./devices";

export type CameraToggleButtonProps = Omit<
  DeviceToggleButtonProps<typeof cameraDeviceKey>,
  "deviceKey" | "deviceState"
>;

export function CameraToggleButton(props: CameraToggleButtonProps) {
  const { useCameraState } = useCallStateHooks();
  return (
    <DeviceToggleButton
      deviceKey={cameraDeviceKey}
      deviceState={useCameraState()}
      {...props}
    />
  );
}
