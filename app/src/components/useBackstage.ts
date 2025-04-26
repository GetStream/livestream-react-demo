import { useCall, useCallStateHooks, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { goLive } from "../call";
import { useState } from "react";

export function useBackstage() {
  const client = useStreamVideoClient();
  const call = useCall();
  const { useIsCallLive } = useCallStateHooks();
  const isLive = useIsCallLive();
  const [isLivePending, setIsLivePending] = useState(false);

  const handleGoLive = async () => {
    if (!call) {
      console.error("Call is not initialized");
      return;
    }

    if (!call.state.localParticipant?.roles.includes('host')) {
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
    handleGoLive: ,
  };
}
