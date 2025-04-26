import clsx from "clsx";
import styles from "./CallControls.module.css";
import { CameraControl, MicrophoneControl } from "./DeviceControl";
import glassStyles from "./Glass.module.css";
import { RecordingControl } from "./RecordingControl";
import { ScreenShareControl } from "./ScreenShareControl";
import toolbarStyles from "./Toolbar.module.css";
import { EndCallControl } from "./EndCallControl";
import { Button } from "react-aria-components";
import buttonStyles from "./Button.module.css";
import { Icon } from "./Icon";
import { useBroadcastMethod } from "./useBroadcastMethod";

export function CallControls(props: { onAction?: (action: string) => void }) {
  const method = useBroadcastMethod();

  return (
    <div className={clsx(styles._, glassStyles._, toolbarStyles._)}>
      <Button
        className={clsx(buttonStyles._, buttonStyles._subtle)}
        onPress={() => props.onAction?.("info")}
      >
        <Icon icon="info" />
      </Button>
      <i className={toolbarStyles.spacer} />
      <RecordingControl />
      {method !== "rtmp" && (
        <>
          <MicrophoneControl />
          <CameraControl />
          <ScreenShareControl />
        </>
      )}
      <EndCallControl />
      <i className={toolbarStyles.spacer} />
    </div>
  );
}
