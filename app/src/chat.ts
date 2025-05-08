import { useCall, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useMemo, useState } from "react";
import { Channel, StreamChat } from "stream-chat";

export function useChatClient() {
  const videoClient = useStreamVideoClient();
  const apiKey = videoClient?.streamClient.key;
  const token = videoClient?.streamClient.tokenManager.getToken();
  const userId = videoClient?.state.connectedUser?.id;
  const credentials = useMemo(
    () => (apiKey && token && userId ? { apiKey, token, userId } : undefined),
    [apiKey, token, userId]
  );
  const [client, setClient] = useState<StreamChat | undefined>(undefined);

  useEffect(() => {
    if (!credentials) {
      return;
    }

    let cancel = false;
    const client = new StreamChat(credentials.apiKey);
    const connectionPromise = client
      .connectUser({ id: credentials.userId }, credentials.token)
      .then(() => {
        if (cancel) {
          throw new Error("Connection canceled");
        }

        setClient(client);
      })
      .catch((err) => {
        console.error("Could not connect user", err);
      });

    return () => {
      cancel = true;
      connectionPromise
        .then(() => client.disconnectUser())
        .catch((err) => {
          console.error("Could not disconnect user", err);
        });
      setClient(undefined);
    };
  }, [credentials]);

  return client;
}

export function useChannel(client: StreamChat | undefined) {
  const callId = useCall()?.id;
  const channel = useMemo(
    () => (client && callId ? client.channel("videocall", callId) : undefined),
    [client, callId]
  );

  useEffect(() => {
    if (channel && !channel.initialized) {
      channel.watch();
    }
  }, [channel]);

  return channel;
}

export function useChannelUnreadCount(channel: Channel | undefined) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (channel) {
      const handleUnreadChange = () => {
        setUnreadCount(channel.state.unreadCount);
      };

      channel.on("message.new", handleUnreadChange);
      channel.on("message.read", handleUnreadChange);
      channel.on("notification.mark_read", handleUnreadChange);

      return () => {
        channel.off("message.new", handleUnreadChange);
        channel.off("message.read", handleUnreadChange);
        channel.off("notification.mark_read", handleUnreadChange);
      };
    }
  }, [channel]);

  return unreadCount;
}
