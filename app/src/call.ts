import {
  CallingState,
  type Call,
  type StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useEffectEvent } from "@stream-io/video-react-ui/utils";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const backstageSeconds = 3 * 60; // 3 minutes

export async function createCall(client: StreamVideoClient, method: string) {
  const user = client.state.connectedUser;

  if (!user) {
    throw new Error("Client is not initialized");
  }

  const callId = nanoid();
  const call = client.call("livestream", callId);

  await call.create({
    data: {
      members: [{ user_id: user.id, role: "host" }],
      custom: { broadcast_method: method },
      starts_at: getCallStartsAt(),
      settings_override: {
        backstage: {
          enabled: true,
          join_ahead_time_seconds: backstageSeconds,
        },
      },
    },
  });

  const callSetupPromises = [
    call.microphone.disableSpeakingWhileMutedNotification(),
  ];

  const defaultDeviceAction = method === "rtmp" ? "disable" : "enable";
  callSetupPromises.push(
    call.camera[defaultDeviceAction](),
    call.microphone[defaultDeviceAction]()
  );

  await Promise.all(callSetupPromises);

  if (method === "rtmp") {
    // With RTMP, we go live once host user starts publishing video.
    // We can only get this information by joining the call early.
    await call.join();
  }

  return call;
}

export async function goLive(call: Call) {
  if (call.state.callingState !== CallingState.JOINED) {
    await call.join();
  }

  await call.goLive();
}

export function useGetCall(
  client: StreamVideoClient | undefined,
  callId: string | null
) {
  const [call, setCall] = useState<Call | undefined>(undefined);

  useEffect(() => {
    if (client && callId) {
      let cancel = false;
      const call = client.call("livestream", callId);

      call
        .join()
        .then(() => {
          if (!cancel) {
            setCall(call);
          }
        })
        .catch((err) => {
          console.error("Could not get call", err);
        });

      return () => {
        cancel = true;
        call.leave().catch((err) => {
          console.error("Could not leave call", err);
        });
        setCall(undefined);
      };
    }
  }, [client, callId]);

  return call;
}

export function useCallEnded(call: Call | undefined, cb: () => void) {
  const handleCallEnded = useEffectEvent(cb);

  useEffect(() => {
    if (call) {
      const unsubscribe = call.on("call.ended", () => {
        handleCallEnded();
      });

      return unsubscribe;
    }
  }, [call, handleCallEnded]);
}

function getCallStartsAt() {
  // 3 minutes in the future
  return new Date(Date.now() + backstageSeconds * 1000).toISOString();
}
