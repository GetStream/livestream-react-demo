import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { type ReactNode } from "react";

interface RecordingState {
  isRecording: boolean;
}

export interface WithRecordingStateProps {
  children: (state: RecordingState) => ReactNode;
}

export function WithRecordingState(props: WithRecordingStateProps) {
  const { useIsCallRecordingInProgress } = useCallStateHooks();
  const isRecording = useIsCallRecordingInProgress();
  return props.children({ isRecording });
}
