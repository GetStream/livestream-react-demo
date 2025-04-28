import { type Call, StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { BroadcastMethodScreen } from "./components/BroadcastMethodScreen";
import { LiveScreen } from "./components/LiveScreen";
import { useClient } from "./client";
import { createCall, useCallEnded, useGetCall } from "./call";
import { LoadingScreen } from "./components/LoadingScreen";
import { FinalScreen } from "./components/FinalScreen";
import { useStore } from "@nanostores/react";
import { viewerModeStore } from "./stores/viewerMode";

function App() {
  const { mode, viewCallId } = useStore(viewerModeStore);
  const client = useClient(mode);
  const [hostCall, setHostCall] = useState<Call | undefined>(undefined);
  const viewCall = useGetCall(client, viewCallId);
  const call = hostCall ?? viewCall;
  const [hasEnded, setHasEnded] = useState(false);

  const handleCallEnded = () => {
    setHasEnded(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any)._call;
  };

  useCallEnded(call, handleCallEnded);

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

  if (hasEnded) {
    return <FinalScreen call={call} />;
  }

  if (mode === "viewer" && !viewCall) {
    return <LoadingScreen />;
  }

  if (mode === "host" && !hostCall) {
    return <BroadcastMethodScreen onSelect={handleCreateCall} />;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <LiveScreen onCallLeft={handleCallEnded} />
      </StreamCall>
    </StreamVideo>
  );
}

export default App;
