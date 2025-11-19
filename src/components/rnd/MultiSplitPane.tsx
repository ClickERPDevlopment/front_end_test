import React, { useRef, useState } from 'react';

type MultiSplitPaneProps = {
  children: React.ReactNode[];
  direction?: 'horizontal' | 'vertical';
  min?: number;
};

const RNDMultiSplitPane: React.FC<MultiSplitPaneProps> = ({
  children,
  direction = 'horizontal',
  min = 100,
}) => {
  const isHorizontal = direction === 'horizontal';
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [sizes, setSizes] = useState<number[]>(
    Array(children.length).fill(1 / children.length)
  );

  const draggingIndex = useRef<number | null>(null);

  const onMouseDown = (index: number) => {
    draggingIndex.current = index;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseUp = () => {
    draggingIndex.current = null;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (draggingIndex.current === null || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const totalSize = isHorizontal ? rect.width : rect.height;
    const offset = isHorizontal ? e.clientX - rect.left : e.clientY - rect.top;

    const prevSize = sizes[draggingIndex.current] * totalSize;
    const nextSize = sizes[draggingIndex.current + 1] * totalSize;

    const newPrevSize = Math.max(min, offset - sizes.slice(0, draggingIndex.current).reduce((acc, s) => acc + s * totalSize, 0));
    const newNextSize = prevSize + nextSize - newPrevSize;

    if (newNextSize < min) return;

    const newSizes = [...sizes];
    newSizes[draggingIndex.current] = newPrevSize / totalSize;
    newSizes[draggingIndex.current + 1] = newNextSize / totalSize;

    setSizes(newSizes);
  };

  return (
    <div
      ref={containerRef}
      className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'} w-full h-full`}
    >
      {children.map((child, i) => (
        <React.Fragment key={i}>
          <div
            style={{
              [isHorizontal ? 'width' : 'height']: `${sizes[i] * 100}%`,
            }}
            className="overflow-hidden"
          >
            {child}
          </div>
          {i < children.length - 1 && (
            <div
              className={`${
                isHorizontal ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize'
              } bg-gray-300`}
              onMouseDown={() => onMouseDown(i)}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default RNDMultiSplitPane;
