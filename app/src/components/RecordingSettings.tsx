import clsx from "clsx";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
  Switch,
} from "react-aria-components";
import buttonStyles from "./Button.module.css";
import styles from "./RecordingSettings.module.css";
import switchStyles from "./Switch.module.css";
import glassStyles from "./Glass.module.css";
import selectStyles from "./Select.module.css";
import { Icon, Spinner } from "./Icon";
import {
  type Call,
  RecordSettingsRequestQualityEnum,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useState } from "react";

export function RecordingSettings() {
  const call = useCall();
  const { useIsCallRecordingInProgress } = useCallStateHooks();
  const isRecording = useIsCallRecordingInProgress();
  const [isPending, setIsPending] = useState(false);
  const currentRecordingSettings = call?.state.settings?.recording;
  const [isAudioOnly, setIsAudioOnly] = useState(
    currentRecordingSettings?.audio_only ?? false
  );
  const [quality, setQuality] = useState(
    currentRecordingSettings?.quality ?? "1080p"
  );

  const applySettings = async (call: Call) => {
    if (
      currentRecordingSettings?.audio_only !== isAudioOnly ||
      currentRecordingSettings?.quality !== quality
    ) {
      await call.update({
        settings_override: {
          recording: {
            mode: "available",
            audio_only: isAudioOnly,
            quality: quality as RecordSettingsRequestQualityEnum,
          },
        },
      });
    }
  };

  const handleToggleRecording = async () => {
    if (call) {
      let unsubscribe: (() => void) | undefined;
      setIsPending(true);

      try {
        if (isRecording) {
          unsubscribe = call.on("call.recording_stopped", () => {
            setIsPending(false);
            unsubscribe?.();
          });
          await call.stopRecording();
        } else {
          await applySettings(call);
          unsubscribe = call.on("call.recording_started", () => {
            setIsPending(false);
            unsubscribe?.();
          });
          await call.startRecording();
        }
      } catch (err) {
        console.error("Could not toggle recording", err);
        unsubscribe?.();
        setIsPending(false);
      }
    }
  };

  return (
    <div className={styles._}>
      <h5 className={styles.header}>
        {isRecording ? <>Recording in progress</> : <>Record livestream</>}
      </h5>
      {!isRecording && (
        <div className={styles.settings}>
          <div className={styles.setting}>
            <Switch
              className={switchStyles._}
              isSelected={isAudioOnly}
              onChange={setIsAudioOnly}
            >
              Audio only
            </Switch>
          </div>
          <div className={styles.setting}>
            <Switch
              className={switchStyles._}
              isSelected={!isAudioOnly}
              onChange={(isSelected) => setIsAudioOnly(!isSelected)}
            >
              Video
            </Switch>
          </div>
          <div className={clsx(styles.setting, styles.setting_resolution)}>
            <Select
              selectedKey={quality}
              onSelectionChange={(key) =>
                setQuality(key as RecordSettingsRequestQualityEnum)
              }
            >
              <Label className={selectStyles.label}>Video resolution</Label>
              <Button
                className={clsx(
                  buttonStyles._,
                  buttonStyles._subtle,
                  selectStyles.trigger
                )}
              >
                <SelectValue />
                <Icon icon="unfold" />
              </Button>
              <Popover
                className={clsx(
                  glassStyles._,
                  glassStyles._overlay,
                  selectStyles.menu
                )}
                placement="top start"
              >
                <ListBox>
                  <ListBoxItem id="1080p">1080p</ListBoxItem>
                  <ListBoxItem id="720p">720p</ListBoxItem>
                  <ListBoxItem id="360p">360p</ListBoxItem>
                </ListBox>
              </Popover>
            </Select>
          </div>
        </div>
      )}
      <Button
        className={clsx(buttonStyles._, buttonStyles._primary)}
        isPending={isPending}
        onPress={handleToggleRecording}
      >
        {isPending ? (
          <Spinner />
        ) : isRecording ? (
          <>Stop recording</>
        ) : (
          <>Start recording</>
        )}
      </Button>
    </div>
  );
}
