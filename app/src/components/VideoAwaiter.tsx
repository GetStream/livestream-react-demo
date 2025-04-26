import clsx from "clsx";
import { useEffect } from "react";
import { useEffectEvent } from "../ui/useEffectEvent";
import { Spinner } from "./Icon";
import { useHostParticipant, useSessionParticipantCount } from "./participants";
import styles from "./VideoAwaiter.module.css";

export function VideoAwaiter(props: {
  isLivePending: boolean;
  onGoLive: () => void;
}) {
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
      <div>Waiting on external software</div>
      <Spinner size={80} />
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
