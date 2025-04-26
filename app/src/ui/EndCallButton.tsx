import { mergeProps } from "react-aria";
import { Button, type ButtonProps } from "react-aria-components";
import { useEffectEvent } from "./useEffectEvent";
import { useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";

export type EndCallButtonProps = {
  onError?: (reason: unknown) => void;
} & Omit<ButtonProps, "isPending">;

export function EndCallButton(props: EndCallButtonProps) {
  const { onError, ...buttonProps } = props;
  const { props: providedProps } = useEndCallButton(props);
  const mergedProps = mergeProps(buttonProps, providedProps);
  return <Button {...mergedProps} />;
}

function useEndCallButton(props: EndCallButtonProps) {
  const call = useCall();
  const [isPending, setIsPending] = useState(false);

  const onPress = useEffectEvent(async () => {
    try {
      setIsPending(true);
      await call?.endCall();
    } catch (err) {
      props.onError?.(err);
    } finally {
      setIsPending(false);
    }
  });

  return {
    props: {
      isPending,
      onPress,
    } satisfies ButtonProps,
  };
}
