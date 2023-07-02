import { createContext } from "react";
import { io, Socket } from "socket.io-client";

import { API_URL } from "../config";

// Create a socket connection using the API_URL
export const socket = io(API_URL);

// Create a WebSocket context with the socket as the default value
export const WebsocketContext = createContext<Socket>(socket);

// Create a WebSocket provider component
export const WebsocketProvider = WebsocketContext.Provider;
