import { useCallStateHooks } from "@stream-io/video-react-sdk";
import clsx from "clsx";
import { Button } from "react-aria-components";
import buttonStyles from "./Button.module.css";
import { Icon } from "./Icon";
import styles from "./ParticipantSidebar.module.css";
import toolbarStyles from "./Toolbar.module.css";
import { User } from "./User";

export function ParticipantSidebar(props: { onClose: () => void }) {
  const { useCallSession } = useCallStateHooks();
  const session = useCallSession();
  const viewers =
    session?.participants.filter((p) => !p.user.custom.host) ?? [];

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
      {viewers.length > 0 ? (
        <ul className={styles.list}>
          {session?.participants
            .filter((p) => !p.user.custom.host)
            .map((p) => (
              <li key={p.user_session_id}>
                <User user={p.user} />
              </li>
            ))}
        </ul>
      ) : (
        <div>No viewers here... Yet!</div>
      )}
    </div>
  );
}
