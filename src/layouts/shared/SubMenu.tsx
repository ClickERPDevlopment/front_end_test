import { AppDispatch, RootState } from "@/app/store";
import FeatherIcon from "@/components/FeatherIcon";
import { useTheme } from "@/hooks/useTheme";
import { toggleMenu } from "@/modules/configurations/reduxSlices/menuToggleSlice";
import { MenuItem } from "@/modules/configurations/types/menu.interface";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronDown, ChevronLeft } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { navigate } from '@/utils/navigate';



interface SubMenuProps {
    item: MenuItem;
    isOpen: boolean;
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    isFloating?: boolean;
    activeParent?: string | null;
    isSidebarTransitioning?: boolean; // NEW
}



const SubMenu = ({
    item,
    isOpen,
    isSidebarOpen,
    toggleSidebar,
    isFloating = false,
    activeParent,
    isSidebarTransitioning = false,   // NEW
}: SubMenuProps) => {
    const menuState = useSelector((state: RootState) => state.menuToggle);
    const dispatch: AppDispatch = useDispatch();
    if (!item.submenu) return null;
    const canExpand = isSidebarOpen && !isSidebarTransitioning && isOpen;



    const { screenSize } = useTheme();

    const handleSubMenuClick = (link: string) => {
        navigate(link);

        // MOBILE: collapse sidebar only when submenu item clicked
        if (screenSize === "mobile") {
            toggleSidebar();
        }
    };


    return (
        <div
            className={`grid transition-[grid-template-rows] duration-500 ease-in-out
        ${canExpand ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
            <div className={`${isFloating ? "overflow-visible" : "overflow-hidden"}`}>
                <ul
                    className={``}
                >
                    {item.submenu?.map((sub) => {
                        const isChildOpen = menuState[sub.name]?.isOpen || false;
                        return (
                            <li
                                key={sub.id}
                                className={`text-[0.875rem] group`}
                            // ${
                            //   activeParent === item.name
                            //     ? "bg-slate-200 dark:bg-gray-700"
                            //     : ""
                            // }
                            // `}
                            >
                                <div
                                    className={`ps-4 py-2 gap-2 flex items-center cursor-pointer hover:bg-slate-200 dark:hover:bg-gray-700 menu_item_main`}
                                    onClick={() => sub.submenu && dispatch(toggleMenu(sub.name))}
                                >
                                    {!sub.submenu || sub.submenu.length === 0 ? (
                                        <>
                                            <span className="flex items-center justify-center">
                                                <span className="sub_menu_icon"></span>
                                            </span>
                                            <Link
                                                to={sub.link || "#"}
                                                className="block w-full menu_item"
                                                onClick={() => handleSubMenuClick(sub.link || "#")}
                                            >
                                                {sub.name}
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faEllipsisV} className="iconSub" />
                                            <span
                                                className={` ${isSidebarOpen || isFloating
                                                    ? "opacity-100 scale-100"
                                                    : "opacity-0 scale-95"
                                                    }`}
                                            >
                                                {sub.name}
                                            </span>
                                            <span className="ml-auto">
                                                <FeatherIcon
                                                    icon={isChildOpen ? ChevronDown : ChevronLeft}
                                                    size={16}
                                                    className="text"
                                                />
                                            </span>
                                        </>
                                    )}
                                </div>

                                {!isFloating && sub.submenu && sub.submenu.length > 0 && (
                                    <SubMenu
                                        item={sub}
                                        isOpen={isChildOpen}
                                        isSidebarOpen={isSidebarOpen}
                                        toggleSidebar={toggleSidebar}
                                        isFloating={isFloating}
                                        activeParent={activeParent}
                                    />
                                )}

                                {isFloating &&
                                    sub.submenu &&
                                    sub.submenu.length > 0 &&
                                    isChildOpen && (
                                        <SubMenu
                                            item={sub}
                                            isOpen={true}
                                            isSidebarOpen={isSidebarOpen}
                                            toggleSidebar={toggleSidebar}
                                            isFloating={true}
                                            activeParent={activeParent}
                                        />
                                    )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default SubMenu;
