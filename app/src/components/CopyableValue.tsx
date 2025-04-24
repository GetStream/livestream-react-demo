import styles from "./CopyableValue.module.css";
import { Icon, type IconProps } from "./Icon";
import { Button } from "react-aria-components";
import buttonStyles from "./Button.module.css";
import clsx from "clsx";
import type { ReactNode } from "react";

export function CopyableValue(props: {
  label?: ReactNode;
  description?: ReactNode;
  icon: IconProps["icon"];
  children: string;
}) {
  return (
    <div className={styles._}>
      {props.label && <div className={styles.label}>{props.label}</div>}
      <div className={styles.pseudoinput}>
        <Icon className={styles.icon} icon={props.icon} size={16} />
        <div className={styles.value}>{props.children}</div>
        <Button
          className={clsx(styles.copy, buttonStyles._, buttonStyles._subtle)}
          onPress={() => {
            navigator.clipboard.writeText(props.children);
          }}
        >
          <Icon icon="copy" size={16} />
        </Button>
      </div>
      {props.description && (
        <div className={styles.label}>{props.description}</div>
      )}
    </div>
  );
}
