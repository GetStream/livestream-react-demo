import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useMemo, useState } from "react";
import { StreamChat } from "stream-chat";

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
