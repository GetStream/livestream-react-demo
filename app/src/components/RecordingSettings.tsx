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
import { Icon } from "./Icon";

export function RecordingSettings() {
  return (
    <div className={styles._}>
      <h5 className={styles.header}>Record livestream</h5>
      <div className={styles.settings}>
        <div className={styles.setting}>
          <Switch className={switchStyles._}>Audio only</Switch>
        </div>
        <div className={styles.setting}>
          <Switch className={switchStyles._}>Video</Switch>
        </div>
        <div className={clsx(styles.setting, styles.setting_resolution)}>
          <Select>
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
                <ListBoxItem>1080p</ListBoxItem>
                <ListBoxItem>720p</ListBoxItem>
                <ListBoxItem>360p</ListBoxItem>
              </ListBox>
            </Popover>
          </Select>
        </div>
      </div>
      <Button className={clsx(buttonStyles._, buttonStyles._primary)}>
        Start recording
      </Button>
    </div>
  );
}
