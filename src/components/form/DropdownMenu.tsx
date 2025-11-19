import { ChevronDown, MoreVertical } from "react-feather";
import { MutableRefObject, useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useInteractions,
  useDismiss,
  Placement,
} from "@floating-ui/react";
import { useClickOutside } from "@/hooks/useClickOutside";

type DropdownMenuProps = {
  trigger: React.ReactNode;
  children: React.ReactNode | ((args: { closeDropdown: () => void }) => React.ReactNode);
  align?: "left" | "right";
  onClose?: () => void;
};

export const DropdownMenu = ({
  trigger,
  children,
  align = "left",
  onClose
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = () => {
    setIsOpen(false);
    onClose?.(); // call parent callback if provided
  };

  // Determine placement based on align prop
  const placement: Placement = align === "left" ? "bottom-start" : "bottom-end";

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [
      offset(8),
      flip({
        fallbackPlacements: ["top-start", "top-end"],
      }),
      shift({ padding: 5 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  // Add interaction hooks
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context),
  ]);

  //Use custom click outside hook
  useClickOutside(refs.floating, () => setIsOpen(false));

  return (
    <div className="relative inline-block">
      <button
        ref={refs.setReference}
        {...getReferenceProps({
          onClick: (e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          },
        })}
        className="inline-flex items-center"
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-50 w-48 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden"
        >
          {typeof children === "function" ? children({ closeDropdown }) : children}
        </div>
      )}
    </div>
  );
};

