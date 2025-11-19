// import { RootState } from '@/app/store';
// import DynamicTooltipText from '@/components/DynamicTooltipText';
// import React, { useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { List } from 'react-virtualized';

// const TnaDashboardJobList = () => {
//   const { pendingJobs, pendingJobLoading, } = useSelector((state: RootState) => state.tna);
//   const [width, setWidth] = useState(0);
//   const [height, setHeight] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const listRef = useRef<List>(null);

//   const cellClass = "px-2 py-1 border-l border-r border-b overflow-hidden break-words " +
//                   "text-ellipsis" +
//                   " line-clamp-2";


//   useEffect(() => {
//   if (!containerRef.current) return;

//   const updateSize = () => {
//     if (containerRef.current) {
//       const screenHeight = window.innerHeight;
//       const containerTop = containerRef.current.getBoundingClientRect().top;
//       const calculatedHeight = screenHeight - containerTop - 30;

//       setWidth(containerRef.current.clientWidth - 20);
//       setHeight(calculatedHeight);
//     }
//   };

//   // Observe container size changes (works when sidebar toggles)
//   const observer = new ResizeObserver(() => {
//     updateSize();
//   });

//   observer.observe(containerRef.current);
//   updateSize();

//   return () => observer.disconnect();
// }, []);

//   useEffect(()=>{
// console.log(width)
//   },[width]);


// useEffect(() => {
//   if (listRef.current) {
//     listRef.current.recomputeRowHeights();
//     listRef.current.forceUpdateGrid();
//   }
// }, [width]);


//   const rowRenderer = ({ index, key, style }: { index: number; key: string; style: React.CSSProperties }) => {
//     const row = pendingJobs[index];
//     return (
//       <div
//         key={key}
//         style={style}
//         className={`grid grid-cols-17 text-sm h-[40px]
//           transition-colors 
//           ${row.delay < 0 ? 'bg-red-800 text-white' : ''}
//            ${row.isAlert === 1 ? 'bg-yellow-600 text-white' : ''} 
//            ${row.isAlert === 2 ? 'bg-gray-300 ' : ''}
//             border-b ${row.delay < 0 || row.isAlert === 1 ? 'border-white-50' : 'border-black-50'}`
//         }
//       >
//         <div className={`px-2 py-1 text-center border-l border-r border-b ${row.delay < 0 || row.isAlert === 1 ? 'border-white-50' : 'border-black-50'}`}>
//             <button className="px-2 py-0.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700/80 transition text-xs">{row.commentCount}</button>
//           </div>
//         <div className={`px-2 py-1 text-center border-l border-r border-b ${row.delay < 0 || row.isAlert === 1 ? 'border-white-50' : 'border-black-50'}`}>{row.prettyPoShipDate}</div>
//         <div className={`px-2 py-1 text-center font-medium  border-l border-r border-b ${row.delay < 0 || row.isAlert === 1 ? 'border-white-50' : 'border-black-50'}`}>
//           <DynamicTooltipText text={row.buyerName} maxLength={5} />
//         </div>
//         <div className={`col-span-2 px-2 py-1 text-center font-semibold border-l border-r border-b ${row.delay < 0 || row.isAlert === 1 ? 'border-white-50' : 'border-black-50'}`}> <div className="whitespace-nowrap overflow-hidden text-ellipsis" title={row.jobNumber}>
//   {row.jobNumber}
// </div></div>
//         <div className={`px-2 py-1 text-center border-l border-r border-b ${row.delay < 0 || row.isAlert === 1 ? 'border-white-50' : 'border-black-50'}`}>{row.sessionNo}</div>
//         <div className={`px-2 py-1 text-center border-l border-r border-b ${row.delay < 0 || row.isAlert === 1 ? 'border-white-50' : 'border-black-50'}`}>
//           {/* <DynamicTooltipText text={row.styleNos} maxLength={5} /> */}
//           <div className="whitespace-nowrap overflow-hidden text-ellipsis" title={row.styleNos}>
//   {row.jobNumber}
// </div>
//         </div>
//         <div className={`col-span-2 px-2 py-1 text-center font-medium border-l border-r border-b ${row.delay < 0 || row.isAlert === 1 ? 'border-white-50' : 'border-black-50'}`}>{row.taskName}</div>
//         <div className={`px-2 py-1 text-center border-l border-r border-b ${row.delay < 0 || row.isAlert === 1 ? 'border-white-50' : 'border-black-50'}`}>{row.prettyPrevPlanDate}</div>
//         <div className={`px-2 py-1 text-center border-l border-r border-b ${row.delay < 0 || row.isAlert === 1 ? 'border-white-50' : 'border-black-50'}`}>{row.delay}</div>
//         <div className={`px-2 py-1 text-center border-l border-r border-b ${row.delay < 0 || row.isAlert === 1 ? 'border-white-50' : 'border-black-50'}`}>{row.prettyAskingDate}</div>
//         <div className={`px-2 py-1 text-center border-l border-r border-b ${row.delay < 0 || row.isAlert === 1 ? 'border-white-50' : 'border-black-50'}`}>{row.changeFrequency}</div>
//         <div className={`px-2 py-1 text-center text-gray-400 border-l border-r border-b ${row.delay < 0 || row.isAlert === 1 ? 'border-white-50' : 'border-black-50'}`}>{''}</div>
//         <div className={`px-2 py-1 text-center border-l border-r border-b ${row.delay < 0 || row.isAlert === 1 ? 'border-white-50' : 'border-black-50'}`}>{row.changeBy}</div>
//         <div className={`px-2 py-1 text-center border-l border-r border-b ${row.delay < 0 || row.isAlert === 1 ? 'border-white-50' : 'border-black-50'}`}>
//           <span className={`inline-block w-4 h-4 rounded-full 
//             ${row.isApproved === 0 ? 'bg-red-500' : row.isDone === 1 ? 'bg-green-500' : 'bg-yellow-400'}`} />
//         </div>
//         <div className={`px-2 py-1 text-center border-l border-r border-b ${row.delay < 0 || row.isAlert === 1 ? 'border-white-50' : 'border-black-50'}`}>
//           <button className="px-2 py-0.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700/80 transition text-xs">X</button>
//           <button className="px-2 py-0.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700/80 transition text-xs">Y</button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="overflow-x-auto rounded-2xl shadow-lg border border-black-50">
//       <div ref={containerRef} className="rounded-2xl border border-black-50">
//         {/* Header */}
//         <div className="grid grid-cols-17 bg-gradient-to-r from-teal-700 to-teal-900 text-white text-xs uppercase sticky top-0 z-20 shadow-md">
//           <div className="px-2 py-1 text-center">Comt.</div>
//           <div className="px-2 py-1 text-center ">Del. Month</div>
//           <div className="px-2 py-1 text-center">Buyer</div>
//           <div className="col-span-2 px-2 py-1 text-center">Job Number</div>
//           <div className=" px-2 py-1 text-center">Season</div>
//           <div className="px-2 py-1 text-center">Style No.</div>
//           <div className="col-span-2 px-2 py-1 text-center">Task Name</div>
//           <div className="px-2 py-1 text-center">Plan Date</div>
//           <div className="px-2 py-1 text-center">D2G</div>
//           <div className="px-2 py-1 text-center">Asking (Dt)</div>
//           <div className="px-2 py-1 text-center">C.F.</div>
//           <div className="px-2 py-1 text-center">Notes</div>
//           <div className="px-2 py-1 text-center">Change By</div>
//           <div className="px-2 py-1 text-center">Status</div>
//           <div className="px-2 py-1 text-center">Action</div>
//         </div>

//         {/* Virtualized List */}
//         {!pendingJobLoading && width > 0 && (
//           <div style={{ height: height + 'px', overflow: 'hidden' }}>
//             <List
//               ref={listRef}
//               height={height}
//               rowCount={pendingJobs.length}
//               rowHeight={30}
//               rowRenderer={rowRenderer}
//               width={width}
//               style={{ overflowX: 'hidden' }}
//             />
//           </div>
//         )}
//         {
//           pendingJobLoading && (
//             <div className="grid grid-cols-17 h-[40px] place-items-center">
//               <div className="col-span-17 text-center text-black animate-pulse">
//                 Loading...
//               </div>
//             </div>
//           )
//         }
//       </div>
//     </div>
//   );
// };

// export default TnaDashboardJobList;


// import { RootState } from '@/app/store';
// import DynamicTooltipText from '@/components/DynamicTooltipText';
// import React, { useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { List } from 'react-virtualized';

// const TnaDashboardJobList = () => {
//   const { pendingJobs, pendingJobLoading } = useSelector((state: RootState) => state.tna);
//   const [width, setWidth] = useState(0);
//   const [height, setHeight] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const listRef = useRef<List>(null);

//   // Centralized cell class for multi-line truncation
//   // const cellClass = "px-2 py-1 border-l border-r border-b overflow-hidden break-words line-clamp-2 text-xs text-center";
//     const cellClass ="px-2 py-1 border-l border-r border-b overflow-hidden text-ellipsis whitespace-nowrap text-center";


//   useEffect(() => {
//     if (!containerRef.current) return;

//     const updateSize = () => {
//       const containerTop = containerRef.current!.getBoundingClientRect().top;
//       const calculatedHeight = window.innerHeight - containerTop - 30;

//       setWidth(containerRef.current!.clientWidth - 20);
//       setHeight(calculatedHeight);
//     };

//     const observer = new ResizeObserver(() => updateSize());
//     observer.observe(containerRef.current);
//     updateSize();

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (listRef.current) {
//       listRef.current.recomputeRowHeights();
//       listRef.current.forceUpdateGrid();
//     }
//   }, [width]);

//   const rowRenderer = ({ index, key, style }: { index: number; key: string; style: React.CSSProperties }) => {
//     const row = pendingJobs[index];

//     const rowBgClass =
//       row.delay < 0
//         ? "bg-red-800 text-white"
//         : row.isAlert === 1
//         ? "bg-yellow-600 text-white"
//         : row.isAlert === 2
//         ? "bg-gray-300"
//         : "";

//     const borderClass = row.delay < 0 || row.isAlert === 1 ? "border-white-50" : "border-black-50";

//     return (
//       <div
//         key={key}
//         style={style}
//         className={`grid grid-cols-17 h-[40px] transition-colors ${rowBgClass} border-b ${borderClass}`}
//       >
//         <div className={cellClass}>
//           <button className="px-2 py-0.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700/80 transition">
//             {row.commentCount}
//           </button>
//         </div>
//         <div className={cellClass}>{row.prettyPoShipDate}</div>
//         <div className={cellClass}>
//           <DynamicTooltipText text={row.buyerName} maxLength={5} />
//         </div>
//         <div className={`${cellClass} col-span-2`} title={row.jobNumber}>
//           {row.jobNumber}
//         </div>
//         <div className={cellClass}>{row.sessionNo}</div>
//         <div className={cellClass} title={row.styleNos}>
//           {row.styleNos}
//         </div>
//         <div className={`${cellClass} col-span-2`}>{row.taskName}</div>
//         <div className={cellClass}>{row.prettyPrevPlanDate}</div>
//         <div className={cellClass}>{row.delay}</div>
//         <div className={cellClass}>{row.prettyAskingDate}</div>
//         <div className={cellClass}>{row.changeFrequency}</div>
//         <div className={`${cellClass} text-gray-400`}>{""}</div>
//         <div className={cellClass}>{row.changeBy}</div>
//         <div className={cellClass}>
//           <span
//             className={`inline-block w-4 h-4 rounded-full ${
//               row.isApproved === 0 ? "bg-red-500" : row.isDone === 1 ? "bg-green-500" : "bg-yellow-400"
//             }`}
//           />
//         </div>
//         <div className={cellClass}>
//           <button className="px-2 py-0.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700/80 transition text-xs">
//             X
//           </button>
//           <button className="px-2 py-0.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700/80 transition text-xs">
//             Y
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="overflow-x-auto rounded-2xl shadow-lg border border-black-50">
//       <div ref={containerRef} className="rounded-2xl border border-black-50">
//         {/* Header */}
//         <div className="grid grid-cols-17 bg-gradient-to-r from-teal-700 to-teal-900 text-white  uppercase sticky top-0 z-20 shadow-md">
//           <div className="px-2 py-1 text-center">Comt.</div>
//           <div className="px-2 py-1 text-center">Del. Month</div>
//           <div className="px-2 py-1 text-center">Buyer</div>
//           <div className="col-span-2 px-2 py-1 text-center">Job Number</div>
//           <div className="px-2 py-1 text-center">Season</div>
//           <div className="px-2 py-1 text-center">Style No.</div>
//           <div className="col-span-2 px-2 py-1 text-center">Task Name</div>
//           <div className="px-2 py-1 text-center">Plan Date</div>
//           <div className="px-2 py-1 text-center">D2G</div>
//           <div className="px-2 py-1 text-center">Asking (Dt)</div>
//           <div className="px-2 py-1 text-center">C.F.</div>
//           <div className="px-2 py-1 text-center">Notes</div>
//           <div className="px-2 py-1 text-center">Change By</div>
//           <div className="px-2 py-1 text-center">Status</div>
//           <div className="px-2 py-1 text-center">Action</div>
//         </div>

//         {/* Virtualized List */}
//         {!pendingJobLoading && width > 0 && (
//           <div style={{ height: height + "px", overflow: "hidden" }}>
//             <List
//               ref={listRef}
//               height={height}
//               rowCount={pendingJobs.length}
//               rowHeight={30}
//               rowRenderer={rowRenderer}
//               width={width}
//               style={{ overflowX: "hidden" }}
//             />
//           </div>
//         )}
//         {pendingJobLoading && (
//           <div className="grid grid-cols-17 h-[40px] place-items-center">
//             <div className="col-span-17 text-center text-black animate-pulse">Loading...</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TnaDashboardJobList;

// import { RootState } from '@/app/store';
// import DynamicTooltipText from '@/components/DynamicTooltipText';
// import { useTheme } from '@/hooks/useTheme';
// import React, { useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { List } from 'react-virtualized';

// const TnaDashboardJobList = () => {
//   const { pendingJobs, pendingJobLoading } = useSelector((state: RootState) => state.tna);
//   const [width, setWidth] = useState(0);
//   const [height, setHeight] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const listRef = useRef<List>(null);
//   const { screenSize } = useTheme();

//   // Modern cell style
//   const cellClass =
//     "px-3 py-2 border border-gray-200 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-center";

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const updateSize = () => {
//       const containerTop = containerRef.current!.getBoundingClientRect().top;
//       const calculatedHeight = window.innerHeight - containerTop - 40; // safe bottom
//       setWidth(containerRef.current!.clientWidth);
//       setHeight(calculatedHeight);
//     };

//     const observer = new ResizeObserver(updateSize);
//     observer.observe(containerRef.current);
//     updateSize();

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (listRef.current) {
//       listRef.current.recomputeRowHeights();
//       listRef.current.forceUpdateGrid();
//     }
//   }, [width]);

//   const rowRenderer = ({ index, key, style }: { index: number; key: string; style: React.CSSProperties }) => {
//     const row = pendingJobs[index];

//     // Modern colors for rows
//     const rowBgClass =
//       row.delay < 0
//         ? "bg-rose-500 text-white"
//         : row.isAlert === 1
//         ? "bg-amber-400 text-gray-900"
//         : row.isAlert === 2
//         ? "bg-slate-100 text-gray-800"
//         : "bg-white";

//     return (
//       <div key={key} style={style} className={`grid grid-cols-17 h-12 ${rowBgClass}`}>
//         <div className={cellClass}>
//           <button className="px-2 py-1 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition">
//             {row.commentCount}
//           </button>
//         </div>
//         <div className={cellClass}>{row.prettyPoShipDate}</div>
//         <div className={cellClass}>
//           <DynamicTooltipText text={row.buyerName} maxLength={5} />
//         </div>
//         <div className={`${cellClass} col-span-2`} title={row.jobNumber}>{row.jobNumber}</div>
//         <div className={cellClass}>{row.sessionNo}</div>
//         <div className={cellClass} title={row.styleNos}>{row.styleNos}</div>
//         <div className={`${cellClass} col-span-2`}>{row.taskName}</div>
//         <div className={cellClass}>{row.prettyPrevPlanDate}</div>
//         <div className={cellClass}>{row.delay}</div>
//         <div className={cellClass}>{row.prettyAskingDate}</div>
//         <div className={cellClass}>{row.changeFrequency}</div>
//         <div className={`${cellClass} text-gray-400`}></div>
//         <div className={cellClass}>{row.changeBy}</div>
//         <div className={cellClass}>
//           <span
//             className={`inline-block w-4 h-4 rounded-full ${
//               row.isApproved === 0 ? "bg-red-500" : row.isDone === 1 ? "bg-green-500" : "bg-yellow-400"
//             }`}
//           />
//         </div>
//         <div className={cellClass}>
//           <button className="px-2 py-1 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition text-xs mr-1">
//             X
//           </button>
//           <button className="px-2 py-1 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition text-xs">
//             Y
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
//       <div ref={containerRef} className="min-w-[1400px]">
//         {/* Header */}
//         <div className="grid grid-cols-17 bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-sm uppercase sticky top-0 z-20 shadow-md">
//           <div className={cellClass}>Comt.</div>
//           <div className={cellClass}>Del. Month</div>
//           <div className={cellClass}>Buyer</div>
//           <div className={`${cellClass} col-span-2`}>Job Number</div>
//           <div className={cellClass}>Season</div>
//           <div className={cellClass}>Style No.</div>
//           <div className={`${cellClass} col-span-2`}>Task Name</div>
//           <div className={cellClass}>Plan Date</div>
//           <div className={cellClass}>D2G</div>
//           <div className={cellClass}>Asking (Dt)</div>
//           <div className={cellClass}>C.F.</div>
//           <div className={cellClass}>Notes</div>
//           <div className={cellClass}>Change By</div>
//           <div className={cellClass}>Status</div>
//           <div className={cellClass}>Action</div>
//         </div>

//         {/* Virtualized List */}
//         {!pendingJobLoading && width > 0 && (
//           <div style={{ height: height + "px", overflowY: "auto", overflowX: "hidden" }}>
//             <List
//               ref={listRef}
//               height={height}
//               rowCount={pendingJobs.length}
//               rowHeight={48}
//               rowRenderer={rowRenderer}
//               width={width}
//               style={{ overflowX: "hidden" }}
//             />
//           </div>
//         )}

//         {pendingJobLoading && (
//           <div className="grid grid-cols-17 h-12 place-items-center">
//             <div className="col-span-17 text-center text-gray-500 animate-pulse">Loading...</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TnaDashboardJobList;

import { AppDispatch, RootState } from '@/app/store';
import Button from '@/components/form/Button';
import CustomDatePicker from '@/components/form/CustomDatePicker';
import DropdownAutoSuggest from '@/components/form/DropdownAutoSuggest';
import DynamicTooltipText from '@/components/data-display/DynamicTooltipText';
import { FormField } from '@/components/form/FormField';
import SelectDropdown from '@/components/form/SelectDropdown';
import { useTheme } from '@/hooks/useTheme';
import { faEraser, faFileLines, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List } from 'react-virtualized';
import { fetchTnaPendingJobList } from '../../reduxSlices/tnaSlice';


interface SearchFormState {
    factoryId?: number;
    opMonthFrom?: string | null;
    opMonthTo?: string | null;
    fromDate?: string | null;
    toDate?: string | null;
    buyerId?: number | null;
    styleId?: number | null;
    jobNo?: string | null;
    poNo?: string | null;
    teamId: string | null;
}

const TnaDashboardJobList = () => {
    const { pendingJobs, pendingJobLoading } = useSelector((state: RootState) => state.tna);
    const { companies } = useSelector((state: RootState) => state.company);
    const { planningWorkingTeamList } = useSelector((state: RootState) => state.planningWorkingTeam);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<List>(null);
    const { company } = useTheme();
    const dispatch: AppDispatch = useDispatch();

    const [formState, setFormState] = useState<SearchFormState>({
        factoryId: company?.companyId,
        opMonthFrom: null,
        opMonthTo: null,
        buyerId: null,
        styleId: null,
        jobNo: null,
        teamId: null
    });

    const { screenSize } = useTheme();
    const isMobile = screenSize === 'mobile';

    // Base cell styles
    const cellClass = "px-3 py-2 border border-gray-200 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-center";
    const cellClass2 = "px-3 py-2  overflow-hidden text-ellipsis whitespace-nowrap text-sm text-center";

    useEffect(() => {
        if (!containerRef.current) return;

        const updateSize = () => {
            const containerTop = containerRef.current!.getBoundingClientRect().top;
            const calculatedHeight = window.innerHeight - containerTop - 30;

            setHeight(calculatedHeight);
            setWidth(isMobile ? 1000 : containerRef.current!.clientWidth - 10); // fixed width only for mobile
        };

        const observer = new ResizeObserver(updateSize);
        observer.observe(containerRef.current);
        updateSize();

        return () => observer.disconnect();
    }, [isMobile]);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.recomputeRowHeights();
            listRef.current.forceUpdateGrid();
        }
    }, [width]);

    const handleChange = (field: keyof SearchFormState, value: any) => {
        console.log(field, value)
        // Update state
        setFormState((prev) => {
            const newState = { ...prev, [field]: value };

            // Dispatch API call with updated state
            if (field === "opMonthFrom" || field === "opMonthTo") {

            }
            if (field === "buyerId") {

            }
            if (field === "poNo") {

            }

            return newState;
        });
    };

    const handleSearchFromServer = () => {
        dispatch(fetchTnaPendingJobList());
    };

    const rowRenderer = ({ index, key, style }: { index: number; key: string; style: React.CSSProperties }) => {
        const row = pendingJobs[index];

        const rowBgClass =
            row.delay < 0
                ? "bg-rose-500 text-white"
                : row.isAlert === 1
                    ? "bg-amber-400 text-gray-900"
                    : row.isAlert === 2
                        ? "bg-slate-100 text-gray-800"
                        : "bg-white";

        return (
            <div key={key} style={style} className={`grid grid-cols-17 h-12 ${rowBgClass}`}>
                <div className={cellClass}>
                    <button className="px-2 py-1 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition">
                        {row.commentCount}
                    </button>
                </div>
                <div className={cellClass}>{row.prettyPoShipDate}</div>
                <div className={cellClass}>
                    <DynamicTooltipText text={row.buyerName} maxLength={5} />
                </div>
                <div className={`${cellClass} col-span-2`} title={row.jobNumber}>{row.jobNumber}</div>
                <div className={cellClass}>{row.sessionNo}</div>
                <div className={cellClass} title={row.styleNos}>{row.styleNos}</div>
                <div className={`${cellClass} col-span-2`}>{row.taskName}</div>
                <div className={cellClass}>{row.prettyPrevPlanDate}</div>
                <div className={cellClass}>{row.delay}</div>
                <div className={cellClass}>{row.prettyAskingDate}</div>
                <div className={cellClass}>{row.changeFrequency}</div>
                <div className={`${cellClass} text-gray-400`}></div>
                <div className={cellClass}>{row.changeBy}</div>
                <div className={cellClass}>
                    <span
                        className={`inline-block w-4 h-4 rounded-full ${row.isApproved === 0 ? "bg-red-800" : row.isDone === 1 ? "bg-green-500" : "bg-yellow-400"
                            }`}
                    />
                </div>
                <div className={cellClass}>
                    <button className="px-2 py-1 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition text-xs mr-1">
                        X
                    </button>
                    <button className="px-2 py-1 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition text-xs">
                        Y
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
            <div className='grid grid-cols-5 gap-3 py-3 px-3'>
                <FormField
                    className='mb-2'
                    label="Factory"
                    id="taskName" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[60px]">
                    <SelectDropdown
                        options={companies}
                        value={String(company?.companyId) || ""}
                        isSameKeyValue={false}
                        labelKey="name"
                        valueKey="companyId"
                        onChange={(_, item) => console.log()}
                        className="text-sm w-full bg-white dark:bg-gray-800"
                    />
                </FormField>

                <FormField
                    className='mb-2'
                    label="O.P Month"
                    id="taskName" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[80px]">
                    <div className='w-full grid grid-cols-5 gap-2'>
                        <CustomDatePicker
                            monthYearOnly
                            className='col-span-2'
                            onChange={(date) => handleChange('opMonthFrom', date?.toLocaleDateString() ?? null)}
                            selected={formState.opMonthFrom ? new Date(formState.opMonthFrom) : null}
                            dateFormat='MM/yyyy'
                        />
                        <CustomDatePicker
                            monthYearOnly
                            className='col-span-2'
                            onChange={(date) => handleChange('opMonthTo', date?.toLocaleDateString() ?? null)}
                            dateFormat="MM/yyyy"
                            selected={formState.opMonthTo ? new Date(formState.opMonthTo) : null}
                        />
                        <Button variant='filled' size='sm' className='mt-1 float-end'>
                            <FontAwesomeIcon icon={faEraser} />
                        </Button>
                    </div>
                </FormField>

                <FormField
                    className='mb-2'
                    label="Buyer"
                    id="setectedTemplate"
                    variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[60px]"
                >
                    <DropdownAutoSuggest
                        className="h-8"
                        name="tnaBuyers"
                        inputWidth={200}
                        value={""}
                        onSelect={(val) => handleChange('buyerId', val)} />
                </FormField>

                <FormField
                    label="Responsible Team"
                    id="teamId" variant="inline"
                    required labelFontSize="text-xs"
                    labelWidth="w-[60px]">
                    <SelectDropdown
                        // ref={ref}
                        options={planningWorkingTeamList}
                        value={formState.teamId || ""}
                        isSameKeyValue={false}
                        labelKey='teamName'
                        valueKey='id'
                        onChange={(val) => handleChange("teamId", val)}
                        className="text-sm w-full"
                    // onKeyDown={handleKeyDown}
                    />
                </FormField>

                <div className='float-end'>
                    <Button onClick={handleSearchFromServer} variant='filled'
                        size="sm" className=' text-black mt-1' >
                        <FontAwesomeIcon icon={faSearch} /> Search
                    </Button>
                </div>

            </div>
            <div ref={containerRef} className={isMobile ? "min-w-[1000px]" : "min-w-full"}>
                {/* Header */}
                <div className="grid grid-cols-17 bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-sm uppercase sticky top-0 z-20 shadow-md">
                    <div className={cellClass2}>Comt.</div>
                    <div className={cellClass2}>Del. Month</div>
                    <div className={cellClass2}>Buyer</div>
                    <div className={`${cellClass2} col-span-2`}>Job Number</div>
                    <div className={cellClass2}>Season</div>
                    <div className={cellClass2}>Style No.</div>
                    <div className={`${cellClass2} col-span-2`}>Task Name</div>
                    <div className={cellClass2}>Plan Date</div>
                    <div className={cellClass2}>D2G</div>
                    <div className={cellClass2}>Asking (Dt)</div>
                    <div className={cellClass2}>C.F.</div>
                    <div className={cellClass2}>Notes</div>
                    <div className={cellClass2}>Change By</div>
                    <div className={cellClass2}>Status</div>
                    <div className={cellClass2}>Action</div>
                </div>

                {/* Virtualized List */}
                {!pendingJobLoading && width > 0 && (
                    <div style={{ height: height + "px", overflowY: "auto", overflowX: "auto" }}>
                        <List
                            ref={listRef}
                            height={height}
                            rowCount={pendingJobs.length}
                            rowHeight={48}
                            rowRenderer={rowRenderer}
                            width={width}
                            style={{ overflowX: "hidden" }}
                        />
                    </div>
                )}

                {pendingJobLoading && (
                    <div className="grid grid-cols-17 h-12 place-items-center">
                        <div className="col-span-17 text-center text-gray-500 animate-pulse">Loading...</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TnaDashboardJobList;

