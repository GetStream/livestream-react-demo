import { useCall } from "@stream-io/video-react-sdk";
import { nanoid } from "nanoid";
import { useEffect, useState, type CSSProperties } from "react";
import styles from "./ReactionsOverlay.module.css";
import { emojiMap } from "./reactions";

interface Reaction {
  id: string;
  emoji: string;
  userName: string;
  offset: number;
  distance: number;
  duration: number;
  scale: number;
}

export function ReactionsOverlay() {
  const call = useCall();
  const [reactions, setReactions] = useState<Reaction[]>([]);

  useEffect(() => {
    if (call) {
      const unsubscribe = call.on("call.reaction_new", (event) => {
        const code = event.reaction.emoji_code;
        const emoji = code ? emojiMap[code] : undefined;

        if (emoji) {
          const reaction: Reaction = {
            id: nanoid(),
            emoji,
            userName: event.reaction.user.name ?? "",
            offset: Math.random() * 50,
            distance: 50 + Math.random() * 10,
            duration: 2 + Math.random(),
            scale: 0.9 + Math.random() * 0.2,
          };

          setReactions((reactions) => [...reactions, reaction]);
        }
      });

      return unsubscribe;
    }
  }, [call]);

  return (
    <div className={styles._}>
      {reactions.map((reaction) => (
        <i
          key={reaction.id}
          className={styles.reaction}
          style={
            {
              "--reaction-offset": `${reaction.offset}%`,
              "--reaction-distance": `${reaction.distance}vh`,
              "--reaction-duration": `${reaction.duration}s`,
              "--reaction-scale": `${reaction.scale}`,
            } as CSSProperties
          }
          onAnimationEnd={() =>
            setReactions((reactions) =>
              reactions.filter((r) => r.id !== reaction.id)
            )
          }
        >
          {reaction.emoji}
        </i>
      ))}
    </div>
  );
}
