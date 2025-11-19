import React from "react";

// Define the props for FeatherIcon component
interface FeatherIconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Type for the icon component
  className?: string; // Optional className
  [key: string]: any; // Allow any other props (like onClick, size, etc.)
}

const FeatherIcon: React.FC<FeatherIconProps> = ({ icon: Icon, className, ...props }) => {
  return <Icon className={`inline ${className}`} {...props} />;
};

export default FeatherIcon;
