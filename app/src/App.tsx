import { useStore } from "@nanostores/react";
import { type Call, StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { createCall, useCallEnded, useGetCall } from "./call";
import { useClient } from "./client";
import { BroadcastMethodScreen } from "./components/BroadcastMethodScreen";
import { FinalScreen } from "./components/FinalScreen";
import { LiveScreen } from "./components/LiveScreen";
import { LoadingScreen } from "./components/LoadingScreen";
import { RecorderPlaceholderScreen } from "./components/RecorderPlaceholderScreen";
import { viewerModeStore } from "./stores/viewerMode";
import { ErrorScreen } from "./components/ErrorScreen";

function App() {
  const { mode, viewCallId } = useStore(viewerModeStore);
  const client = useClient(mode);
  const [hasEnded, setHasEnded] = useState(false);
  const [error, setError] = useState<string>();

  const handleCallEnded = () => {
    setHasEnded(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any)._call;
  };

  const handleCallError = (error: string) => {
    setError(error);
  };

  const [hostCall, setHostCall] = useState<Call>();
  const viewCall = useGetCall(client, viewCallId, handleCallError);
  const call = hostCall ?? viewCall;

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
      handleCallError("Could not create livestream");
    }
  };

  if (!client) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen>{error}</ErrorScreen>;
  }

  if (hasEnded) {
    return <FinalScreen call={call} />;
  }

  if (mode === "viewer" && !viewCall) {
    return <LoadingScreen />;
  }

  if (mode === "recorder" && !viewCall) {
    return <RecorderPlaceholderScreen />;
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
