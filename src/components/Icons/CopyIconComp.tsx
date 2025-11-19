import React from 'react';

interface CopyIconCompProps {
  color?: string;
  className?: string;
  width?: number;
  height?: number;
  [key: string]: any;
}

const CopyIconComp: React.FC<CopyIconCompProps> = ({
  color = 'currentColor',
  className = '',
  width = 24,
  height = 24,
  ...props
}) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  );
};

export default CopyIconComp;
