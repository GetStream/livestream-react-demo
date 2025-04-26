import clsx from "clsx";
import { Button } from "react-aria-components";
import actionListStyles from "./ActionList.module.css";
import badgeStyles from "./Badge.module.css";
import { BgVideo } from "./BgVideo";
import styles from "./BroadcastMethodScreen.module.css";
import { FeatureList } from "./FeatureList";
import glassStyles from "./Glass.module.css";
import screenStyles from "./Screen.module.css";
import toolbarStyles from "./Toolbar.module.css";

export function BroadcastMethodScreen(props: {
  onSelect: (method: string) => void;
}) {
  return (
    <div className={clsx(screenStyles._, styles._)}>
      <div className={clsx(screenStyles.header, styles.header)}>
        <div className={toolbarStyles._}>
          <span>Select broadcast method:</span>
          <i className={toolbarStyles.spacer} />
          {/* <span>Docs</span> */}
        </div>
      </div>
      <div className={clsx(screenStyles.main, styles.main)}>
        <div className={actionListStyles._}>
          <Button
            className={clsx(
              actionListStyles.action,
              glassStyles._,
              glassStyles._interactive
            )}
            onPress={() => props.onSelect("webrtc")}
          >
            <span className={clsx(badgeStyles._, badgeStyles._green)}>
              Ultra-Low Latency + Easy Setup
            </span>
            <h4 className={actionListStyles.header}>WebRTC</h4>
            <p className={actionListStyles.description}>
              Select this option if you want ultra-low latency browser-based
              streaming between peers, with no transcoding or additional
              software needed.
            </p>
          </Button>
          <Button
            className={clsx(
              actionListStyles.action,
              glassStyles._,
              glassStyles._interactive
            )}
            onPress={() => props.onSelect("rtmp")}
          >
            <span className={clsx(badgeStyles._, badgeStyles._yellow)}>
              Slower + More Setup
            </span>
            <h4 className={actionListStyles.header}>RTMP</h4>
            <p className={actionListStyles.description}>
              Select this option if you want to use dedicated software (like
              OBS) with the highest quality video (small delay for buffering).
            </p>
          </Button>
        </div>
      </div>
      <div className={clsx(screenStyles.footer, styles.footer)}>
        <FeatureList />
      </div>
      <BgVideo />
    </div>
  );
}
