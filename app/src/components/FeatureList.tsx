import styles from "./FeatureList.module.css";
import { Icon } from "./Icon";

export function FeatureList() {
  return (
    <div className={styles._}>
      <div className={styles.feature}>
        <div className={styles.icon}>
          <Icon icon="timezone" />
        </div>
        <h4 className={styles.header}>Ultra low-latency streaming</h4>
        <p className={styles.description}>
          Stream’s global edge network provides best-in-class live streaming
          with the slowest delays between you and your audience.
        </p>
      </div>
      <div className={styles.feature}>
        <div className={styles.icon}>
          <Icon icon="inifnity" />
        </div>
        <h4 className={styles.header}>Broadcast anywhere</h4>
        <p className={styles.description}>
          Multi-platform streaming with any app using RTMP URLs and keys.
          Broadcast everywhere.
        </p>
      </div>
      <div className={styles.feature}>
        <div className={styles.icon}>
          <Icon icon="recording" />
        </div>
        <h4 className={styles.header}>Recording & transcription</h4>
        <p className={styles.description}>
          Capture every moment with built-in recording and accurate
          transcription.
        </p>
      </div>
      <div className={styles.feature}>
        <div className={styles.icon}>
          <Icon icon="spaceship" />
        </div>
        <h4 className={styles.header}>Adaptive streaming</h4>
        <p className={styles.description}>
          Built-in redundancy to always display the highest quality to
          participants.
        </p>
      </div>
    </div>
  );
}
