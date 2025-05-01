import { useCall, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useBroadcastMethod } from "./useBroadcastMethod";
import clsx from "clsx";
import styles from "./Tutorial.module.css";
import { Link } from "react-aria-components";
import { CopyableValue } from "./CopyableValue";

export function Tutorial() {
  const method = useBroadcastMethod();
  return method === "rtmp" ? <RtmpTutorial /> : <WebRtcTutorial />;
}

function RtmpTutorial() {
  const client = useStreamVideoClient();
  const call = useCall();

  return (
    <div className={clsx(styles._, styles._rtmp)}>
      <div className={styles.steps}>
        <h4 className={styles.title}>Broadcasting software setup</h4>
        We recommend that you take a few mins to look at the tutorial on{" "}
        <Link
          href="https://getstream.io/video/sdk/react/tutorial/livestreaming/#step-2-setup-the-livestream-in-obs"
          target="_top"
        >
          setting up OBS
        </Link>
        :
        <ol>
          <li>Add the following credentials to the settings, under Stream.</li>
          <li>Start streaming.</li>
        </ol>
      </div>
      <div className={styles.keys}>
        <CopyableValue label={<>Server URL</>} icon="link">
          {call?.state.ingress?.rtmp.address ?? ""}
        </CopyableValue>
        <CopyableValue label={<>Stream Key</>} icon="link">
          {client?.streamClient.tokenManager.getToken() ?? ""}
        </CopyableValue>
      </div>
    </div>
  );
}

function WebRtcTutorial() {
  return (
    <div className={styles._}>
      <h4 className={styles.title}>Camera setup</h4>
      Select your capture device from the camera dropdown.
      <br />
      You can also use virtual camera from your broadcasting software.
    </div>
  );
}
