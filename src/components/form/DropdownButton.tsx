import  {
  forwardRef,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ChevronDown } from "react-feather";

type DropdownButtonProps = {
  label?: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "text-sm px-2 py-1",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-3",
};

export const DropdownButton = forwardRef<
  HTMLButtonElement,
  DropdownButtonProps
>(({ label = "Options", children, icon, className = "", size = "md" }, ref) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        ref={ref}
        onClick={(e) => {
          e.stopPropagation(); // prevent auto-close immediately
          setOpen((prev) => !prev);
        }}
        className={`inline-flex items-center gap-2 border rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 ${sizeClasses[size]} ${className}`}
      >
        {icon}
        {label}
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
          {children}
        </div>
      )}
    </div>
  );
});

DropdownButton.displayName = "DropdownButton";
