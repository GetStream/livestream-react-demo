import clsx from "clsx";
import styles from "./BroadcastMethodPicker.module.css";
import glassStyles from "./Glass.module.css";
import badgeStyles from "./Badge.module.css";
import { Button } from "react-aria-components";

export function BroadcastMethodPicker(props: {
  onSelect: (method: string) => void;
}) {
  return (
    <div className={styles._}>
      <Button
        className={clsx(styles.method, glassStyles._, glassStyles._interactive)}
        onPress={() => props.onSelect("webrtc")}
      >
        <span className={clsx(badgeStyles._, badgeStyles._green)}>
          Ultra-Low Latency + Easy Setup
        </span>
        <h4 className={styles.header}>WebRTC</h4>
        <p className={styles.description}>
          Select this option if you want ultra-low latency browser-based
          streaming between peers, with no transcoding or additional software
          needed.
        </p>
      </Button>
      <Button
        className={clsx(styles.method, glassStyles._, glassStyles._interactive)}
        onPress={() => props.onSelect("rtmp")}
      >
        <span className={clsx(badgeStyles._, badgeStyles._yellow)}>
          Slower + More Setup
        </span>
        <h4 className={styles.header}>RTMP</h4>
        <p className={styles.description}>
          Select this option if you want to use dedicated software (like OBS)
          with the highest quality video (small delay for buffering).
        </p>
      </Button>
    </div>
  );
}
