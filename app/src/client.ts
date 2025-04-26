import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { humanId } from "human-id";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export function useClient(mode: "host" | "viewer") {
  const [client, setClient] = useState<StreamVideoClient | undefined>(
    undefined
  );

  useEffect(() => {
    let cancel = false;
    let client: StreamVideoClient | undefined;

    getDemoCredentials(mode)
      .then((credentials) => {
        if (cancel) {
          throw new Error("Connection canceled");
        }

        client = new StreamVideoClient(credentials.apiKey);
        return client.connectUser(
          {
            id: credentials.userId,
            name: mode === "host" ? "Host" : humanId({ capitalize: true }),
          },
          credentials.token
        );
      })
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
      client?.disconnectUser().catch((err) => {
        console.error("Could not disconnect user", err);
      });
      setClient(undefined);
    };
  }, [mode]);

  return client;
}

async function getDemoCredentials(mode: string) {
  const params = new URLSearchParams({
    user_id: `${mode}-${nanoid()}`,
    environment: "livestream",
    exp: String(4 * 60 * 60), // 4 hours
  });
  const res = await fetch(
    `https://pronto.getstream.io/api/auth/create-token?${params}`
  );
  return await res.json();
}
