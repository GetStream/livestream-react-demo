import clsx from "clsx";
import { useState } from "react";
import styles from "./BgVIdeo.module.css";

export function BgVideo() {
  const [isReady, setIsReady] = useState(false);

  return (
    <video
      className={clsx(styles._, isReady && styles._ready)}
      src="/aura.mp4"
      onCanPlayThrough={() => setIsReady(true)}
    />
  );
}
