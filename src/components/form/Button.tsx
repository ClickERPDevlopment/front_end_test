import { forwardRef, MouseEventHandler, ReactNode, Ref, } from "react";
import { Link } from "react-router-dom";

type ButtonVariant = "filled" | "outlined" | "flat";
type ButtonType = "submit" | "button" | "reset";
type ButtonSize = "sm" | "md" | "lg" | "action" | "custom";

interface ButtonProps {
    type?: ButtonType;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    children: ReactNode;
    to?: string;
    href?: string;
    targetBlank?: boolean;
}

// Note: Use forwardRef to expose the ref
const Button = forwardRef<
    HTMLButtonElement | HTMLAnchorElement,
    ButtonProps
>(function Button(
    {
        type = "button",
        variant = "filled",
        size = "md",
        className = "",
        disabled = false,
        onClick,
        children,
        to,
        href,
        targetBlank = false
    },
    ref: Ref<HTMLButtonElement | HTMLAnchorElement>
) {
    const baseClasses =
        " items-center rounded transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap";

    const variantClasses: Record<ButtonVariant, string> = {
        filled: "text-white",
        outlined: "border border-blue-500 text-blue-500",
        flat: "text-blue-500 hover:underline",
    };
    const sizeClasses: Record<ButtonSize, string> = {
        sm: "text-sm px-3 py-1 gap-1",
        md: "text-md px-4 py-1 gap-2",
        lg: "text-lg px-6 py-3 gap-3",
        action: "text-[15px] px-2 py-1",
        custom: "px-0.5 gap-1",
    };

    const classList = className.trim().split(/\s+/);
    const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
    const hasBgClass = classList.some((cls) => cls.startsWith("bg-") || cls.startsWith("bg-["));

    if (to) {
        return (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <Link
                to={to}
                className={`${!hasBgClass && variant !== "outlined" ? "button-filled cursor-pointer" : ""} ${combinedClassName}`}
                onClick={onClick}
                ref={ref as any}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <Link
                target={targetBlank ? "_blank" : undefined}
                to={href}
                className={`${!hasBgClass && variant !== "outlined" ? "button-filled cursor-pointer" : ""} ${className}`}
                onClick={onClick}
                ref={ref as any} // casting if necessary
            >
                {children}
            </Link>
        );
    }

    return (
        <div>
            <button
                type={type}
                disabled={disabled}
                onClick={onClick}
                className={`
                    ${!hasBgClass && variant !== "outlined" ? "button-filled cursor-pointer" : ""} 
                    ${combinedClassName} ${disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                ref={ref as Ref<HTMLButtonElement>}
            >
                {children}
            </button>
        </div>
    );
});

export default Button;
