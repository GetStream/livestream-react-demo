import {
  ParticipantView,
  useCall,
  type StreamVideoParticipant,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import styles from "./LivePlayer.module.css";
import { SpeakingIndicator } from "./SpeakingIndicator";
import { getSecondsUntil } from "./clock";
import { useHostParticipant, type ParticipantTrackFlags } from "./participants";

export default function LivePlayer() {
  const host = useHostParticipant();

  return (
    <div className={styles._}>
      {host ? (
        <>
          <div className={styles.video}>
            <ParticipantView
              participant={host}
              trackType={
                host.hasScreenShare ? "screenShareTrack" : "videoTrack"
              }
              ParticipantViewUI={null}
              VideoPlaceholder={null}
            />
          </div>
          <Overlay participant={host} />
        </>
      ) : (
        <Placeholder />
      )}
    </div>
  );
}

function Overlay(props: {
  participant: StreamVideoParticipant & ParticipantTrackFlags;
}) {
  const hasNoTracks =
    !props.participant.hasVideo &&
    !props.participant.hasAudio &&
    !props.participant.hasScreenShare;

  return (
    <div className={styles.overlay}>
      <div className={styles.nametag}>
        <span>
          {props.participant.name}
          {props.participant.isSpeaking && <> is speaking</>}
          {hasNoTracks && <> is muted</>}
        </span>
        {props.participant.isSpeaking && (
          <div className={styles.speakingIndicator}>
            <SpeakingIndicator />
          </div>
        )}
      </div>
      {props.participant.hasScreenShare && props.participant.hasVideo && (
        <div className={styles.overlayVideo}>
          <ParticipantView
            participant={props.participant}
            trackType={"videoTrack"}
            ParticipantViewUI={null}
            VideoPlaceholder={null}
          />
        </div>
      )}
    </div>
  );
}

function Placeholder() {
  // const call = useCall();
  // const timeoutSeconds = 10;
  // const [secondsLeft, setSecondsLeft] = useState(timeoutSeconds);

  // useEffect(() => {
  //   const leaveAt = new Date(Date.now() + timeoutSeconds * 1000);
  //   const handle = setInterval(() => {
  //     const secondsLeft = getSecondsUntil(leaveAt);
  //     setSecondsLeft(secondsLeft);

  //     if (secondsLeft === 0) {
  //       clearInterval(handle);
  //       call?.leave();
  //     }
  //   });

  //   return () => clearInterval(handle);
  // }, [call]);

  return (
    <div className={styles.placeholder}>
      <div>Host is offline</div>
      {/* <div>Leaving livestream in {secondsLeft} seconds</div> */}
    </div>
  );
}
