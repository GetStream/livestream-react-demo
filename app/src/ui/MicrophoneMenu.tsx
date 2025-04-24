import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { DeviceMenu, type DeviceMenuProps } from "./DeviceMenu";
import { microphoneDeviceKey } from "./devices";

export type MicrophoneMenuProps = Omit<
  DeviceMenuProps<typeof microphoneDeviceKey>,
  "deviceKey" | "deviceState"
>;

export function MicrophoneMenu(props: MicrophoneMenuProps) {
  const { useMicrophoneState } = useCallStateHooks();
  return (
    <DeviceMenu
      deviceKey={microphoneDeviceKey}
      deviceState={useMicrophoneState()}
      {...props}
    />
  );
}
