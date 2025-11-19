import { useEffect } from "react";
import { connection } from "@/config/signalr"; // hub connection setup

export const useTnaCommentNotification = () => {
  useEffect(() => {

    // if (Notification.permission !== "granted") {
    //   Notification.requestPermission();
    // }

    connection.on("TnaComment", (msg: string) => {
      console.log("TnaComment update:", msg);
      // if (Notification.permission === "granted") {
      //   new Notification("New Alert", { body: msg });
      // }
    });

    return () => {
      connection.off("TnaComment");
    };
  }, []);
};
