import { useCall, useStreamVideoClient } from "@stream-io/video-react-sdk";
import clsx from "clsx";
import { Button } from "react-aria-components";
import buttonStyles from "./Button.module.css";
import { CopyableValue } from "./CopyableValue";
import glassStyles from "./Glass.module.css";
import { Icon } from "./Icon";
import styles from "./LiveInfoOverlay.module.css";
import toolbarStyles from "./Toolbar.module.css";

export function LiveInfoOverlay(props: { onClose?: () => void }) {
  const client = useStreamVideoClient();
  const call = useCall();

  if (!client || !call) {
    return null;
  }

  const joinUrl = `${location.origin}/?id=${call.id}&type=livestream`;

  return (
    <div className={clsx(styles._, glassStyles._, glassStyles._overlay)}>
      <div className={toolbarStyles._}>
        <h4 className={styles.title}>Success</h4>
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
        {joinUrl}
      </CopyableValue>
      <div className={toolbarStyles._}>
        <div>Or, scan the QR code to&nbsp;join from a mobile device:</div>
        <img
          className={styles.qr}
          alt={joinUrl}
          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
            joinUrl
          )}`}
          width={90}
          height={90}
        />
      </div>
    </div>
  );
}
