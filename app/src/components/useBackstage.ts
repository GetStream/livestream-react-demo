import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { goLive } from "../call";
import { useState } from "react";
import { useViewerMode } from "./ViewerModeContext";

export function useBackstage() {
  const call = useCall();
  const mode = useViewerMode();
  const { useIsCallLive } = useCallStateHooks();
  const isLive = useIsCallLive();
  const [isLivePending, setIsLivePending] = useState(false);

  const handleGoLive = async () => {
    if (mode === "viewer") {
      return;
    }

    if (!call) {
      console.error("Call is not initialized");
      return;
    }

    try {
      setIsLivePending(true);
      await goLive(call);
    } catch (err) {
      console.error("Could not go live", err);
    } finally {
      setIsLivePending(false);
    }
  };

  return {
    isLive,
    isLivePending,
    handleGoLive,
  };
}
