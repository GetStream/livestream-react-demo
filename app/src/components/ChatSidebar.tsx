import clsx from "clsx";
import { lazy, Suspense } from "react";
import { Button } from "react-aria-components";
import type { StreamChat } from "stream-chat";
import buttonStyles from "./Button.module.css";
import styles from "./ChatSidebar.module.css";
import { Icon, Spinner } from "./Icon";
import toolbarStyles from "./Toolbar.module.css";

const ChatEmbedLazy = lazy(() => import("./ChatEmbed"));

export function ChatSidebar(props: {
  client: StreamChat;
  onClose: () => void;
}) {
  return (
    <div className={styles._}>
      <div className={toolbarStyles._}>
        <h4 className={styles.title}>Chat</h4>
        <i className={toolbarStyles.spacer} />
        <Button
          className={clsx(buttonStyles._, buttonStyles._subtle)}
          onPress={props.onClose}
        >
          <Icon icon="close" />
        </Button>
      </div>
      <div className={clsx(styles.chat, "str-chat__theme-dark")}>
        <Suspense fallback={<Spinner size={80} />}>
          <ChatEmbedLazy client={props.client} />
        </Suspense>
      </div>
    </div>
  );
}
