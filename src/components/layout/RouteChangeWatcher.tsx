import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const RouteChangeWatcher = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "route/change",
      payload: location.pathname,
    });
  }, [location.pathname]);

  return null;
};

export default RouteChangeWatcher;
