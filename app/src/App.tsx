import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { LiveScreen } from "./components/LiveScreen";

const client = new StreamVideoClient("2x2ms6uuwxcf");
const call = client.call("default", "test-call");

function App() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        {/* <BroadcastMethodScreen /> */}
        <LiveScreen />
      </StreamCall>
    </StreamVideo>
  );
}

export default App;
