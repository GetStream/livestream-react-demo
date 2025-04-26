import { type Call, StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { BroadcastMethodScreen } from "./components/BroadcastMethodScreen";
import { LiveScreen } from "./components/LiveScreen";
import { useClient } from "./client";
import { createCall, useCallEnded, useGetCall } from "./call";
import { LoadingScreen } from "./components/LoadingScreen";

const params = new URLSearchParams(location.search);
const viewCallId = params.get("view");

function App() {
  const client = useClient();
  const [hostCall, setHostCall] = useState<Call | undefined>(undefined);
  const viewCall = useGetCall(client, viewCallId);
  const [hasEnded, setHasEnded] = useState(false);

  useCallEnded(hostCall, () => {
    setHostCall(undefined);
    setHasEnded(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any)._call;
  });

  const handleCreateCall = async (method: string) => {
    if (!client) {
      console.warn("Client is not initialized");
      return;
    }

    try {
      const call = await createCall(client, method);
      setHostCall(call);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any)._call = call;
    } catch (err) {
      console.error("Could not create call", err);
    }
  };

  if (!client) {
    return <LoadingScreen />;
  }

  if (viewCallId && !viewCall) {
    return <LoadingScreen />;
  }

  if (!viewCallId && !hostCall) {
    return <BroadcastMethodScreen onSelect={handleCreateCall} />;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={hostCall ?? viewCall}>
        <LiveScreen />
      </StreamCall>
    </StreamVideo>
  );
}

export default App;
