import { mergeProps } from "react-aria";
import { Button, type ButtonProps } from "react-aria-components";
import { useEffectEvent } from "./useEffectEvent";
import { useCall } from "@stream-io/video-react-sdk";

export type EndCallButtonProps = {
  onError?: (reason: unknown) => void;
} & ButtonProps;

export function EndCallButton(props: EndCallButtonProps) {
  const { onError, ...buttonProps } = props;
  const { props: providedProps } = useEndCallButton(props);
  const mergedProps = mergeProps(buttonProps, providedProps);
  return <Button {...mergedProps} />;
}

function useEndCallButton(props: EndCallButtonProps) {
  const call = useCall();

  const onPress = useEffectEvent(async () => {
    try {
      await call?.endCall();
    } catch (err) {
      props.onError?.(err);
    }
  });

  return {
    props: {
      onPress,
    } satisfies ButtonProps,
  };
}
