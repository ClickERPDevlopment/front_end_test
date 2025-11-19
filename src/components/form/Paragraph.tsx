import { ReactNode } from "react";
import clsx from "clsx";

type ParagraphProps = {
  children: ReactNode;
  className?: string;
};

const Paragraph = ({ children, className = "" }: ParagraphProps) => {
  return (
    <p className={clsx("text-base text-gray-700 leading-relaxed", className)}>
      {children}
    </p>
  );
};

export default Paragraph;
