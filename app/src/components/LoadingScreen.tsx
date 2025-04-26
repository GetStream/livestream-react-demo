import { Spinner } from "./Icon";
import screenStyles from "./Screen.module.css";

export function LoadingScreen() {
  return (
    <div className={screenStyles._}>
      <div className={screenStyles.main}>
        <Spinner size={80} />
      </div>
    </div>
  );
}
