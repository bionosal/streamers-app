import { WebsocketProvider, socket } from "./contexts";
import { AppRoutes } from "./routes";

function App() {
  return (
    <WebsocketProvider value={socket}>
      <AppRoutes />
    </WebsocketProvider>
  );
}

export default App;
