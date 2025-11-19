import { ReactNode } from "react";
import clsx from "clsx";

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: ReactNode;
};

const headingStyles = {
  1: "text-3xl font-bold",
  2: "text-2xl font-semibold",
  3: "text-xl font-medium",
  4: "text-lg font-medium",
  5: "text-base font-medium",
  6: "text-sm font-medium",
};

const Heading = ({ level = 1, className = "", children }: HeadingProps) => {
  const Tag = `h${level}` as const;
  return (
    <Tag className={clsx(headingStyles[level], className)}>
      {children}
    </Tag>
  );
};

export default Heading;