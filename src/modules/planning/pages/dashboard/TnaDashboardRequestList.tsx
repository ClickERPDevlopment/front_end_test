import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { List } from 'react-virtualized';
import DynamicTooltipText from '@/components/data-display/DynamicTooltipText';
import { RootState } from '@/app/store';
import { useLocation } from 'react-router-dom';

const TnaDashboardRequestList = () => {
  const { pendingRequests, pendingRequestLoading  } = useSelector((state: RootState) => state.tna);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

   // Base cell styles
  const cellClass = "px-3 py-2 border border-gray-200 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-center";
  const cellClass2 = "px-3 py-2  overflow-hidden text-ellipsis whitespace-nowrap text-sm text-center";

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        // Screenwise height calculation
        const screenHeight = window.innerHeight;
        const containerTop = containerRef.current.getBoundingClientRect().top;

        // height = screen height - top position - bottom gap
        const calculatedHeight = screenHeight - containerTop - 30;

        setWidth(containerRef.current.clientWidth - 20);
        setHeight(calculatedHeight)
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const rowRenderer = ({ index, key, style }: { index: number; key: string; style: React.CSSProperties }) => {
    const row = pendingRequests[index];
    return (
      <div
        key={key}
        style={style}
        className={`grid grid-cols-6 text-sm h-[30px]
          transition-colors 
          odd:bg-gray-100 even:bg-gray-200
            border-b ${'border-black-50'}`  
        }
      >
        <div className={cellClass}>{row.jobNumber}</div>
        <div className={cellClass}>{row.buyerName}</div>
        <div className={cellClass}>{row.styleNos}</div>
        <div className={cellClass}>{row.aggregatedTasks}</div>
        <div className={cellClass}>{row.count}</div>
       
        <div className={cellClass}>
          <button className="px-2 py-0.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700/80 transition text-xs">.</button>
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-black-50">
      <div ref={containerRef} className="rounded-2xl border border-black-50">
        {/* Header */}
        <div className="grid grid-cols-6 bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-sm uppercase sticky top-0 z-20 shadow-md">
         
          <div className={cellClass2}>Job Number</div>
          <div className={cellClass2}>Buyer</div>
          <div className={cellClass2}>Style No.</div>
          <div className={cellClass2}>Task Name</div>
          <div className={cellClass2}>Count</div>
          <div className={cellClass2}>Action</div>
        </div>

        {/* Virtualized List */}
        {!pendingRequestLoading && width > 0 && (
          <div style={{ height: height+'px', overflow: 'hidden' }}>
            <List
              height={height}
              rowCount={pendingRequests.length}
              rowHeight={30}
              rowRenderer={rowRenderer}
              width={width}
              style={{ overflowX: 'hidden' }}
            />
          </div>
        )}
        {
          pendingRequestLoading && (
            <div className="grid grid-cols-6 h-[40px] place-items-center">
              <div className="col-span-17 text-center text-black animate-pulse">
                Loading...
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default TnaDashboardRequestList;
