import { Icon, type IconProps } from "./Icon";
import styles from "./Indicator.module.css";
import glassStyles from "./Glass.module.css";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

export function Indicator(
  props: PropsWithChildren<{ icon: IconProps["icon"] }>
) {
  return (
    <div className={clsx(styles._, glassStyles._)}>
      <Icon className={styles.icon} icon={props.icon} size={14} />
      <div className={styles.label}>{props.children}</div>
    </div>
  );
}
