import React from "react";

import { AppRoutes } from "./routes";
import { WebsocketProvider, socket } from "./contexts";

function App() {
  return (
    <WebsocketProvider value={socket}>
      <AppRoutes />
    </WebsocketProvider>
  );
}

export default App;
