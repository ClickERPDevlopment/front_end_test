// // components/ToastIconPicker.tsx
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faCheckCircle,
//     faTimesCircle,
//     faInfoCircle,
//     faBell,
// } from "@fortawesome/free-solid-svg-icons";
// import React from "react";

// interface ToastIconPickerProps {
//     value: string; // store icon key instead of ReactNode
//     onChange: (iconKey: string) => void; // return icon key
// }

// const icons = [
//     { label: "Success", icon: faCheckCircle },
//     { label: "Error", icon: faTimesCircle },
//     { label: "Info", icon: faInfoCircle },
//     { label: "Bell", icon: faBell },
// ];

// export default function ToastIconPicker({ value, onChange }: ToastIconPickerProps) {
//     return (
//         <div className="flex gap-3 items-center">
//             {icons.map(({ label, icon }) => {
//                 const selected = value === label; // compare with label
//                 return (
//                     <button
//                         key={label}
//                         onClick={() => onChange(label)} // pass label instead of element
//                         className={`p-2 rounded-full border ${selected ? "border-blue-500" : "border-gray-300"}`}
//                     >
//                         <FontAwesomeIcon icon={icon} />
//                     </button>
//                 );
//             })}
//             {/* Clear button */}
//             <button
//                 onClick={() => onChange("")} // empty string for none
//                 className="p-2 rounded-full border border-gray-300"
//             >
//                 None
//             </button>
//         </div>
//     );
// }
