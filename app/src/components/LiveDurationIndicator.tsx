import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Indicator } from "./Indicator";
import { getSecondsSince, secondsToClock } from "./clock";

export function LiveDurationIndicator() {
  const { useCallStartedAt } = useCallStateHooks();
  const startedAt = useCallStartedAt();
  const [elapsedSeconds, setElapsedSeconds] = useState(() =>
    getSecondsSince(startedAt)
  );

  useEffect(() => {
    const handle = setInterval(() => {
      const elapsedSeconds = getSecondsSince(startedAt);
      setElapsedSeconds(elapsedSeconds);
    }, 100);

    return () => clearInterval(handle);
  }, [startedAt]);

  const [min, sec] = secondsToClock(elapsedSeconds);

  return (
    <Indicator icon="verified">
      <small>{min}</small>:{sec}
    </Indicator>
  );
}
