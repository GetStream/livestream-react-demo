import { Button } from "react-aria-components";
import styles from "./LiveCountdown.module.css";
import buttonStyles from "./Button.module.css";
import clsx from "clsx";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { getSecondsUntil, secondsToClock } from "./clock";
import { useEffectEvent } from "../ui/useEffectEvent";
import { Spinner } from "./Icon";
import { useSessionParticipantCount } from "./participants";

export function LiveCountdown(props: {
  isLivePending: boolean;
  onGoLive: () => void;
}) {
  const { useCallStartsAt } = useCallStateHooks();
  const startsAt = useCallStartsAt();
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(() =>
    getSecondsUntil(startsAt)
  );
  const participantCount = useSessionParticipantCount().user;

  const handleGoLive = useEffectEvent(props.onGoLive);

  useEffect(() => {
    const handle = setInterval(() => {
      const totalSecondsLeft = getSecondsUntil(startsAt);
      setTotalSecondsLeft(totalSecondsLeft);

      if (totalSecondsLeft === 0) {
        clearInterval(handle);
        handleGoLive();
      }
    }, 100);

    return () => clearInterval(handle);
  }, [handleGoLive, startsAt]);

  const [min, sec] = secondsToClock(totalSecondsLeft);

  return (
    <div className={styles._}>
      <div>Livestream will start in:</div>
      <div className={styles.counter}>
        {min}:{sec}
      </div>
      <Button
        className={clsx(buttonStyles._, buttonStyles._primary, styles.cta)}
        isPending={props.isLivePending}
        onPress={props.onGoLive}
      >
        {props.isLivePending ? <Spinner /> : <>Go live now</>}
      </Button>
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
