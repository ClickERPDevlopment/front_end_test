import { Middleware } from "@reduxjs/toolkit";
import { navigate } from "@/utils/navigate";
import axiosInstance from "@/api/axiosInstance";

const excludedRoutes = ["/login", "/unauthorized", "/public"]; // paths to skip auth check

export const authMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);

  if (action.type === "route/change") {
    const path = action.payload;

    if (excludedRoutes.includes(path)) {
      return result;
    }

    // Async call without breaking sync middleware
    (async () => {
      try {
        const res = await axiosInstance.get(`/check-auth`, {
          params: { path }, // example: /check-auth?path=/webapp/dashboard
        });

        if (res.data?.unauthorized) {
          navigate("/unauthorized");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/unauthorized");
      }
    })();
  }

  return result;
};
