import clsx from "clsx";
import { EndCallButton } from "../ui/EndCallButton";
import buttonStyles from "./Button.module.css";
import { Icon, Spinner } from "./Icon";

export function EndCallControl() {
  return (
    <EndCallButton
      className={(values) =>
        clsx(
          buttonStyles._,
          buttonStyles._subtle,
          !values.isPending && buttonStyles._red
        )
      }
    >
      {(values) => (values.isPending ? <Spinner /> : <Icon icon="call_end" />)}
    </EndCallButton>
  );
}
