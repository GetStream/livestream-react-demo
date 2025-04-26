import styles from "./SpeakingIndicator.module.css";

export function SpeakingIndicator() {
  return (
    <div className={styles._}>
      <i className={styles.bar} />
      <i className={styles.bar} />
      <i className={styles.bar} />
    </div>
  );
}
