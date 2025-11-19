import React from "react";

interface ReportHeaderProps {
  items: { label: string; value: string | number }[];
  columns?: string; // e.g., "grid-cols-2 md:grid-cols-4"
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ items, columns = "grid-cols-2 md:grid-cols-4" }) => {
  return (
    <div className={`px-2 grid gap-4 text-sm text-gray-700 ${columns}`}>
      {items.map((item, i) => (
        <p key={i}>
          <strong>{item.label}:</strong> {item.value}
        </p>
      ))}
    </div>
  );
};

export default ReportHeader;
