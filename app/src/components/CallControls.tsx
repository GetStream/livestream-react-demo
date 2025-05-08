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
import { Icon, Spinner } from "./Icon";
import { useBroadcastMethod } from "./useBroadcastMethod";
import { MuteControl } from "./MuteControl";
import { useStore } from "@nanostores/react";
import { viewerModeStore } from "../stores/viewerMode";
import { ReactionControl } from "./ReactionControl";
import type { StreamChat } from "stream-chat";
import { lazy, Suspense } from "react";

const ChatControlLazy = lazy(() => import("./ChatControl"));

export function CallControls(props: {
  isInfoOverlayOpen: boolean;
  sidebarMode: string;
  onInfoPress: () => void;
  onCallLeftPress: () => void;
  onParticipantsPress: () => void;
  onChatPress: (client: StreamChat) => void;
}) {
  const { mode } = useStore(viewerModeStore);
  const method = useBroadcastMethod();

  return (
    <div className={clsx(styles._, glassStyles._, toolbarStyles._)}>
      {mode === "host" && (
        <Button
          className={clsx(buttonStyles._, buttonStyles._subtle)}
          onPress={() => props.onInfoPress()}
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
      {mode === "host" && (
        <EndCallControl onCallLeft={() => props.onCallLeftPress()} />
      )}
      <i className={toolbarStyles.spacer} />
      <Button
        className={clsx(buttonStyles._, buttonStyles._subtle)}
        onPress={() => props.onParticipantsPress()}
      >
        <Icon icon="people" />
      </Button>
      <Suspense fallback={<Spinner />}>
        <ChatControlLazy onPress={(client) => props.onChatPress(client)} />
      </Suspense>
    </div>
  );
}
