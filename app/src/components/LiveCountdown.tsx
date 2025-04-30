import { useStore } from "@nanostores/react";
import { useCallStateHooks, VideoPreview } from "@stream-io/video-react-sdk";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { Button } from "react-aria-components";
import { viewerModeStore } from "../stores/viewerMode";
import { useEffectEvent } from "../ui/useEffectEvent";
import buttonStyles from "./Button.module.css";
import { getSecondsUntil, secondsToClock } from "./clock";
import { Spinner } from "./Icon";
import styles from "./LiveCountdown.module.css";
import { useSessionParticipantCount } from "./participants";

export function LiveCountdown(props: {
  isLivePending: boolean;
  onGoLive: () => void;
}) {
  const { mode } = useStore(viewerModeStore);
  const { useCallStartsAt, useCameraState } = useCallStateHooks();
  const startsAt = useCallStartsAt();
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(() =>
    getSecondsUntil(startsAt)
  );
  const participantCount = useSessionParticipantCount().user;
  const { isEnabled: isPreviewEnabled, mediaStream: previewStream } =
    useCameraState();
  const PreviewSpinner = useCallback(() => <Spinner size={40} />, []);

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
      {mode === "host" && (
        <Button
          className={clsx(buttonStyles._, buttonStyles._primary, styles.cta)}
          isPending={props.isLivePending}
          onPress={props.onGoLive}
        >
          {props.isLivePending ? <Spinner /> : <>Go live now</>}
        </Button>
      )}
      <div
        className={clsx(
          styles.participants,
          participantCount === 0 && styles.participants_empty
        )}
      >
        {participantCount} viewers have joined early
      </div>
      {isPreviewEnabled && (
        <div className={styles.preview}>
          <VideoPreview StartingCameraPreview={PreviewSpinner} />
          {previewStream && (
            <span className={styles.previewLabel}>Camera preview</span>
          )}
        </div>
      )}
    </div>
  );
}
