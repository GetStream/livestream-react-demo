import {
  hasAudio,
  hasScreenShare,
  hasVideo,
  publishingVideo,
  useCallStateHooks,
  type StreamVideoParticipant,
} from "@stream-io/video-react-sdk";

export interface ParticipantTrackFlags {
  hasVideo: boolean;
  hasAudio: boolean;
  hasScreenShare: boolean;
}

export function useHostParticipant():
  | (StreamVideoParticipant & ParticipantTrackFlags)
  | null {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants({ sortBy: publishingVideo });
  const host = participants.find((p) => p.roles.includes("host"));

  if (!host) {
    return null;
  }

  return {
    ...host,
    hasVideo: hasVideo(host),
    hasAudio: hasAudio(host),
    hasScreenShare: hasScreenShare(host),
  };
}

export function useSessionParticipantCount() {
  const { useCallSession } = useCallStateHooks();
  const session = useCallSession();
  return { host: 0, user: 0, ...session?.participants_count_by_role };
}
