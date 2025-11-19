import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { List } from 'react-virtualized';
import DynamicTooltipText from '@/components/data-display/DynamicTooltipText';
import { RootState } from '@/app/store';
import { useLocation } from 'react-router-dom';

const TnaDashboardCriticalJobList = () => {
  const { criticalPendingJobs, pendingJobLoading, } = useSelector((state: RootState) => state.tna);
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
    const row = criticalPendingJobs[index];
    return (
      <div
        key={key}
        style={style}
        className={`grid grid-cols-8 text-sm h-[40px]
          transition-colors 
          ${row.delay < 0 ? 'bg-rose-500 text-white' : ''}
           ${row.isAlert === 1 ? 'bg-yellow-600 text-white' : ''} 
           ${row.isAlert === 2 ? 'bg-gray-300 ' : ''}
            border-b ${row.delay < 0 || row.isAlert === 1 ? 'border-white-50' : 'border-black-50'}`
        }
      >
        <div className={cellClass}>{row.prettyPoShipDate}</div>
        <div className={cellClass}>
          <DynamicTooltipText text={row.buyerName} maxLength={10} />
        </div>
        <div className={cellClass}>{row.jobNumber}</div>
        <div className={cellClass}>
          <DynamicTooltipText text={row.styleNos} maxLength={10} />
        </div>
        <div className={cellClass}>{row.taskName}</div>
        <div className={cellClass}>{row.prettyPrevPlanDate}</div>
        <div className={cellClass}>{row.prettyAskingDate}</div>
        <div className={cellClass}>{''}</div>
        
      </div>
    );
  };

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-black-50">
      <div ref={containerRef} className="rounded-2xl border border-black-50">
        {/* Header */}
        <div className="grid grid-cols-8 bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-sm uppercase sticky top-0 z-20 shadow-md">
          <div className={cellClass2}>Del. Month</div>
          <div className={cellClass2}>Buyer</div>
          <div className={cellClass2}>Job Number</div>
          <div className={cellClass2}>Style No.</div>
          <div className={cellClass2}>Task Name</div>
          <div className={cellClass2}>Plan Date</div>
          <div className={cellClass2}>Asking (Dt)</div>
          <div className={cellClass2}>Asking (Days)</div>
        </div>

        {/* Virtualized List */}
        {!pendingJobLoading && width > 0 && (
          <div style={{ height: height + 'px', overflow: 'hidden' }}>
            <List
              height={height}
              rowCount={criticalPendingJobs.length}
              rowHeight={40}
              rowRenderer={rowRenderer}
              width={width}
              style={{ overflowX: 'hidden' }}
            />
          </div>
        )}
        {
          pendingJobLoading && (
            <div className="grid grid-cols-8 h-[40px] place-items-center">
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

export default TnaDashboardCriticalJobList;
