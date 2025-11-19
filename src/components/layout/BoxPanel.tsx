import React, { ReactNode } from 'react';

interface BoxPanelProps {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const BoxPanel: React.FC<BoxPanelProps> = ({ title, children, footer, className = '' }) => {
  return (
    <div className={`w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-5 transition-all duration-300 ${className}`}>
      {title && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
      )}
      <div className="text-gray-700 space-y-2">
        {children}
      </div>
      {footer && (
        <div className="mt-4 border-t pt-2 text-right">
          {footer}
        </div>
      )}
    </div>
  );
};

export default BoxPanel;
