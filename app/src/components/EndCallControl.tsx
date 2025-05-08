import {
  EndCallButton,
  type EndCallButtonProps,
} from "@stream-io/video-react-ui";
import clsx from "clsx";
import buttonStyles from "./Button.module.css";
import { Icon, Spinner } from "./Icon";
import { mergeProps } from "react-aria";

export function EndCallControl(props: Omit<EndCallButtonProps, "children">) {
  const providedProps = {
    className: (values) =>
      clsx(
        buttonStyles._,
        buttonStyles._subtle,
        !values.isPending && buttonStyles._red
      ),
  } satisfies EndCallButtonProps;
  const mergedProps = mergeProps(props, providedProps);

  return (
    <EndCallButton {...mergedProps}>
      {(values) => (values.isPending ? <Spinner /> : <Icon icon="call_end" />)}
    </EndCallButton>
  );
}
