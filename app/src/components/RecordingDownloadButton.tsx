import { useStore } from "@nanostores/react";
import type { Call, CallRecording } from "@stream-io/video-react-sdk";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Button, Link } from "react-aria-components";
import { recordingStateStore } from "../stores/recording";
import buttonStyles from "./Button.module.css";
import { Icon, Spinner } from "./Icon";
import iconStyles from "./Icon.module.css";

export function RecordingDownloadButton(props: { call: Call }) {
  const { call } = props;
  const recordingState = useStore(recordingStateStore);
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const isPending =
    recordingState !== "never-started" && recordings.length === 0;

  useEffect(() => {
    let cancel = false;

    call.queryRecordings(call.state.session?.id).then(({ recordings }) => {
      if (!cancel) {
        setRecordings(recordings);
      }
    });

    const unsubscribe = call.on("call.recording_ready", (event) => {
      setRecordings((recordings) => [...recordings, event.call_recording]);
    });

    return () => {
      cancel = true;
      unsubscribe();
      setRecordings([]);
    };
  }, [call]);

  const latestRecording =
    recordings.length > 0
      ? recordings.reduce((latest, r) =>
          r.start_time > latest.start_time ? r : latest
        )
      : null;

  if (isPending) {
    return (
      <Button
        className={clsx(
          buttonStyles._,
          buttonStyles._positive,
          iconStyles.withIcon
        )}
        isPending={true}
      >
        <Spinner size={12} />
        Processing recording
      </Button>
    );
  }

  if (!latestRecording) {
    return null;
  }

  return (
    <Link
      className={clsx(
        buttonStyles._,
        buttonStyles._positive,
        iconStyles.withIcon
      )}
      href={latestRecording.url}
    >
      <Icon icon="arrow_down" size={12} />
      Save recording
    </Link>
  );
}
