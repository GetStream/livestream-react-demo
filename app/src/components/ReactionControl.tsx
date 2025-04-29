import {
  CallingState,
  ErrorFromResponse,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Group,
  Popover,
  Toolbar,
} from "react-aria-components";
import buttonStyles from "./Button.module.css";
import glassStyles from "./Glass.module.css";
import { Icon } from "./Icon";
import styles from "./ReactionControl.module.css";
import { emojiMap } from "./reactions";
import { getSecondsUntil, secondsToClock } from "./clock";
import toolbarStyles from "./Toolbar.module.css";

export function ReactionControl() {
  const call = useCall();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const [isOpen, setIsOpen] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState<Date | undefined>(
    undefined
  );
  const [cooldownSecondsLeft, setCooldownSecondsLeft] = useState(Number.NaN);

  useEffect(() => {
    const handle = setInterval(() => {
      const totalSecondsLeft = getSecondsUntil(cooldownUntil);
      setCooldownSecondsLeft(totalSecondsLeft);

      if (totalSecondsLeft === 0) {
        setCooldownUntil(undefined);
        setCooldownSecondsLeft(Number.NaN);
      }
    }, 100);

    return () => clearInterval(handle);
  }, [cooldownUntil]);

  if (!call || callingState !== CallingState.JOINED) {
    return null;
  }

  const handleSendReaction = async (code: string) => {
    try {
      if (!cooldownUntil) {
        await call.sendReaction({
          type: "reaction",
          emoji_code: code,
        });
      }
    } catch (err) {
      if (err instanceof ErrorFromResponse) {
        const { response } = err;

        if (response?.status === 429) {
          const maybeCooldownUntilStr = response.headers["x-ratelimit-reset"];
          const cooldownUntilTimestamp =
            typeof maybeCooldownUntilStr === "string"
              ? Number.parseInt(maybeCooldownUntilStr, 10) * 1000
              : Number.NaN;
          setCooldownUntil(
            Number.isFinite(cooldownUntilTimestamp)
              ? new Date(cooldownUntilTimestamp)
              : new Date(Date.now() + 60_000)
          );
          setCooldownSecondsLeft(getSecondsUntil(cooldownUntil));
          return;
        }
      }

      console.error("Could not send reaction", err);
    }
  };

  const [min, sec] = secondsToClock(cooldownSecondsLeft);

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        className={clsx(
          buttonStyles._,
          buttonStyles._subtle,
          isOpen ? buttonStyles._blue : false
        )}
      >
        <Icon icon="reaction" />
      </Button>
      <Popover placement="top" offset={16}>
        <Dialog
          className={clsx(glassStyles._, glassStyles._overlay, styles.dialog)}
        >
          <Toolbar aria-label="Reactions">
            <Group
              className={clsx(
                toolbarStyles._,
                styles.toolbar,
                cooldownUntil && styles.toolbar_locked
              )}
            >
              {Object.entries(emojiMap).map(([code, emoji], index) => (
                <Button
                  key={code}
                  className={clsx(
                    buttonStyles._,
                    buttonStyles._subtle,
                    styles.reactionButton
                  )}
                  autoFocus={index === 0}
                  isDisabled={Boolean(cooldownUntil)}
                  onPress={() => handleSendReaction(code)}
                >
                  {emoji}
                </Button>
              ))}
            </Group>
          </Toolbar>
          {cooldownUntil && (
            <div className={styles.cooldown}>
              Reactions locked for {min}:{sec}
            </div>
          )}
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
