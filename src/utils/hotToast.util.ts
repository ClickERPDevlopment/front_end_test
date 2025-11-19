import { toast, ToastPosition, Renderable } from "react-hot-toast";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { faBell, faCheckCircle, faInfoCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

// Options type
type CustomOptions = Partial<typeof defaultOptions> & {
    bgColor?: string;
    textColor?: string;
    iconColor?: string;
    icon?: Renderable;
    fontSize?: string;
    width?: string;
    position?: ToastPosition;
    iconSize?: number;
};

// add this:
export const iconMap = {
    success: faCheckCircle,
    error: faTimesCircle,
    info: faInfoCircle,
    bell: faBell,
};

// toast("Message", {
//   icon: toastIcon,
//   style: {
//     background: toastBgColor,
//     color: toastTextColor,
//     fontSize: toastFontSize,
//   },
//   position: toastPosition,
// });

// Default options
const defaultOptions = {
    duration: 4000,
    position: "top-center" as ToastPosition,
    style: {
        background: "#333",
        color: "#fff",
        padding: "12px 14px",
        borderRadius: "10px",
        fontSize: "12px",
        maxWidth: "500px",
        width: "200px",
        height: "35px"
    },
    iconTheme: {
        primary: "#4caf50",
        secondary: "#fff",
    },
};

// Hook to get global toast settings
export const useHotToast = () => {
    const {
        toastBgColor,
        toastTextColor,
        toastIconColor,
        toastFontSize,
        toastIcon,
        toastPosition,
    } = useTheme();

    // Generic toast function
    const showHotToast = (
        type: "success" | "error" | "loading" | "custom",
        message: string,
        options: CustomOptions = {}
    ) => {
        const { bgColor,
            textColor,
            iconColor,
            icon,
            ...rest
        } = options;

        // Merge global theme + local options
        const finalOptions: any = {
            ...defaultOptions,
            position: rest.position || toastPosition,
            style: {
                ...defaultOptions.style,
                fontSize: toastFontSize,
                background: toastBgColor,
                color: toastTextColor,
                ...rest.style,
                ...(bgColor ? { background: bgColor } : {}),
                ...(textColor ? { color: textColor } : {}),
                ...(options.width ? { width: options.width } : {}),
            },
            iconTheme: {
                ...defaultOptions.iconTheme,
                primary: toastIconColor,
                ...(iconColor ? { primary: iconColor } : {}),
            },
        };


        // Only pass valid ReactNode as icon
        const finalIcon = icon ?? toastIcon;
        if (finalIcon && (typeof finalIcon === "string" || React.isValidElement(finalIcon))) {
            finalOptions.icon = finalIcon;
        }

        // Show toast
        switch (type) {
            case "success":
                toast.success(message, finalOptions);
                break;
            case "error":
                toast.error(message, finalOptions);
                break;
            case "loading":
                toast.loading(message, finalOptions);
                break;
            case "custom":
                toast(message, finalOptions);
                break;
            default:
                toast(message, finalOptions);
        }
    };

    // Helpers
    const showHotSuccess = (message: string, options?: CustomOptions) =>
        showHotToast("success", message, options);

    const showHotError = (message: string, options?: CustomOptions) =>
        showHotToast("error", message, options);

    const showHotLoading = (message: string, options?: CustomOptions) =>
        showHotToast("loading", message, options);

    const showHotCustom = (message: string, options?: CustomOptions) =>
        showHotToast("custom", message, options);

    return { showHotToast, showHotSuccess, showHotError, showHotLoading, showHotCustom };
};