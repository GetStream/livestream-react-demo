import clsx from "clsx";
import { useEffect } from "react";
import { useEffectEvent } from "../ui/useEffectEvent";
import { Spinner } from "./Icon";
import { useHostParticipant, useSessionParticipantCount } from "./participants";
import styles from "./VideoAwaiter.module.css";
import { useViewerMode } from "./ViewerModeContext";

export function VideoAwaiter(props: {
  isLivePending: boolean;
  onGoLive: () => void;
}) {
  const mode = useViewerMode();
  const host = useHostParticipant();
  const handleGoLive = useEffectEvent(props.onGoLive);
  const participantCount = useSessionParticipantCount().user;

  useEffect(() => {
    if (host?.hasVideo) {
      handleGoLive();
    }
  }, [host, handleGoLive]);

  return (
    <div className={styles._}>
      {mode === "host" && (
        <>
          <div>Waiting on external software</div>
          <Spinner size={80} />
        </>
      )}
      {mode === "viewer" && (
        <>
          <div>Livestream will start soon</div>
        </>
      )}
      <div
        className={clsx(
          styles.participants,
          participantCount === 0 && styles.participants_empty
        )}
      >
        {participantCount} participants have joined early
      </div>
    </div>
  );
}
