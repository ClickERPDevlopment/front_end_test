import { connection } from "@/config/signalr";
import { useEffect } from "react";

export const useProductionNotification = () => {
  useEffect(() => {
    connection.on("ProductionUpdate", (msg: string) => {
      console.log("Production update:", msg);
    });

    return () => {
      connection.off("ProductionUpdate");
    };
  }, []);
};
