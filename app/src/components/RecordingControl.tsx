import clsx from "clsx";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  Popover,
  ToggleButton,
} from "react-aria-components";
import buttonStyles from "./Button.module.css";
import glassStyles from "./Glass.module.css";
import { Icon } from "./Icon";
import styles from "./RecordingControl.module.css";
import { RecordingSettings } from "./RecordingSettings";
import { CallingState, useCallStateHooks } from "@stream-io/video-react-sdk";

export function RecordingControl() {
  const { useCallCallingState, useIsCallRecordingInProgress } =
    useCallStateHooks();
  const callingState = useCallCallingState();
  const isRecording = useIsCallRecordingInProgress();
  const [isOpen, setIsOpen] = useState(false);

  if (callingState !== CallingState.JOINED) {
    return null;
  }

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <ToggleButton
        className={clsx(
          buttonStyles._,
          buttonStyles._subtle,
          isRecording ? buttonStyles._red : isOpen ? buttonStyles._blue : false
        )}
        isSelected={isRecording}
      >
        <Icon icon="recording" />
      </ToggleButton>
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
