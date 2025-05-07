import type { Call } from "@stream-io/video-react-sdk";
import clsx from "clsx";
import { Link } from "react-aria-components";
import actionListStyles from "./ActionList.module.css";
import badgeStyles from "./Badge.module.css";
import { BgVideo } from "./BgVideo";
import { FeatureList } from "./FeatureList";
import styles from "./FinalScreen.module.css";
import glassStyles from "./Glass.module.css";
import { Icon } from "./Icon";
import iconStyles from "./Icon.module.css";
import { RecordingDownloadButton } from "./RecordingDownloadButton";
import screenStyles from "./Screen.module.css";
import toolbarStyles from "./Toolbar.module.css";
import { useStore } from "@nanostores/react";
import { viewerModeStore } from "../stores/viewerMode";

export function FinalScreen(props: { call?: Call }) {
  const { mode } = useStore(viewerModeStore);

  return (
    <div className={clsx(screenStyles._, styles._)}>
      <div
        className={clsx(screenStyles.header, styles.header, toolbarStyles._)}
      >
        <Link className={clsx(styles.backlink, iconStyles.withIcon)} href="/">
          <Icon icon="replay" size={12} /> Start over
        </Link>
        <i className={toolbarStyles.spacer} />
        {props.call && mode === "host" && (
          <RecordingDownloadButton call={props.call} />
        )}
      </div>
      <div className={clsx(screenStyles.main, styles.main)}>
        <div className={actionListStyles._}>
          <Link
            className={clsx(
              actionListStyles.action,
              actionListStyles.action_compact,
              glassStyles._,
              glassStyles._interactive
            )}
            href="https://getstream.io/video/sdk/"
            target="_top"
          >
            <span className={clsx(badgeStyles._, badgeStyles._blue)}>
              Get Started
            </span>
            <h4 className={actionListStyles.header}>Livestream SDKs</h4>
            <p className={actionListStyles.description}>
              Explore all the SDKs across different platforms
            </p>
          </Link>
          <Link
            className={clsx(
              actionListStyles.action,
              actionListStyles.action_compact,
              glassStyles._,
              glassStyles._interactive
            )}
            href="https://getstream.io/video/sdk/react/tutorial/livestreaming/"
            target="_top"
          >
            <span className={clsx(badgeStyles._, badgeStyles._purple)}>
              Learn More
            </span>
            <h4 className={actionListStyles.header}>Livestream tutorial</h4>
            <p className={actionListStyles.description}>
              Learn how to build a fully functioning livestream experience.
            </p>
          </Link>
          <Link
            className={clsx(
              actionListStyles.action,
              actionListStyles.action_compact,
              glassStyles._,
              glassStyles._interactive
            )}
            href="https://getstream.io/video/pricing/"
            target="_top"
          >
            <span className={clsx(badgeStyles._, badgeStyles._green)}>
              Discover
            </span>
            <h4 className={actionListStyles.header}>Pricing</h4>
            <p className={actionListStyles.description}>
              Scale your livestreams with affordable plans.
            </p>
          </Link>
        </div>
      </div>
      <div className={clsx(screenStyles.footer, styles.footer)}>
        <FeatureList />
      </div>
      <BgVideo />
    </div>
  );
}
