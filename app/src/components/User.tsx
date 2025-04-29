import type { User } from "@stream-io/video-react-sdk";
import type { CSSProperties } from "react";
import { fallbackAvatarColor } from "../user";
import iconStyles from "./Icon.module.css";
import styles from "./User.module.css";

export function User(props: { user: User }) {
  return (
    <div
      className={iconStyles.withIcon}
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

function initialsFromName(name: string = "") {
  return (
    name
      .split(/\s+/)
      .map((part) => part[0] ?? "")
      .filter(Boolean)
      .slice(0, 2)
      .join("") || "?"
  );
}
