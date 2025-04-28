import { useStore } from "@nanostores/react";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { useCallEnded, useGetCall } from "./call";
import { useRecorderClient } from "./client";
import { LiveScreen } from "./components/LiveScreen";
import { RecorderPlaceholderScreen } from "./components/RecorderPlaceholderScreen";
import { recorderStore } from "./stores/recorderStore";

function RecorderApp() {
  const state = useStore(recorderStore);
  const client = useRecorderClient(state);
  let call = useGetCall(client, state.ready ? state.config.call_id : null);
  const [hasEnded, setHasEnded] = useState(false);

  if (hasEnded) {
    call = undefined;
  }

  useCallEnded(call, () => {
    setHasEnded(true);
  });

  if (!client || !call) {
    return <RecorderPlaceholderScreen />;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <LiveScreen />
      </StreamCall>
    </StreamVideo>
  );
}

export default RecorderApp;
