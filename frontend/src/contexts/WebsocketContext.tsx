import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { API_URL } from "../config";

export const socket = io(API_URL);
export const WebsocketContext = createContext<Socket>(socket);

export const WebsocketProvider = WebsocketContext.Provider;
