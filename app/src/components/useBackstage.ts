import { useStore } from "@nanostores/react";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { goLive } from "../call";
import { viewerModeStore } from "../stores/viewerMode";

export function useBackstage() {
  const call = useCall();
  const { mode } = useStore(viewerModeStore);
  const { useIsCallLive } = useCallStateHooks();
  const isLive = useIsCallLive();
  const [isLivePending, setIsLivePending] = useState(false);

  const handleGoLive = async () => {
    if (mode !== "host") {
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
