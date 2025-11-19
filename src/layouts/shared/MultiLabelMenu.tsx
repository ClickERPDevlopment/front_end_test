import type React from "react";
import { ChevronDown, ChevronRight, Circle, } from "react-feather";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import MultiLabelMenuByPortal from "./MultiLabelMenuByPortal";
import { Link } from "react-router-dom";
import { MenuItem } from "@/modules/configurations/types/menu.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { ChevronLeft } from "lucide-react";
import SimpleBar from "simplebar-react";

interface MultiLabelMenuProps {
    items: MenuItem[];
    level?: number;
    isSidebarOpen: boolean;
}

const MultiLabelMenu: React.FC<MultiLabelMenuProps> = ({ items, level = 0, isSidebarOpen }) => {
    const [openItem, setOpenItem] = useState<Record<string, boolean>>({});
    const [hoveredMenuKey, setHoveredMenuKey] = useState<string | null>(null);
    const [hoveredMenuItems, setHoveredMenuItems] = useState<MenuItem[]>([]);
    const hideTimerRef = useRef<number | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const toggleMenu = (name: string) => {
        setOpenItem((prev) => ({ ...prev, [name]: !prev[name] }))
    }

    const handleMenuEnter = (event: React.MouseEvent<HTMLDivElement>, item: MenuItem) => {
        setIsHovered(true);
        if (!isSidebarOpen) {
            setHoveredMenuItems(item.submenu || []);
            setHoveredMenuKey(item.name);
        }
    };

    const handleMouseLeaveFromFloatingMenu = () => {
        if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = window.setTimeout(() => {
            setHoveredMenuKey(null);
        }, 120);
    };

    return (
        <div className="overflow-hidden">

            <ul className={`text-black scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200`}>
                {
                    items.map((item, index) => {
                        return (
                            <li className="group relative text-[0.9375rem] ml-0 cursor-pointer rounded " key={`item_l-${level}_i-${index}`}>

                                {
                                    !item.submenu || item.submenu.length === 0 ?
                                        <Link to={item.link || ""}>
                                            <div
                                                onMouseEnter={(e) => handleMenuEnter(e, item)}
                                                onClick={() => toggleMenu(item.name)}
                                                className="cursor-pointer gap-2 flex justify-between items-center w-full px-2 py-3 parent_menu_item_main">
                                                <div className="flex gap-2">
                                                    {
                                                        level === 0 ?
                                                            <FontAwesomeIcon
                                                                icon={faPlusSquare}
                                                                className="icon mr-2 "
                                                            />
                                                            : (item.submenu && item.submenu.length > 0 ?
                                                                <FontAwesomeIcon icon={faEllipsisV} className="iconSub" />
                                                                : <Circle className="w-3 font-bold" />
                                                            )
                                                    }
                                                    {isSidebarOpen && <span className="overflow-hidden whitespace-nowrap text-ellipsis">{item.name}</span>}
                                                </div>
                                                {
                                                    isSidebarOpen && item.submenu && item.submenu.length > 0 &&
                                                    (
                                                        openItem[item.name] ? <ChevronDown className="w-4" /> : <ChevronLeft className="w-4" />
                                                    )

                                                }
                                            </div>
                                        </Link>

                                        :
                                        <div
                                            onMouseEnter={(e) => handleMenuEnter(e, item)}
                                            onClick={() => toggleMenu(item.name)}
                                            className="cursor-pointer flex justify-between items-center w-full px-2 py-3 parent_menu_item_main">
                                            <div className="flex gap-2 ">
                                                {
                                                    level === 0 ?
                                                        <FontAwesomeIcon
                                                            icon={faPlusSquare}
                                                            className="icon mr-2 "
                                                        />
                                                        : (item.submenu && item.submenu.length > 0 ?
                                                            <FontAwesomeIcon icon={faEllipsisV} className="iconSub" />
                                                            : <Circle className="w-4" />
                                                        )
                                                }
                                                {isSidebarOpen && <span className="overflow-hidden whitespace-nowrap text-ellipsis">{item.name}</span>}
                                            </div>
                                            {
                                                isSidebarOpen && item.submenu && item.submenu.length > 0 &&
                                                (
                                                    openItem[item.name] ? <ChevronDown className="w-4" /> : <ChevronLeft className="w-4" />
                                                )

                                            }
                                        </div>
                                }

                                {
                                    item.submenu && (
                                        <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out
                                            ${openItem[item.name] && isSidebarOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                            <MultiLabelMenu items={item.submenu} level={level + 1} isSidebarOpen={isSidebarOpen} />
                                        </div>
                                    )
                                }
                            </li>
                        )
                    })
                }
            </ul>


            {/* Floating submenu - When cursor is placed on main submenu a floating submenu appears */}
            {!isSidebarOpen &&
                hoveredMenuKey &&
                createPortal(
                    <div
                        onMouseLeave={() => handleMouseLeaveFromFloatingMenu()}
                        className="fixed z-50 rounded-lg shadow-lg float_item_parent"
                        style={{
                            top: 50,
                            left: 42,
                            bottom: 0,
                            maxHeight: `calc(100vh - ${42}px)`,
                            overflowY: "auto",
                            minWidth: "17rem",
                        }}
                    >
                        <div className="px-4 parent_menu_item py-2 h-[37px] font-semibold border-b border-black/10 dark:border-white/10">
                            {hoveredMenuKey}
                        </div>

                        {hoveredMenuItems.length > 0
                            &&
                            <MultiLabelMenuByPortal items={hoveredMenuItems} level={level + 1} />
                        }
                    </div>,
                    document.body
                )}
        </div>
    )
}

export default MultiLabelMenu;