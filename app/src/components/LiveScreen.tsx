import clsx from "clsx";
import screenStyles from "./Screen.module.css";
import toolbarStyles from "./Toolbar.module.css";
import { CallControls } from "./CallControls";
import { Indicator } from "./Indicator";
import { LiveInfoOverlay } from "./LiveInfoOverlay";
import { LiveCountdown } from "./LiveCountdown";

export function LiveScreen() {
  return (
    <div className={screenStyles._}>
      <div className={clsx(screenStyles.header)}>
        <div className={toolbarStyles._}>
          <span>WebRTC livestream</span>
          <i className={toolbarStyles.spacer} />
          <Indicator icon="verified">
            <small>00</small>:33
          </Indicator>
          <Indicator icon="bullet">
            15 <small>ms</small>
          </Indicator>
        </div>
      </div>
      <div className={clsx(screenStyles.main)}>
        <LiveCountdown />
        <LiveInfoOverlay />
      </div>
      <div className={clsx(screenStyles.footer)}>
        <CallControls />
      </div>
    </div>
  );
}
