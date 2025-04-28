import {
  ParticipantView,
  type StreamVideoParticipant,
} from "@stream-io/video-react-sdk";
import styles from "./LivePlayer.module.css";
import { SpeakingIndicator } from "./SpeakingIndicator";
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
        <PlaceholderOverlay />
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
          {hasNoTracks && <> is offline</>}
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

function PlaceholderOverlay() {
  return (
    <div className={styles.overlay_placeholder}>
      <div className={styles.nametag}>Livestream is offline</div>
    </div>
  );
}
