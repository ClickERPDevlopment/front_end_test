import { toast, ToastOptions, Slide, } from "react-toastify";

// Default configuration for all toasts
const defaultOptions: ToastOptions = {
  position: "top-right", // Default position
  autoClose: 5000, // Default duration (3 sec)
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Slide,
};

// Generic toast function
export const showToast = (
  type: "success" | "error" | "info" | "warning",
  message: string,
  options: Partial<ToastOptions> = {}
) => {
  const finalOptions = { ...defaultOptions, ...options }; // Merge defaults with custom options

  switch (type) {
    case "success":
      toast.success(message, finalOptions);
      break;
    case "error":
      toast.error(message, finalOptions);
      break;
    case "info":
      toast.info(message, finalOptions);
      break;
    case "warning":
      toast.warning(message, finalOptions);
      break;
    default:
      toast(message, finalOptions);
  }
};

// Helper functions for specific types
export const showSuccessToast = (message: string, options?: Partial<ToastOptions>) =>
  showToast("success", message, options);

export const showErrorToast = (message: string, options?: Partial<ToastOptions>) =>
  showToast("error", message, options);

export const showInfoToast = (message: string, options?: Partial<ToastOptions>) =>
  showToast("info", message, options);

export const showWarningToast = (message: string, options?: Partial<ToastOptions>) =>
  showToast("warning", message, options);
