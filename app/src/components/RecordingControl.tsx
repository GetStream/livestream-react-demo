import { Button, Dialog, DialogTrigger, Popover } from "react-aria-components";
import buttonStyles from "./Button.module.css";
import glassStyles from "./Glass.module.css";
import styles from "./RecordingControl.module.css";
import { Icon } from "./Icon";
import clsx from "clsx";
import { RecordingSettings } from "./RecordingSettings";
import { useState } from "react";

export function RecordingControl() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        className={clsx(
          buttonStyles._,
          buttonStyles._subtle,
          isOpen && buttonStyles._blue
        )}
      >
        <Icon icon="recording" />
      </Button>
      <Popover offset={16}>
        <Dialog
          className={clsx(glassStyles._, glassStyles._overlay, styles.dialog)}
        >
          <RecordingSettings />
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
