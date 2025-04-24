import clsx from "clsx";
import * as iconUrls from "../icons";
import styles from "./Icon.module.css";
import type { ComponentProps } from "react";
import { mergeProps } from "react-aria";

export type IconProps = {
  icon: keyof typeof iconUrls;
  size?: number;
  spin?: boolean;
} & ComponentProps<"div">;

export function Icon(props: IconProps) {
  const { icon, size, spin, ...divProps } = props;
  const { props: providedProps } = useIcon(props);
  const mergedProps = mergeProps(divProps, providedProps);
  return <div {...mergedProps} />;
}

export function Spinner(props: { size?: number }) {
  return <Icon icon="spinner" spin size={props.size} />;
}

function useIcon(props: IconProps) {
  const iconUrl = iconUrls[props.icon];
  const sizeStyles =
    typeof props.size === "number"
      ? { width: `${props.size}px`, height: `${props.size}px` }
      : {};

  return {
    props: {
      className: clsx(styles._, props.spin && styles._spin),
      style: {
        maskImage: `url("${iconUrl}")`,
        ...sizeStyles,
      },
    } satisfies ComponentProps<"div">,
  };
}
