import React, { FC, ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

type WidthClass =
    | "max-w-xs"
    | "max-w-sm"
    | "max-w-md"
    | "max-w-lg"
    | "max-w-xl"
    | "max-w-2xl"
    | "max-w-3xl"
    | "max-w-4xl"
    | "max-w-5xl"
    | "max-w-6xl"
    | "max-w-7xl"
    | "max-w-full";

type HeightClass =
    | "h-auto"
    | "h-1/4"
    | "h-1/2"
    | "h-3/4"
    | "h-full"
    | "max-h-[80vh]"
    | "max-h-screen"
    | "min-h-[200px]";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    widthClass?: WidthClass;
    heightClass?: HeightClass;
    title?: string;
    showCloseButton?: boolean;
    footer?: ReactNode;
}

const Modal: FC<ModalProps> = ({
    isOpen,
    onClose,
    title = "Modal Title",
    children,
    widthClass = "max-w-md",
    heightClass = "max-h-[80vh]",
    showCloseButton = true,
    footer,
}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkMode(prefersDarkMode);

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const themeListener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);

        mediaQuery.addEventListener("change", themeListener);
        return () => mediaQuery.removeEventListener("change", themeListener);
    }, []);

    const overlayClass = isDarkMode ? "bg-black/80" : "bg-black/50";
    const containerClass = "bg-white text-black";

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={`fixed inset-0 z-999 flex items-center justify-center ${overlayClass}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <motion.div
                        className={`rounded-lg shadow-lg w-full ${widthClass} ${heightClass} ${containerClass}`}
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-2 border-b border-gray-300">
                            <h2 className="text-xl font-semibold">{title}</h2>
                            {showCloseButton && (
                                <button onClick={onClose} className="text-2xl text-gray-600 hover:text-gray-800">
                                    &times;
                                </button>
                            )}
                        </div>

                        {/* Body */}
                        <div className="p-4">{children}</div>

                        {/* Footer */}
                        <div className="flex justify-end p-4 border-t border-gray-300">
                            {footer ? (
                                footer
                            ) : (
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Close
                                </button>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root") as HTMLElement);
};

export default Modal;
