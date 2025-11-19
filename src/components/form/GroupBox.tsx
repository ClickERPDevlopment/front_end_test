import React, { forwardRef } from "react";

interface GroupBoxProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const GroupBox = forwardRef<HTMLFieldSetElement, GroupBoxProps>(
  ({ title, children, className = "" }, ref) => {
    return (
      <fieldset
        ref={ref}
        className={`border border-gray-300 dark:border-gray-600 p-4 rounded-md ${className}`}
      >
        <legend className="text-sm font-medium text-gray-700 dark:text-gray-200 px-1">
          {title}
        </legend>
        {children}
      </fieldset>
    );
  }
);

export default GroupBox;
