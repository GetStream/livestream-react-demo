import { useCallStateHooks } from "@stream-io/video-react-sdk";

export function useBroadcastMethod() {
  const { useCallCustomData } = useCallStateHooks();
  const custom = useCallCustomData();
  return (custom.broadcast_method as string) ?? "webrtc";
}
