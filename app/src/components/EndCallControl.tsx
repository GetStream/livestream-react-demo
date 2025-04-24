import clsx from "clsx";
import { EndCallButton } from "../ui/EndCallButton";
import buttonStyles from "./Button.module.css";
import { Icon } from "./Icon";

export function EndCallControl() {
  return (
    <EndCallButton
      className={clsx(buttonStyles._, buttonStyles._subtle, buttonStyles._red)}
    >
      <Icon icon="call_end" />
    </EndCallButton>
  );
}
