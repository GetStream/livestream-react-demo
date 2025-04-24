import { Button } from "react-aria-components";
import styles from "./LiveCountdown.module.css";
import buttonStyles from "./Button.module.css";
import clsx from "clsx";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const startsAt = Date.now() + 3600_000;

export function LiveCountdown() {
  const { useCallStartsAt } = useCallStateHooks();
  // const startsAt = useCallStartsAt();
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(() =>
    getSecondsLeft(startsAt)
  );

  useEffect(() => {
    const handle = setInterval(() => {
      setTotalSecondsLeft(getSecondsLeft(startsAt));
    }, 100);
    return () => clearInterval(handle);
  }, [startsAt]);

  const minutesLeft = Math.floor(totalSecondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const secondsLeft = (totalSecondsLeft % 60).toString().padStart(2, "0");

  return (
    <div className={styles._}>
      {Number.isFinite(totalSecondsLeft) && (
        <>
          <div>Livestream will start in:</div>
          <div className={styles.counter}>
            {minutesLeft}:{secondsLeft}
          </div>
        </>
      )}
      <Button
        className={clsx(buttonStyles._, buttonStyles._primary, styles.cta)}
      >
        Go live now
      </Button>
      <div className={styles.participants}>
        3 participants have joined early
      </div>
    </div>
  );
}

function getSecondsLeft(startsAt: Date | undefined) {
  if (typeof startsAt === "number") {
    return Math.ceil((startsAt - Date.now()) / 1000);
  }

  return Number.NaN;
}
