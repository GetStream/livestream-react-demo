import { useCallStateHooks } from "@stream-io/video-react-sdk";
import {
  DeviceToggleButton,
  type DeviceToggleButtonProps,
} from "./DeviceToggleButton";
import { microphoneDeviceKey, screenShareDeviceKey } from "./devices";

export type ScreenShareToggleButtonProps = Omit<
  DeviceToggleButtonProps<typeof microphoneDeviceKey>,
  "deviceKey" | "deviceState"
>;

export function ScreenShareToggleButton(props: ScreenShareToggleButtonProps) {
  const { useScreenShareState } = useCallStateHooks();
  return (
    <DeviceToggleButton
      deviceKey={screenShareDeviceKey}
      deviceState={useScreenShareState()}
      {...props}
    />
  );
}
