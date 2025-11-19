import React from 'react';

// Interface for Icon Component Props
interface IconCompProps {
    color?: string; // Color of the icon (supports any CSS color value)
    className?: string; // Additional custom CSS class
    width?: number;
    height?: number;
    [key: string]: any;// Allow any other props (like onClick, size, etc.)
}

const IconComp: React.FC<IconCompProps> = ({
    color = 'text-gray-500',
    className = '',
    height = 24,
    width = 24,
    ...props 
}) => {
    return (
        <svg  {...props} xmlns="http://www.w3.org/2000/svg" className={`${className}`} width={width} height={height} viewBox="0 0 24 24" strokeWidth="2" stroke={`${color}`} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <desc>Download more icon variants from https://tabler-icons.io/i/align-left</desc>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="14" y2="12" />
            <line x1="4" y1="18" x2="18" y2="18" />
        </svg>
    );
};

export default IconComp;
