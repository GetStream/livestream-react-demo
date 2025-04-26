import styles from "./CopyableValue.module.css";
import { Icon, type IconProps } from "./Icon";
import { Button, Input, Label, Text, TextField } from "react-aria-components";
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
    <TextField className={styles._} value={props.children} isReadOnly>
      {props.label && <Label className={styles.label}>{props.label}</Label>}
      <div className={styles.pseudoinput}>
        <Icon className={styles.icon} icon={props.icon} size={16} />
        <Input
          className={styles.value}
          onFocus={(event) => event.currentTarget.select()}
        />
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
        <Text slot="description" className={styles.label}>
          {props.description}
        </Text>
      )}
    </TextField>
  );
}
