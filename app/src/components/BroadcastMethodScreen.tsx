import clsx from "clsx";
import { BroadcastMethodPicker } from "./BroadcastMethodPicker";
import screenStyles from "./Screen.module.css";
import styles from "./BroadcastMethodScreen.module.css";
import toolbarStyles from "./Toolbar.module.css";
import { FeatureList } from "./FeatureList";

export function BroadcastMethodScreen(props: {
  onSelect: (method: string) => void;
}) {
  return (
    <div className={screenStyles._}>
      <div className={clsx(screenStyles.header, styles.header)}>
        <div className={toolbarStyles._}>
          <span>Select broadcast method:</span>
          <i className={toolbarStyles.spacer} />
          <span>Docs</span>
        </div>
      </div>
      <div className={clsx(screenStyles.main, styles.main)}>
        <BroadcastMethodPicker onSelect={props.onSelect} />
      </div>
      <div className={clsx(screenStyles.footer, styles.footer)}>
        <FeatureList />
      </div>
    </div>
  );
}
