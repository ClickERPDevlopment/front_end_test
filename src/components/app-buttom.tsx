import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-success text-primary-foreground shadow hover:bg-primary/90 text-white",
        save: "bg-success text-primary-foreground shadow hover:bg-primary/90 w-24 text-white",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 border border-slate-300",
        delete:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 w-24",
        remove:
          "border border-input bg-background shadow-sm border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground border-slate-300",
        update:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground w-24",
        clear:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground w-24",
        search:
          "border border-input border-green-500 bg-background bg-green-200 shadow-sm hover:bg-green-100 hover:text-accent-foreground w-20 border-slate-300",
        add: "border border-input border-green-500 bg-background bg-green-200 shadow-sm hover:bg-green-100 hover:text-accent-foreground w-20 border-slate-300",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
function LoadingCircle({ variant }: { variant: string | null | undefined }) {
  // console.log("variant:", variant);
  const circleCss =
    variant === "search" ||
    variant === "outline" ||
    variant === "clear" ||
    variant === "secondary" ||
    variant === "update"
      ? "text-black"
      : "opacity-25";
  return (
    <div className="flex items-center justify-center">
      <svg
        className="animate-spin h-5 w-5 text-white mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className={circleCss}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isPending?: boolean;
  title?: string;
}

const AppButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, isPending = false, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    if (!isPending) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={isPending}
          {...props}
        />
      );
    } else {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={isPending}
          {...props}
        >
          <LoadingCircle variant={variant} />
        </Comp>
      );
    }
  }
);
AppButton.displayName = "Button";

export { AppButton, buttonVariants };
