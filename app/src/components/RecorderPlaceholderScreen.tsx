import { BgVideo } from "./BgVideo";
import screenStyles from "./Screen.module.css";

export function RecorderPlaceholderScreen() {
  return (
    <div className={screenStyles._}>
      <div className={screenStyles.main}>
        <BgVideo />
      </div>
    </div>
  );
}
