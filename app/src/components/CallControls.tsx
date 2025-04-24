import clsx from "clsx";
import styles from "./CallControls.module.css";
import { CameraControl, MicrophoneControl } from "./DeviceControl";
import glassStyles from "./Glass.module.css";
import { RecordingControl } from "./RecordingControl";
import { ScreenShareControl } from "./ScreenShareControl";
import toolbarStyles from "./Toolbar.module.css";
import { EndCallControl } from "./EndCallControl";

export function CallControls() {
  return (
    <div className={clsx(styles._, glassStyles._, toolbarStyles._)}>
      <i className={toolbarStyles.spacer} />
      <RecordingControl />
      <MicrophoneControl />
      <CameraControl />
      <ScreenShareControl />
      <EndCallControl />
      <i className={toolbarStyles.spacer} />
    </div>
  );
}
