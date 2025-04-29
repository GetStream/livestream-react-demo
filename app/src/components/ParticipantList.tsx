import { useCallStateHooks } from "@stream-io/video-react-sdk";

export function ParticipantList() {
  const { useCallSession } = useCallStateHooks();
  const session = useCallSession();

  return JSON.stringify(session?.participants);
}
