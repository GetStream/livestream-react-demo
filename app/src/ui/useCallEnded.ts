import { useEffect } from "react";
import { useEffectEvent } from "./useEffectEvent";
import { useCall } from "@stream-io/video-react-sdk";

export function useCallEnded(cb: (() => void) | undefined) {
  const call = useCall();
  const handleCallEnded = useEffectEvent(cb);

  useEffect(() => {
    if (call) {
      return call.on("call.ended", () => handleCallEnded());
    }
  }, [call, handleCallEnded]);
}
