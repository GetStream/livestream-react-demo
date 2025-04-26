import { LiveCountdown } from "./LiveCountdown";
import { useBroadcastMethod } from "./useBroadcastMethod";
import { VideoAwaiter } from "./VideoAwaiter";

export function Backstage(props: {
  isLivePending: boolean;
  onGoLive: () => void;
}) {
  const method = useBroadcastMethod();
  const BackstageComponent = method === "rtmp" ? VideoAwaiter : LiveCountdown;
  return <BackstageComponent {...props} />;
}
