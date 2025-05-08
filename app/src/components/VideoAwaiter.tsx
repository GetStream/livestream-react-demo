import { useStore } from "@nanostores/react";
import { useEffectEvent } from "@stream-io/video-react-ui/utils";
import clsx from "clsx";
import { useEffect } from "react";
import { viewerModeStore } from "../stores/viewerMode";
import { Spinner } from "./Icon";
import { useHostParticipant, useSessionParticipantCount } from "./participants";
import styles from "./VideoAwaiter.module.css";

export function VideoAwaiter(props: {
  isLivePending: boolean;
  onGoLive: () => void;
}) {
  const { mode } = useStore(viewerModeStore);
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
      {mode === "host" ? (
        <>
          <div>Waiting on external software</div>
          <Spinner size={80} />
        </>
      ) : (
        <div>Livestream will start soon</div>
      )}
      <div
        className={clsx(
          styles.participants,
          participantCount === 0 && styles.participants_empty
        )}
      >
        {participantCount} viewers have joined early
      </div>
    </div>
  );
}
