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
import { MuteControl } from "./MuteControl";
import { useStore } from "@nanostores/react";
import { viewerModeStore } from "../stores/viewerMode";
import { ReactionControl } from "./ReactionControl";

export function CallControls(props: { onAction?: (action: string) => void }) {
  const { mode } = useStore(viewerModeStore);
  const method = useBroadcastMethod();

  return (
    <div className={clsx(styles._, glassStyles._, toolbarStyles._)}>
      {mode === "host" && (
        <Button
          className={clsx(buttonStyles._, buttonStyles._subtle)}
          onPress={() => props.onAction?.("info")}
        >
          <Icon icon="info" />
        </Button>
      )}
      {mode === "viewer" && <MuteControl />}
      <i className={toolbarStyles.spacer} />
      {mode === "viewer" && <ReactionControl />}
      {mode === "host" && <RecordingControl />}
      {method !== "rtmp" && mode === "host" && (
        <>
          <MicrophoneControl />
          <CameraControl />
          <ScreenShareControl />
        </>
      )}
      <EndCallControl onCallLeft={() => props.onAction?.("call-left")} />
      <i className={toolbarStyles.spacer} />
    </div>
  );
}
