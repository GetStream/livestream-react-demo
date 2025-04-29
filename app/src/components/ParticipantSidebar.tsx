import {
  useCallStateHooks,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import styles from "./ParticipantSidebar.module.css";
import toolbarStyles from "./Toolbar.module.css";
import buttonStyles from "./Button.module.css";
import { Button } from "react-aria-components";
import clsx from "clsx";
import { Icon } from "./Icon";
import { fallbackAvatarColor } from "../user";
import { User } from "./User";

export function ParticipantSidebar(props: { onClose: () => void }) {
  const client = useStreamVideoClient();
  const { useCallSession } = useCallStateHooks();
  const session = useCallSession();

  return (
    <div className={styles._}>
      <div className={toolbarStyles._}>
        <h4 className={styles.title}>Viewers</h4>
        <i className={toolbarStyles.spacer} />
        <Button
          className={clsx(buttonStyles._, buttonStyles._subtle)}
          onPress={props.onClose}
        >
          <Icon icon="close" />
        </Button>
      </div>
      <ul>
        {session?.participants.map((p) => (
          <li key={p.user_session_id}>
            <User user={p.user} />
          </li>
        ))}
      </ul>
    </div>
  );
}
