import { useStore } from "@nanostores/react";
import clsx from "clsx";
import { useState, type PropsWithChildren } from "react";
import { viewerModeStore } from "../stores/viewerMode";
import { Backstage } from "./Backstage";
import { BgVideo } from "./BgVideo";
import { CallControls } from "./CallControls";
import glassStyles from "./Glass.module.css";
import { LiveDurationIndicator } from "./LiveDurationIndicator";
import { LiveInfoOverlay } from "./LiveInfoOverlay";
import LivePlayer from "./LivePlayer";
import styles from "./LiveScreen.module.css";
import { ParticipantSidebar } from "./ParticipantSidebar";
import { useSessionParticipantCount } from "./participants";
import { PingIndicator } from "./PingIndicator";
import { ReactionsOverlay } from "./ReactionsOverlay";
import screenStyles from "./Screen.module.css";
import toolbarStyles from "./Toolbar.module.css";
import { useBackstage } from "./useBackstage";
import { useBroadcastMethod } from "./useBroadcastMethod";

export function LiveScreen(props: { onCallLeft?: () => void }) {
  const { mode } = useStore(viewerModeStore);
  const [isInfoOverlayOpen, setIsInfoOverlayOpen] = useState(mode === "host");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLive, isLivePending, handleGoLive } = useBackstage();
  const method = useBroadcastMethod();
  const participantCount = useSessionParticipantCount().user;

  const handleAction = (action: string) => {
    switch (action) {
      case "info":
        setIsInfoOverlayOpen(true);
        break;

      case "call-left":
        props.onCallLeft?.();
        break;

      case "participants":
        setIsSidebarOpen(true);
        break;
    }
  };

  return (
    <div
      className={clsx(
        screenStyles._,
        styles._,
        mode === "recorder" && styles._recorder
      )}
    >
      {mode !== "recorder" && (
        <div
          className={clsx(screenStyles.header, styles.header, toolbarStyles._)}
        >
          <div>
            <h3 className={styles.title}>
              {method === "rtmp" ? <>RTMP</> : <>WebRTC</>} livestream
            </h3>
            {isLive && participantCount > 0 && (
              <div className={styles.subtitle}>{participantCount} viewers</div>
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
      )}
      <div className={clsx(screenStyles.main, styles.main)}>
        <div className={styles.workarea}>
          {isLive ? (
            <div className={styles.player}>
              <LivePlayer />
              <BgVideo />
            </div>
          ) : (
            <div className={styles.backstage}>
              <Backstage
                isLivePending={isLivePending}
                onGoLive={handleGoLive}
              />
              <BgVideo />
            </div>
          )}
          {isInfoOverlayOpen && (
            <div className={styles.overlay}>
              <LiveInfoOverlay onClose={() => setIsInfoOverlayOpen(false)} />
            </div>
          )}
          <ReactionsOverlay />
        </div>
        <Sidebar isOpen={isSidebarOpen}>
          <ParticipantSidebar onClose={() => setIsSidebarOpen(false)} />
        </Sidebar>
      </div>
      {mode !== "recorder" && (
        <div className={clsx(screenStyles.footer)}>
          <CallControls onAction={handleAction} />
        </div>
      )}
      {mode === "recorder" && <span id="egress-ready-for-capture" />}
    </div>
  );
}

function Sidebar(props: PropsWithChildren<{ isOpen: boolean }>) {
  const [state, setState] = useState<"closed" | "open" | "closing">("closed");

  if (props.isOpen && state !== "open") {
    setState("open");
  } else if (!props.isOpen && state === "open") {
    setState("closing");
  } else if (state === "closed") {
    return null;
  }

  return (
    <div
      className={clsx(
        styles.sidebar,
        styles[`sidebar_${state}`],
        glassStyles._
      )}
      onAnimationEnd={(event) => {
        if (event.animationName === styles.sidebarClose) {
          setState("closed");
        }
      }}
    >
      {props.children}
    </div>
  );
}
