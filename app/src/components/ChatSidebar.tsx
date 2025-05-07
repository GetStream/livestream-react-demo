import { lazy, Suspense } from "react";
import styles from "./ChatSidebar.module.css";
import buttonStyles from "./Button.module.css";
import toolbarStyles from "./Toolbar.module.css";
import { Button } from "react-aria-components";
import { Icon, Spinner } from "./Icon";
import clsx from "clsx";

const ChatEmbedLazy = lazy(() => import("./ChatEmbed"));

export function ChatSidebar(props: { onClose: () => void }) {
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
        <Suspense fallback={<Spinner />}>
          <ChatEmbedLazy />
        </Suspense>
      </div>
    </div>
  );
}
