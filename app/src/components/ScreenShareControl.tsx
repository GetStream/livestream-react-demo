import { CallingState, useCallStateHooks } from "@stream-io/video-react-sdk";
import {
  ScreenShareToggleButton,
  WithDeviceToggleState,
} from "@stream-io/video-react-ui";
import clsx from "clsx";
import buttonStyles from "./Button.module.css";
import { Icon, Spinner } from "./Icon";

export function ScreenShareControl() {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return null;
  }

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
