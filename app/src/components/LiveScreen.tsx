import clsx from "clsx";
import { useState } from "react";
import { Backstage } from "./Backstage";
import { BgVideo } from "./BgVideo";
import { CallControls } from "./CallControls";
import { LiveDurationIndicator } from "./LiveDurationIndicator";
import { LiveInfoOverlay } from "./LiveInfoOverlay";
import LivePlayer from "./LivePlayer";
import styles from "./LiveScreen.module.css";
import screenStyles from "./Screen.module.css";
import toolbarStyles from "./Toolbar.module.css";
import { useBackstage } from "./useBackstage";
import { useBroadcastMethod } from "./useBroadcastMethod";
import { useSessionParticipantCount } from "./participants";
import { PingIndicator } from "./PingIndicator";
import { useViewerMode } from "./ViewerModeContext";

export function LiveScreen(props: { onCallLeft: () => void }) {
  const mode = useViewerMode();
  const [isInfoOverlayOpen, setIsInfoOverlayOpen] = useState(mode === "host");
  const { isLive, isLivePending, handleGoLive } = useBackstage();
  const method = useBroadcastMethod();
  const participantCount = useSessionParticipantCount().user;

  const handleAction = (action: string) => {
    if (action === "info") {
      setIsInfoOverlayOpen(true);
    }

    if (action === "call-left") {
      props.onCallLeft();
    }
  };

  return (
    <div className={clsx(screenStyles._, styles._)}>
      <div
        className={clsx(screenStyles.header, styles.header, toolbarStyles._)}
      >
        <div>
          <h3 className={styles.title}>
            {method === "rtmp" ? <>RTMP</> : <>WebRTC</>} livestream
          </h3>
          {isLive && participantCount > 0 && (
            <div className={styles.subtitle}>
              {participantCount} participants
            </div>
          )}
        </div>
        <i className={toolbarStyles.spacer} />
        {isLive && (
          <>
            <LiveDurationIndicator />
            <PingIndicator />
          </>
        )}
      </div>
      <div className={clsx(screenStyles.main, styles.main)}>
        {isLive ? (
          <div className={styles.player}>
            <LivePlayer />
            <BgVideo />
          </div>
        ) : (
          <div className={styles.backstage}>
            <Backstage isLivePending={isLivePending} onGoLive={handleGoLive} />
            <BgVideo />
          </div>
        )}
        {isInfoOverlayOpen && (
          <div className={styles.overlay}>
            <LiveInfoOverlay onClose={() => setIsInfoOverlayOpen(false)} />
          </div>
        )}
      </div>
      <div className={clsx(screenStyles.footer)}>
        <CallControls onAction={handleAction} />
      </div>
    </div>
  );
}
