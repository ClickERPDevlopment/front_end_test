import { useEffect } from "react";
import { connection } from "@/config/signalr";

export const useNotification = () => {
  useEffect(() => {
    // if (Notification.permission !== "granted") {
    //   Notification.requestPermission();
    // }

    connection.on("ReceiveNotification", (message: string) => {
      console.log("New message:", message);

      // if (Notification.permission === "granted") {
      //   new Notification("New Alert", { body: message });
      // }
    });

    connection.start()
      .then(() => console.log("Socket connected"))
      .catch(err => console.error("Socket connection failed:", err));

    return () => {
      connection.off("ReceiveNotification");
    };
  }, []);
};
