import React, { useCallback, useMemo } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { formatLabel } from '../../utils/caseFormat';
import Button from '../form/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ResponsiveGridLayout = WidthProvider(Responsive);

// Define types for our grid item data
export interface GridItem {
  id: string;
  title: string;
  content: React.ReactNode;
  bgColor?: string;
  w?: number;
  h?: number;
  x?: number;
  y?: number;
}

interface ResponsiveGridProps {
  items: GridItem[];
  onLayoutChange?: (layout: Layout[]) => void;
  onResize?: (layout: Layout[], oldItem: Layout, newItem: Layout) => void;
  onResizeStop?: (layout: Layout[], oldItem: Layout, newItem: Layout) => void;
  onDelete: (id: number) => void;
  editable?: boolean;
}

const DynamicGridLayout: React.FC<ResponsiveGridProps> = ({
  items,
  onLayoutChange,
  onResize,
  onResizeStop,
  onDelete,
  editable = false
}) => {
  // Define default layouts for different breakpoints
  const defaultLayouts = useMemo(() => {
    const layouts: { [key: string]: Layout[] } = {};
    let currentX = 0;
    let currentY = 0;
    items.forEach((item) => {
      const itemWidth = item.w || 2;
      // Check if item fits in current row
      if (currentX + itemWidth > 12) {
        // Move to next row
        currentX = 0;
        currentY++;
      }
      const layoutItem: Layout = {
        i: item.id,
        x: item.x || currentX,
        y: item.y || currentY,
        w: item.w || 2,
        h: item.h || 2,
        minW: 1,
        maxW: 12,
        minH: 1,
        maxH: 4,
      };
      // Update current position for next item
      currentX += itemWidth;
      if (!layouts.lg) layouts.lg = [];
      layouts.lg.push(layoutItem);
    });

    return layouts;
  }, [items]);

  // Handle layout changes
  const handleLayoutChange = useCallback(
    (currentLayout: Layout[]) => {
      if (onLayoutChange) {
        onLayoutChange(currentLayout);
      }
    },
    [onLayoutChange]
  );

  const deleteDashboardItem = (itemId: number) => {
    
    onDelete(itemId)
  };

  return (
    <div className="p-4">
      <ResponsiveGridLayout
        className="layout"
        layouts={defaultLayouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        isDraggable={editable}
        isResizable={editable}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".drag-handle"
        onResize={onResize}
        onResizeStop={onResizeStop}
        resizeHandle={
          editable ? (
            <div
              className="absolute bottom-1 right-1 z-10 cursor-se-resize p-1 bg-white rounded shadow"
              style={{ pointerEvents: 'auto' }}
            >
              <svg viewBox="0 0 20 20" className="w-3 h-3 text-gray-700">
                <path
                  fill="currentColor"
                  d="M7 2v4h2v2h2v2h2v2h2v2h2v2h2v2h4v-4h-4v2h-2v-2h-2v-2h-2v-2h-2v-2h-2v-2h-2v4h-4z"
                />
              </svg>
            </div>
          ) : undefined
        }
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`rounded-lg shadow-md ${item.bgColor || 'bg-white'} p-4`}
          >


            <div className="flex items-center w-full">
              {/* Left: drag handle (auto width, grows to fill remaining space) */}
              <div className="drag-handle flex-grow flex justify-between items-center mb-2 pr-2 cursor-move">
                <h3 className="font-semibold text-lg text-left">{formatLabel(item.title)}</h3>
                {editable && (
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}
              </div>

              {/* Right: delete button (fixed width 50px) */}
              {editable && (
                <div className="w-[50px] flex justify-end mt-[-8px]">
                  <Button
                    onClick={() => deleteDashboardItem(Number(item.id))}
                    size="sm"
                    className="bg-transparent hover:bg-transparent p-1"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="text-red-600" />
                  </Button>
                </div>
              )}
            </div>


            <div className="">{item.content}</div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default DynamicGridLayout;