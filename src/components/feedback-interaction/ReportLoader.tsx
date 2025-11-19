import React from "react";
import { motion } from "framer-motion";

// SkeletonRow component
const SkeletonRow: React.FC = () => {
  return (
    <motion.div
      className="flex space-x-4 p-4 border-b border-gray-200"
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.8,
      }}
    >
      <div className="w-12 h-6 bg-gray-300 rounded"></div>
      <div className="flex-1 h-6 bg-gray-300 rounded"></div>
      <div className="w-24 h-6 bg-gray-300 rounded"></div>
      <div className="w-20 h-6 bg-gray-300 rounded"></div>
    </motion.div>
  );
};

// SkeletonHeader component
const SkeletonHeader: React.FC = () => (
  <div className="flex space-x-4 p-4 border-b border-gray-300">
    <div className="w-12 h-6 bg-gray-300 rounded"></div>
    <div className="flex-1 h-6 bg-gray-300 rounded"></div>
    <div className="w-24 h-6 bg-gray-300 rounded"></div>
    <div className="w-20 h-6 bg-gray-300 rounded"></div>
  </div>
);

// Main ReportSkeleton component
interface ReportSkeletonProps {
  rows?: number;
}

const ReportLoader: React.FC<ReportSkeletonProps> = ({ rows = 5 }) => {
  return (
    <div className="w-full rounded-md shadow-sm">
      <SkeletonHeader />
      {Array.from({ length: rows }).map((_, idx) => (
        <SkeletonRow key={idx} />
      ))}
    </div>
  );
};

export default ReportLoader;
