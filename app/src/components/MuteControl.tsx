import clsx from "clsx";
import { useEffect, useState } from "react";
import { ToggleButton } from "react-aria-components";
import buttonStyles from "./Button.module.css";
import { Icon } from "./Icon";
import { useCall } from "@stream-io/video-react-sdk";

export function MuteControl() {
  const call = useCall();
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    function detectMuted() {
      const audio = queryStreamAudio();
      if (audio?.paused) {
        setIsMuted(true);
      }
    }

    detectMuted();
    const handle = setInterval(detectMuted, 100);
    return () => clearInterval(handle);
  }, []);

  const handleMuteChange = (isMuted: boolean) => {
    call?.speaker.setVolume(isMuted ? 0 : 1);
    setIsMuted(isMuted);
    const audio = queryStreamAudio();
    if (audio?.paused) {
      audio.play().catch(() => {
        setIsMuted(true);
        console.error("Could not play audio");
      });
    }
  };

  return (
    <ToggleButton
      className={clsx(buttonStyles._, buttonStyles._subtle)}
      isSelected={isMuted}
      onChange={handleMuteChange}
    >
      {<Icon icon={isMuted ? "volume_off" : "volume_up"} />}
    </ToggleButton>
  );
}

function queryStreamAudio() {
  return document.querySelector<HTMLAudioElement>("audio[data-session-id]");
}
