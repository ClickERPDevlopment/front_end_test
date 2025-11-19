import React, { useState } from "react";

type Size = "xsmall" | "small" | "medium" | "large"; 
type Color = "blue" | "green" | "red";

interface SwitcherProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: Size;
  disabled?: boolean;
  label?: string;
  color?: Color;
}

const SIZE_CLASSES: Record<Size, string> = {
  xsmall: "w-7 h-3.5",   //new size: 28px wide, 14px tall
  small: "w-10 h-5",
  medium: "w-14 h-7",
  large: "w-20 h-10",
};

const THUMB_SIZE_CLASSES: Record<Size, string> = {
  xsmall: "w-[14px] h-[14px]",
  small: "w-[20px] h-[20px]",
  medium: "w-[28px] h-[28px]",
  large: "w-[40px] h-[40px]",
};

const COLOR_CLASSES: Record<Color, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-500",
};

const TRANSITION_CLASSES = "transition-all duration-300 ease-in-out";

const Switcher: React.FC<SwitcherProps> = ({
  checked = false,
  onChange,
  size = "medium",
  disabled = false,
  label,
  color = "blue",
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  const trackClasses = [
    "relative inline-block rounded-full",
    SIZE_CLASSES[size],
    TRANSITION_CLASSES,
    disabled ? "opacity-50" : "",
    isChecked ? COLOR_CLASSES[color] : "bg-gray-300",
  ].join(" ");

  const thumbClasses = [
    "absolute top-0 left-0 rounded-full bg-white shadow-md",
    THUMB_SIZE_CLASSES[size],
    TRANSITION_CLASSES,
    isChecked ? "translate-x-full" : "translate-x-0",
  ].join(" ");

  return (
    <label
      className={`inline-flex items-center space-x-2 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        disabled={disabled}
        className="hidden"
        aria-label={label || "Toggle switch"}
      />

      <div className={trackClasses}>
        <div className={thumbClasses} />
      </div>

      {label && <span className="text-blue">{label}</span>}
    </label>
  );
};

export default Switcher;
