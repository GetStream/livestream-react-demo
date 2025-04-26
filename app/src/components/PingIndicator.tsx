import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { Indicator } from "./Indicator";

export function PingIndicator() {
  const { useCallStatsReport } = useCallStateHooks();
  const statsReport = useCallStatsReport();
  const ping = Math.max(
    statsReport?.publisherStats.averageRoundTripTimeInMs ?? 0,
    statsReport?.subscriberStats.averageRoundTripTimeInMs ?? 0
  );

  if (!ping) {
    return null;
  }

  return (
    <Indicator icon="bullet">
      {Math.round(ping)} <small>ms</small>
    </Indicator>
  );
}
