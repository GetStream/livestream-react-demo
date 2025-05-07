import clsx from "clsx";
import { Button, Link } from "react-aria-components";
import actionListStyles from "./ActionList.module.css";
import badgeStyles from "./Badge.module.css";
import { BgVideo } from "./BgVideo";
import styles from "./BroadcastMethodScreen.module.css";
import { FeatureList } from "./FeatureList";
import glassStyles from "./Glass.module.css";
import screenStyles from "./Screen.module.css";
import toolbarStyles from "./Toolbar.module.css";
import { Icon } from "./Icon";
import iconStyles from "./Icon.module.css";
import { useState } from "react";

export function BroadcastMethodScreen(props: {
  onSelect: (method: string) => Promise<void>;
}) {
  const [isPending, setIsPending] = useState(false);

  const handleSelect = async (method: string) => {
    try {
      setIsPending(true);
      await props.onSelect(method);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className={clsx(screenStyles._, styles._)}>
      <div className={clsx(screenStyles.header, styles.header)}>
        <div className={toolbarStyles._}>
          <span>Select broadcast method:</span>
          <i className={toolbarStyles.spacer} />
          <Link
            className={clsx(styles.docs, iconStyles.withIcon)}
            href="https://getstream.io/video/docs/"
          >
            <Icon icon="docs" size={12} />
            Docs
          </Link>
        </div>
      </div>
      <div className={clsx(screenStyles.main, styles.main)}>
        <div className={actionListStyles._}>
          <Button
            className={clsx(
              actionListStyles.action,
              isPending && actionListStyles.action_pending,
              glassStyles._,
              glassStyles._interactive
            )}
            isPending={isPending}
            onPress={() => handleSelect("webrtc")}
          >
            <span className={clsx(badgeStyles._, badgeStyles._green)}>
              Ultra-Low Latency · Recommended
            </span>
            <h4 className={actionListStyles.header}>WebRTC</h4>
            <p className={actionListStyles.description}>
              Select this option for low-latency and highest quality between the
              host and the viewers. Supports all platforms.
            </p>
          </Button>
          <Button
            className={clsx(
              actionListStyles.action,
              isPending && actionListStyles.action_pending,
              glassStyles._,
              glassStyles._interactive
            )}
            isPending={isPending}
            onPress={() => handleSelect("rtmp")}
          >
            <span className={clsx(badgeStyles._, badgeStyles._yellow)}>
              Slower + More Setup
            </span>
            <h4 className={actionListStyles.header}>RTMP</h4>
            <p className={actionListStyles.description}>
              Select this option if you want to use dedicated software (like
              OBS) with only a small delay for buffering added to the broadcast.
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
