import clsx from "clsx";
import { mergeProps } from "react-aria";
import { Button, type ButtonProps } from "react-aria-components";
import type { StreamChat } from "stream-chat";
import { useChannel, useChannelUnreadCount, useChatClient } from "../chat";
import buttonStyles from "./Button.module.css";
import styles from "./ChatControl.module.css";
import { Icon } from "./Icon";

export default function ChatControl(
  props: Omit<ButtonProps, "children" | "onPress"> & {
    onPress: (client: StreamChat) => void;
  }
) {
  const client = useChatClient();
  const channel = useChannel(client);
  const unreadCount = useChannelUnreadCount(channel);

  const { onPress, ...buttonProps } = props;
  const providedProps: ButtonProps = {
    className: clsx(styles._, buttonStyles._, buttonStyles._subtle),
    isDisabled: !client,
    onPress: () => {
      if (client) {
        onPress(client);
      }
    },
  };
  const mergedProps = mergeProps(buttonProps, providedProps);

  return (
    <Button {...mergedProps}>
      <Icon icon="chat" />
      {unreadCount > 0 && <div className={styles.badge}>{unreadCount}</div>}
    </Button>
  );
}
