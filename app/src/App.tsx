import { type Call, StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import { useMemo, useState } from "react";
import { BroadcastMethodScreen } from "./components/BroadcastMethodScreen";
import { LiveScreen } from "./components/LiveScreen";
import { useClient } from "./client";
import { createCall, useCallEnded, useGetCall } from "./call";
import { LoadingScreen } from "./components/LoadingScreen";
import { ViewerModeContext } from "./components/ViewerModeContext";
import { FinalScreen } from "./components/FinalScreen";

const params = new URLSearchParams(location.search);
const viewCallId = params.get("view");
const mode = viewCallId ? ("viewer" as const) : ("host" as const);

function App() {
  const client = useClient(mode);
  const viewerModeContextValue = useMemo(() => ({ mode }), []);
  const [hostCall, setHostCall] = useState<Call | undefined>(undefined);
  let viewCall = useGetCall(client, viewCallId);
  const [hasEnded, setHasEnded] = useState(false);

  if (hasEnded) {
    viewCall = undefined;
  }

  const handleCallEnded = () => {
    setHostCall(undefined);
    setHasEnded(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any)._call;
  };

  useCallEnded(hostCall ?? viewCall, handleCallEnded);

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
    return <FinalScreen />;
  }

  if (mode === "viewer" && !viewCall) {
    return <LoadingScreen />;
  }

  if (mode === "host" && !hostCall) {
    return <BroadcastMethodScreen onSelect={handleCreateCall} />;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={hostCall ?? viewCall}>
        <ViewerModeContext.Provider value={viewerModeContextValue}>
          <LiveScreen onCallLeft={handleCallEnded} />
        </ViewerModeContext.Provider>
      </StreamCall>
    </StreamVideo>
  );
}

export default App;
