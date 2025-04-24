import clsx from "clsx";
import type { PropsWithChildren } from "react";
import { Button, Group, MenuTrigger, Popover } from "react-aria-components";
import { CameraMenu } from "../ui/CameraMenu";
import { CameraToggleButton } from "../ui/CameraToggleButton";
import { MicrophoneMenu } from "../ui/MicrophoneMenu";
import { MicrophoneToggleButton } from "../ui/MicrophoneToggleButton";
import buttonStyles from "./Button.module.css";
import styles from "./DeviceControl.module.css";
import glassStyles from "./Glass.module.css";
import { Icon } from "./Icon";

export function MicrophoneControl() {
  return (
    <Group className={styles._}>
      <MicrophoneToggleButton className={getToggleClassName}>
        {(values) => <Icon icon={values.isSelected ? "mic" : "mic_off"} />}
      </MicrophoneToggleButton>
      <Menu>
        <MicrophoneMenu />
      </Menu>
    </Group>
  );
}

export function CameraControl() {
  return (
    <Group className={styles._}>
      <CameraToggleButton className={getToggleClassName}>
        {(values) => (
          <Icon icon={values.isSelected ? "videocam" : "videocam_off"} />
        )}
      </CameraToggleButton>
      <Menu>
        <CameraMenu />
      </Menu>
    </Group>
  );
}

function Menu(props: PropsWithChildren) {
  return (
    <MenuTrigger>
      <Button className={clsx(buttonStyles._, buttonStyles._subtle)}>
        <Icon icon="arrow_drop_up" />
      </Button>
      <Popover
        placement="top"
        offset={16}
        className={clsx(glassStyles._, glassStyles._overlay, styles.menu)}
      >
        {props.children}
      </Popover>
    </MenuTrigger>
  );
}

const getToggleClassName = (values: { isSelected: boolean }) =>
  clsx(
    buttonStyles._,
    buttonStyles._subtle,
    !values.isSelected && buttonStyles._red
  );
