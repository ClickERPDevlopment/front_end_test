import { AnimatePresence, motion } from "framer-motion";
import React, { forwardRef, ReactElement, Ref } from "react";

type FormFieldProps = {
    label?: string;
    id: string;
    children: ReactElement<any> & { ref?: Ref<any> };
    variant?: "inline" | "block";
    required?: boolean;
    labelWidth?: string;
    labelFontSize?: string;
    labelBold?: boolean;
    className?: string;         // For the outer container
    labelClassName?: string;    // For additional label styling
    error?: string;
};


export const FormField = forwardRef<
    HTMLInputElement | HTMLSelectElement,
    FormFieldProps
>(
    (
        {
            label,
            id,
            children,
            variant = "block",
            required = false,
            labelWidth = "w-20",
            labelFontSize = "",
            labelBold = false,
            className = "",
            labelClassName = "",
            error,
        },
        ref
    ) => {
        "use memo";

        const containerClass = [
            variant === "inline" ? "flex items-center gap-4 mb-1" : "flex flex-col gap-1 mb-1",
            className
        ].join(" ");

        const labelClass = [
            variant === "inline" ? labelWidth : "",
            labelFontSize,
            labelBold ? "font-bold" : "",
            labelClassName
        ].join(" ");

        return (
            <div className={containerClass}>
                <label htmlFor={id} className={labelClass}>
                    {label}
                    {required && (
                        <span className="text-red-500 dark:text-red-400 ml-1">*</span>
                    )}
                </label>

                {/* Wrap input + error in a column to keep error below input */}
                <div className={variant === "inline" ? "flex flex-col flex-1" : ""}>
                    {React.cloneElement(children, { ref })}

                    <AnimatePresence>
                        {error && (
                            <motion.p
                                key="error-msg"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                                className="text-red-600 text-12-8 mt-1"
                                role="alert"
                                aria-live="assertive"
                            >
                                {error}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        );
    }
);

FormField.displayName = "FormField";
