import { setDropdownData } from "@/app/dropdownSlice";
import DropdownAutoSuggest from "@/components/form/DropdownAutoSuggest";
import { useTheme } from "@/hooks/useTheme";
import { setMenuState, toggleMenu, } from "@/modules/configurations/reduxSlices/menuToggleSlice";
import { Folder } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronLeft } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { AppDispatch, RootState } from "../../app/store";
import FeatherIcon from "../../components/FeatherIcon";
import { fetchAllMenus, fetchAllMenusWithLink } from "../../modules/configurations/reduxSlices/menuSlice";
import SubMenu from "./SubMenu";



interface SidebarProps {
    isOpen: boolean;
    toggleByHoverSidebar: (open: boolean) => void;
    toggleSidebar: () => void;
    toggleSidebarBySideMenu: () => void;
}

interface FloatingPos {
    top: number;
    left: number;
}

const Sidebar = ({
    isOpen,
    toggleByHoverSidebar,
    toggleSidebar,
    toggleSidebarBySideMenu,
}: SidebarProps) => {
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredKey, setHoveredKey] = useState<string | null>(null);
    const [floatPos, setFloatPos] = useState<FloatingPos | null>(null);
    const hideTimerRef = useRef<number | null>(null);
    const [activeParent, setActiveParent] = useState<string | null>(null);
    const { screenSize } = useTheme();
    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();
    const { menus: menuItems, moduleMenus, flatMeanus } = useSelector((state: RootState) => state.menu);
    const menuState = useSelector((state: RootState) => state.menuToggle);
    const sidebarRef = useRef<HTMLDivElement>(null);
    // Track if sidebar is animating (transitioning width) default true to avoid glitches on first render
    const [isSidebarTransitioning, setIsSidebarTransitioning] = useState(
        import.meta.env.DEV ? false : true
    );
    const { modules } = useSelector((state: RootState) => state.module);
    const navigate = useNavigate();

    const [expandedModule, setExpandedModule] = useState<string | null>(null);

    // Handler for toggling module expansion
    const handleModuleClick = (moduleName: string) => {
        // If the clicked module is already expanded, collapse it (set to null).
        // Otherwise, expand it (set to the moduleName).
        setExpandedModule(prev => prev === moduleName ? null : moduleName);
    };

    useEffect(() => {
        dispatch(setDropdownData({
            data: flatMeanus,
            name: "searchbarMenus",
            labelKey: "name",
            valueKey: "link",
        }));
    }, [flatMeanus]);

    // whenever isOpen flips, we're about to animate width
    useEffect(() => {
        // console.log('isOpen changed:', isOpen);
        setIsSidebarTransitioning(prev => {
            const next = !prev && isOpen;
            // console.log('Inside setState callback - prev:', prev, 'next:', next);
            return next;
        });
        // console.log('After setState call'); //
    }, [isOpen]);

    // Keep menu states in sync when sidebar opens/closes
    useEffect(() => {
        if (!menuState) return;
        if (!isOpen) {
            Object.entries(menuState).forEach(([key, value]) =>
                dispatch(
                    setMenuState({
                        key,
                        isOpen: value.isOpen,
                        wasOpen: value.wasOpen || value.isOpen,
                    })
                )
            );
        } else {
            Object.entries(menuState).forEach(([key, value]) =>
                dispatch(
                    setMenuState({
                        key,
                        isOpen: value.isOpen,
                        wasOpen: value.wasOpen,
                    })
                )
            );
        }
    }, [isOpen]);

    // Auto-fetch menus based on URL
    useEffect(() => {
        const segments = location.pathname.split("/").filter(Boolean);
        const secondSegment = segments[1];
        const validModules = [
            "MasterSettings",
            "MarketingMerchandising",
            "ProductionPlanning",
            "Procurement",
            "InventoryControl",
            "GarmentsProduction",
            "Commercial",
            "FinancialAccounting",
            "HRPayroll",
            "TransportLogistics",
            "TextileManufacturing",
            "IndustrialEngineering",
            "TrimsAccessories",
            "QualityControl",
            "PrintingEmbroidery",
            "Management",
            "report"
        ];
        if (validModules.includes(secondSegment)) {
            dispatch(fetchAllMenus(secondSegment));
            dispatch(fetchAllMenusWithLink())
        }
    }, [location, dispatch]);

    // Desktop collapsed floating submenu
    const openFloating = (key: string, anchorEl: HTMLElement) => {
        if (screenSize === "mobile" || isOpen)
            return;

        const sidebarRect = sidebarRef.current?.getBoundingClientRect();
        const left = sidebarRect?.right || 50;
        const top = 50;

        setHoveredKey(key);
        setFloatPos({ top, left });

        if (hideTimerRef.current) {
            window.clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
    };

    const scheduleHideFloating = () => {
        if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = window.setTimeout(() => {
            setHoveredKey(null);
            setFloatPos(null);
        }, 120);
    };

    const cancelHideFloating = () => {
        if (hideTimerRef.current) {
            window.clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
    };

    const isDesktopCollapsed = screenSize !== "mobile" && !isOpen;

    const handleParentClick = (name: string) => {

        if (activeParent === name) {
            // Already active → close it
            dispatch(toggleMenu(name));
            setActiveParent(null);
        } else {
            // Close previous parent if open
            if (activeParent && menuState[activeParent]?.isOpen) {
                console.log({ activeParent, ...menuState[activeParent] });
                dispatch(toggleMenu(activeParent));
            }
            // Open new parent
            dispatch(toggleMenu(name));
            setActiveParent(name);
        }
    };

    const isDashboard = location.pathname.endsWith("/webapp/dashboard");

    return (
        <div className="flex h-screen " ref={sidebarRef}>
            <aside
                onTransitionEnd={(e) => {
                    if (e.propertyName === "width") {
                        setIsSidebarTransitioning(false);
                    }
                }}
                className={`top-[38px] left-0 fixed h-screen z-999 sidebar transition-[width] duration-500 ease-in-out border-r-1 border-gray-200
          ${screenSize === "mobile"
                        ? isOpen
                            ? "w-full"
                            : "w-0"
                        : isOpen || menuIsOpen
                            ? "w-[15rem]"
                            : "w-[2.5rem]"
                    }
          ${isDesktopCollapsed ? "overflow-visible" : "overflow-hidden"}
           ${isSidebarTransitioning ? "sidebar-animating" : ""}
             style={{ willChange: "width" }}
        `}
            >
                <nav className="relative ">
                    <SimpleBar
                        className={`custom-scrollbar ${isHovered ? "show-scrollbar" : ""}`}
                        style={{ maxHeight: "calc(100vh - 4rem)" }}
                        autoHide={false}
                    >
                        {/* MOBILE DROPDOWN */}
                        {screenSize === "mobile" && (
                            <div className="p-2 mb-0">
                                <DropdownAutoSuggest
                                    name="searchbarMenus"
                                    onSelect={(value, label) => {
                                        navigate(value);
                                        // if (screenSize === "mobile") {
                                        //     // toggleSidebar();
                                        // }
                                    }}
                                    className="pt-[2px] w-full"
                                />
                            </div>
                        )}
                        {/* Dashboard Menu List: Module Grouping and Collapse */}
                        {
                            isDashboard ?
                                moduleMenus.map((record, i) => (
                                    <div className="" key={i}>
                                        {Object.entries(record).map(([moduleName, items]) => (
                                            <div key={moduleName} className="module-group">

                                                {/* Module Header (Clickable for Collapse/Expand) */}
                                                <div
                                                    className="flex items-center justify-start w-full py-2 px-2 text-start  dark:text-gray-200 dark:hover:bg-gray-700 module_name"
                                                    onClick={() => handleModuleClick(moduleName)}
                                                >
                                                    {/* Module Image (Existing Logic) */}
                                                    {(() => {
                                                        const module = modules?.find((m) => m.name === moduleName);
                                                        return module?.image ? (
                                                            <img
                                                                src={module.image}
                                                                alt={module.name}
                                                                className="mr-2 w-4 h-6 object-contain rounded"
                                                            />
                                                        ) : null;
                                                    })()}

                                                    {/* Module Name - Hidden when sidebar is collapsed */}
                                                    {!isDesktopCollapsed && (
                                                        <span
                                                            className={`text-sm text-start truncate flex-1 min-w-0 transition-colors duration-200 ${expandedModule === moduleName ? "font-bold" : "font-normal"}`}
                                                        >
                                                            {moduleName}
                                                        </span>

                                                    )}

                                                    {/* Collapse/Expand Indicator - Hidden when sidebar is collapsed */}
                                                    {!isDesktopCollapsed && (
                                                        <span className="ml-auto">
                                                            <FeatherIcon
                                                                icon={
                                                                    // Show ChevronDown if module is expanded, otherwise ChevronLeft
                                                                    expandedModule === moduleName
                                                                        ? ChevronDown
                                                                        : ChevronLeft
                                                                }
                                                                size={16}
                                                                className="text-arrow"
                                                            />
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Menu List (Conditional Rendering) */}
                                                {expandedModule === moduleName && (
                                                    <ul
                                                        className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
                                                    >
                                                        {items.map((item, index) => (
                                                            // *** Your existing parent menu item list (li) starts here ***
                                                            <li
                                                                key={index}
                                                                className={`group relative text-sm ml-0 cursor-pointer rounded transition-colors `}
                                                                onMouseEnter={(e) => {
                                                                    setIsHovered(true);
                                                                    if (isDesktopCollapsed && item.submenu) {
                                                                        openFloating(item.name, e.currentTarget as HTMLElement);
                                                                    }
                                                                }}
                                                                onMouseLeave={() => {
                                                                    setIsHovered(false);
                                                                    if (isDesktopCollapsed) scheduleHideFloating();
                                                                }}
                                                            >
                                                                <div
                                                                    className="flex items-center w-full pr-2 py-2 parent_menu_item_main"
                                                                    onClick={() => handleParentClick(item.name)}
                                                                >
                                                                    <div>
                                                                        <FeatherIcon icon={Folder} size={14} className={`mx-2 ${!isOpen || !menuIsOpen ? "" : "hidden"}`} />
                                                                    </div>



                                                                    <div className={`w-full parent_menu_item min-w-0 flex ${isOpen || menuIsOpen ? "" : "hidden"}`}>
                                                                        <span className="overflow-hidden whitespace-nowrap text-ellipsis">{item.name}</span>
                                                                        {item.submenu && (
                                                                            <span className="ml-auto">
                                                                                <FeatherIcon
                                                                                    icon={
                                                                                        menuState[item.name]?.isOpen
                                                                                            ? ChevronDown
                                                                                            : ChevronLeft
                                                                                    }
                                                                                    size={16}
                                                                                    className="text-arrow"
                                                                                />
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                {item.submenu && isOpen && (
                                                                    <SubMenu
                                                                        isSidebarOpen={isOpen}
                                                                        toggleSidebar={toggleSidebarBySideMenu}
                                                                        item={item}
                                                                        isOpen={menuState[item.name]?.isOpen}
                                                                        activeParent={activeParent}
                                                                        isSidebarTransitioning={isSidebarTransitioning}
                                                                    />
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))
                                :
                                // FIX: Non-Dashboard Menu List: Flat list for a single module page
                                <ul className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                                    {/* Map directly over the flat menuItems array without module checks */}
                                    {menuItems.map((item, index) => (
                                        <li
                                            key={index}
                                            className={`group relative text-sm ml-0 cursor-pointer rounded transition-colors `}
                                            onMouseEnter={(e) => {
                                                setIsHovered(true);
                                                if (isDesktopCollapsed && item.submenu) {
                                                    openFloating(item.name, e.currentTarget as HTMLElement);
                                                }
                                            }}
                                            onMouseLeave={() => {
                                                setIsHovered(false);
                                                if (isDesktopCollapsed) scheduleHideFloating();
                                            }}
                                        >
                                            <div
                                                className="flex items-center w-full px-2 py-2 parent_menu_item_main"
                                                onClick={() => handleParentClick(item.name)}
                                            >
                                                <div>
                                                    <FeatherIcon icon={Folder} size={14} className={` ${!isOpen || !menuIsOpen ? "" : "hidden"}`} />
                                                </div>


                                                <div className={`ms-2 w-full parent_menu_item min-w-0 flex ${isOpen || menuIsOpen ? "" : "hidden"}`}>
                                                    <span className="overflow-hidden whitespace-nowrap text-ellipsis">{item.name}</span>
                                                    {item.submenu && (
                                                        <span className="ml-auto">
                                                            <FeatherIcon
                                                                icon={
                                                                    menuState[item.name]?.isOpen
                                                                        ? ChevronDown
                                                                        : ChevronLeft
                                                                }
                                                                size={16}
                                                                className="text-arrow"
                                                            />
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {item.submenu && isOpen && (
                                                <SubMenu
                                                    isSidebarOpen={isOpen}
                                                    toggleSidebar={toggleSidebarBySideMenu}
                                                    item={item}
                                                    isOpen={menuState[item.name]?.isOpen}
                                                    activeParent={activeParent}
                                                    isSidebarTransitioning={isSidebarTransitioning}
                                                />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                        }
                    </SimpleBar>
                </nav>
            </aside>

            {/* Floating submenu - When cursor is placed on main submenu a floating submenu appears */}
            {isDesktopCollapsed &&
                hoveredKey &&
                floatPos &&
                createPortal(
                    <div
                        className="fixed z-50 rounded-lg shadow-lg float_item_parent"
                        style={{
                            top: floatPos.top,
                            left: 42,
                            bottom: 0,
                            maxHeight: `calc(100vh - ${42}px)`,
                            overflowY: "auto",
                            minWidth: "17rem",
                        }}
                        onMouseEnter={cancelHideFloating}
                        onMouseLeave={scheduleHideFloating}
                    >
                        <div className="px-4 parent_menu_item py-2  font-semibold border-b border-black/10 dark:border-white/10">
                            {hoveredKey}
                        </div>

                        {menuItems
                            .filter((mi) => mi.name === hoveredKey && mi.submenu)
                            .map((mi) => (
                                <div key={mi.name} className="" >
                                    <SubMenu
                                        isSidebarOpen={true}
                                        toggleSidebar={toggleSidebarBySideMenu}
                                        item={mi}
                                        isOpen={false}
                                        isFloating={true}
                                        isSidebarTransitioning={false}
                                    />
                                </div>
                            ))}
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default Sidebar;