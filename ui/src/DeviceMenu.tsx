import { useDeviceList } from "@stream-io/video-react-sdk";
import type { ReactNode } from "react";
import { mergeProps } from "react-aria";
import {
  Menu,
  MenuItem,
  type MenuProps,
  type Selection,
} from "react-aria-components";
import type { DeviceKey, DeviceListItem, DeviceState } from "./devices";
import { useEffectEvent } from "./useEffectEvent";

export type DeviceMenuProps<K extends DeviceKey> = {
  deviceKey: K;
  deviceState: DeviceState<K>;
  onError?: (reason: unknown) => void;
} & Omit<MenuProps<DeviceListItem>, "items" | "children">;

export function DeviceMenu<K extends DeviceKey>(
  props: DeviceMenuProps<K>
): ReactNode {
  const { deviceKey, deviceState, onError, ...menuProps } = props;
  const mergedProps = mergeProps(menuProps, useDeviceMenu(props).props);
  return <Menu {...mergedProps} />;
}

function useDeviceMenu<K extends DeviceKey>(props: DeviceMenuProps<K>) {
  const manager = props.deviceState[props.deviceKey];
  const { deviceList: items, selectedDeviceInfo } = useDeviceList(
    props.deviceState.devices ?? [],
    props.deviceState.selectedDevice
  );
  const selectedKeys = [selectedDeviceInfo.deviceId];
  const children = (item: DeviceListItem) => (
    <MenuItem id={item.deviceId}>{item.label}</MenuItem>
  );

  const onSelectionChange = useEffectEvent(async (keys: Selection) => {
    try {
      const onlyKey = keys !== "all" ? keys.values().next().value : undefined;

      if (typeof onlyKey === "string") {
        await manager.select(onlyKey);
      }
    } catch (err) {
      props.onError?.(err);
    }
  });

  return {
    props: {
      items,
      children,
      selectionMode: "single",
      selectedKeys,
      onSelectionChange,
    } satisfies MenuProps<DeviceListItem>,
  };
}
