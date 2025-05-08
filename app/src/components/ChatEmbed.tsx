import clsx from "clsx";
import type { CSSProperties } from "react";
import type { StreamChat } from "stream-chat";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Window,
  type AvatarProps,
  type LoadingErrorIndicatorProps,
} from "stream-chat-react";
import "stream-chat-react/css/v2/index.css";
import { useChannel } from "../chat";
import { fallbackAvatarColor, initialsFromName } from "../user";
import { Spinner } from "./Icon";
import userStyles from "./User.module.css";

export default function ChatEmbed(props: { client: StreamChat }) {
  const channel = useChannel(props.client);

  return (
    <Chat client={props.client} theme="str-chat__theme-dark">
      <Channel
        channel={channel}
        LoadingIndicator={LoadingIndicator}
        LoadingErrorIndicator={LoadingErrorIndicator}
        Avatar={Avatar}
        activeUnreadHandler={() => {}}
      >
        <Window>
          <MessageList returnAllReadData />
          <MessageInput focus />
        </Window>
      </Channel>
    </Chat>
  );
}

function LoadingIndicator() {
  return <Spinner size={80} />;
}

function LoadingErrorIndicator(props: LoadingErrorIndicatorProps) {
  return <div>{props.error?.message}</div>;
}

export function Avatar(props: AvatarProps) {
  return (
    <div
      className={clsx(
        userStyles.avatar,
        "str-chat__message-sender-avatar",
        props.className
      )}
      style={
        {
          "--user-avatar-color":
            // @ts-expect-error Custom color prop should be there
            props.user?.color ?? fallbackAvatarColor,
        } as CSSProperties
      }
    >
      {initialsFromName(props.user?.name)}
    </div>
  );
}
