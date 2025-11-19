import * as signalR from "@microsoft/signalr";

export const connection = new signalR.HubConnectionBuilder()
  .withUrl(import.meta.env.VITE_SOCKET_URL + "/tnaHub", {
    withCredentials: true
  }) // from .env
  .withAutomaticReconnect()
  .build();
