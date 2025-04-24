import { mergeProps } from "react-aria";
import { ToggleButton, type ToggleButtonProps } from "react-aria-components";
import type { DeviceKey, DeviceState } from "./devices";
import {
  DeviceToggleStateContext,
  type DeviceToggleState,
} from "./DeviceToggleState";
import { useEffectEvent } from "./useEffectEvent";

export type DeviceToggleButtonProps<K extends DeviceKey> = {
  deviceKey: K;
  deviceState: DeviceState<K>;
  onError?: (reason: unknown) => void;
} & Omit<ToggleButtonProps, "isSelected">;

export function DeviceToggleButton<K extends DeviceKey>(
  props: DeviceToggleButtonProps<K>
) {
  const { deviceKey, deviceState, onError, ...toggleButtonProps } = props;
  const { props: providedProps, state } = useDeviceToggleButton(props);
  const mergedProps = mergeProps(toggleButtonProps, providedProps);
  return (
    <DeviceToggleStateContext.Provider value={state}>
      <ToggleButton {...mergedProps} />
    </DeviceToggleStateContext.Provider>
  );
}

function useDeviceToggleButton<K extends DeviceKey>(
  props: DeviceToggleButtonProps<K>
) {
  const manager = props.deviceState[props.deviceKey];
  const isEnabled = props.deviceState.optimisticStatus === "enabled";
  const isPending = props.deviceState.isTogglePending;

  const onPress = useEffectEvent(async () => {
    try {
      await manager.toggle();
    } catch (err) {
      props.onError?.(err);
    }
  });

  return {
    props: {
      isSelected: isEnabled,
      onPress,
    } satisfies ToggleButtonProps,
    state: {
      isEnabled,
      isPending,
    } satisfies DeviceToggleState,
  };
}
