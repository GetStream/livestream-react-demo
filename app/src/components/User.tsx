import type { User } from "@stream-io/video-react-sdk";
import type { CSSProperties } from "react";
import { fallbackAvatarColor, initialsFromName } from "../user";
import styles from "./User.module.css";

export function User(props: { user: User }) {
  return (
    <div
      className={styles._}
      style={
        {
          "--user-avatar-color":
            props.user.custom?.color ?? fallbackAvatarColor,
        } as CSSProperties
      }
    >
      <div className={styles.avatar}>{initialsFromName(props.user.name)}</div>
      <div className={styles.name}>{props.user.name}</div>
    </div>
  );
}
