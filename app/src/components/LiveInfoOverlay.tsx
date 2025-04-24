import { CopyableValue } from "./CopyableValue";
import styles from "./LiveInfoOverlay.module.css";
import glassStyles from "./Glass.module.css";
import buttonStyles from "./Button.module.css";
import toolbarStyles from "./Toolbar.module.css";
import clsx from "clsx";
import { Button } from "react-aria-components";
import { Icon } from "./Icon";

export function LiveInfoOverlay(props: { onClose?: () => void }) {
  const callId =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, fugiat voluptate quae eos alias sint necessitatibus. Eligendi porro ipsam iusto perspiciatis, ullam dolore dolorum obcaecati! Aliquam, excepturi?";

  return (
    <div className={clsx(styles._, glassStyles._, glassStyles._overlay)}>
      <div className={toolbarStyles._}>
        <h4 className={styles.header}>Success</h4>
        <i className={toolbarStyles.spacer} />
        <Button
          className={clsx(buttonStyles._, buttonStyles._subtle)}
          onPress={props.onClose}
        >
          <Icon icon="close" />
        </Button>
      </div>
      <CopyableValue
        label={<>Call ID</>}
        description={<>Share this with your participants to join.</>}
        icon="link"
      >
        {callId}
      </CopyableValue>
      <div className={toolbarStyles._}>
        <div>
          Scan the QR code to join from a mobile device. You can also invite a
          friend by sending them this URL:
        </div>
        <img
          alt={callId}
          src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
            callId
          )}`}
        />
      </div>
    </div>
  );
}
