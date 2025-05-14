import type { PropsWithChildren } from "react";
import screenStyles from "./Screen.module.css";

export function ErrorScreen(props: PropsWithChildren) {
  return (
    <div className={screenStyles._}>
      <div className={screenStyles.main}>{props.children}</div>
    </div>
  );
}
