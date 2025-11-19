import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const ProgressBarController = () => {
  const loadingCount = useSelector((state: any) => state.app.loadingCount);

  useEffect(() => {
    if (loadingCount > 0) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loadingCount]);

  return null;
};

export default ProgressBarController;
