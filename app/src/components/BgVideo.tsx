import clsx from "clsx";
import { useState } from "react";
import styles from "./BgVIdeo.module.css";

export function BgVideo() {
  const [isReady, setIsReady] = useState(false);

  return (
    <video
      className={clsx(styles._, isReady && styles._ready)}
      src="/ripple.mp4"
      autoPlay
      playsInline
      muted
      loop
      onCanPlayThrough={() => setIsReady(true)}
    />
  );
}
