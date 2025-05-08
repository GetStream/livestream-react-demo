import type {
  InputDeviceStatus,
  useDeviceList,
} from "@stream-io/video-react-sdk";

export type DeviceKey = "microphone" | "camera" | "screenShare";

export const microphoneDeviceKey: "microphone" =
  "microphone" satisfies DeviceKey;
export const cameraDeviceKey: "camera" = "camera" satisfies DeviceKey;
export const screenShareDeviceKey: "screenShare" =
  "screenShare" satisfies DeviceKey;

export type DeviceState<K extends DeviceKey> = {
  [ManagerKey in K]: DeviceManagerLike;
} & {
  devices?: MediaDeviceInfo[];
  selectedDevice?: string | undefined;
  optimisticStatus: InputDeviceStatus;
  isTogglePending: boolean;
};

export interface DeviceManagerLike {
  select: (deviceId: string) => Promise<void>;
  toggle: () => Promise<void>;
}

export type DeviceListItem = ReturnType<
  typeof useDeviceList
>["deviceList"][number];
