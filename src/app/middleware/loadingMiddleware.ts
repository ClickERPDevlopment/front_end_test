/* eslint-disable @typescript-eslint/no-explicit-any */
import { startLoading, stopLoading } from '../appSlice';

const loadingMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  if (action.type.endsWith('/pending')) {
    storeAPI.dispatch(startLoading());
  } else if (
    action.type.endsWith('/fulfilled') ||
    action.type.endsWith('/rejected')
  ) {
    storeAPI.dispatch(stopLoading());
  }

  return next(action);
};

export default loadingMiddleware;
