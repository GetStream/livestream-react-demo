import clsx from "clsx";
import { WithDeviceToggleState } from "../ui/DeviceToggleState";
import { ScreenShareToggleButton } from "../ui/ScreenShareToggleButton";
import buttonStyles from "./Button.module.css";
import { Icon, Spinner } from "./Icon";

export function ScreenShareControl() {
  return (
    <ScreenShareToggleButton
      className={(values) =>
        clsx(
          buttonStyles._,
          buttonStyles._subtle,
          values.isSelected && buttonStyles._blue
        )
      }
    >
      <WithDeviceToggleState>
        {({ isPending }) => (isPending ? <Spinner /> : <Icon icon="present" />)}
      </WithDeviceToggleState>
    </ScreenShareToggleButton>
  );
}
