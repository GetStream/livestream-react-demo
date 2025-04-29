import { useCall, useStreamVideoClient } from "@stream-io/video-react-sdk";
import clsx from "clsx";
import { Button, Link } from "react-aria-components";
import buttonStyles from "./Button.module.css";
import { CopyableValue } from "./CopyableValue";
import glassStyles from "./Glass.module.css";
import { Icon } from "./Icon";
import styles from "./LiveInfoOverlay.module.css";
import toolbarStyles from "./Toolbar.module.css";
import { useBroadcastMethod } from "./useBroadcastMethod";

export function LiveInfoOverlay(props: { onClose?: () => void }) {
  const client = useStreamVideoClient();
  const call = useCall();
  const method = useBroadcastMethod();

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
        <div>
          Scan the QR code to join from a mobile device. You can also invite a
          friend by sending them this URL:
        </div>
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
      <hr className={styles.spacer} />
      {method === "rtmp" ? (
        <>
          <div className={styles.tutorial}>
            We recommend that you take a few mins to look at the tutorial on{" "}
            <Link
              href="https://getstream.io/video/sdk/react/tutorial/livestreaming/#step-2-setup-the-livestream-in-obs"
              target="_top"
            >
              setting up OBS
            </Link>
            :
            <ol>
              <li>
                Add the following credentials to the settings, under Stream.
              </li>
              <li>Start streaming.</li>
            </ol>
          </div>
          <CopyableValue label={<>Server URL</>} icon="link">
            {call.state.ingress?.rtmp.address ?? ""}
          </CopyableValue>
          <CopyableValue label={<>Stream Key</>} icon="link">
            {client.streamClient.tokenManager.getToken() ?? ""}
          </CopyableValue>
        </>
      ) : (
        <div className={styles.tutorial}>
          You can use your virtual camera to stream from software like OBS:
          <ol>
            <li>Start virtual camera in your broadcasting software</li>
            <li>Select virtual camera from the camera menu below</li>
          </ol>
        </div>
      )}
    </div>
  );
}
