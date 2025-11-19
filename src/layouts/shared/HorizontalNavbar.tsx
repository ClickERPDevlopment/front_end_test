import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUser,
    faCog,
    faSignOutAlt,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faFileAlt,
    faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth";

const HorizontalNavbar = () => {
    const [menuState, setMenuState] = useState<Record<string, boolean>>({});
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const menuRef = useRef<HTMLUListElement>(null);
    const { logout } = useAuth();

    useEffect(() => {
        checkScroll();
    }, []);

    const toggleMenu = (menu: string) => {
        setMenuState((prev) => ({
            ...prev,
            [menu]: !prev[menu], // Toggle open/close state
        }));
    };

    const checkScroll = () => {
        if (menuRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = menuRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
        }
    };

    const scrollMenu = (direction: "left" | "right") => {
        if (menuRef.current) {
            const scrollAmount = 150;
            menuRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    // Navbar menu items
    const menuItems = [
        { title: "Home", icon: faHome },
        { title: "Profile", icon: faUser },
        {
            title: "Documents",
            icon: faFileAlt,
            submenu: ["Reports", "Invoices"],
        },
        {
            title: "Projects",
            icon: faBriefcase,
            submenu: ["Active Projects", "Archived"],
        },
        { title: "Settings", icon: faCog },
        { title: "Analytics", icon: faFileAlt },
        { title: "Users", icon: faUser },
        { title: "Admin", icon: faCog },
        { title: "Billing", icon: faBriefcase },
        { title: "Reports", icon: faFileAlt },
        { title: "Support", icon: faUser },
        { title: "Support", icon: faUser },
        { title: "Support", icon: faUser },
        { title: "Support", icon: faUser },
        { title: "Support", icon: faUser },
        { title: "Support", icon: faUser },
        { title: "Support", icon: faUser },
        { title: "Support", icon: faUser },
    ];

    return (
        <nav className="fixed top-15 left-0 w-full !h-[3rem] bg-dark-navy-blue text-white shadow-md z-40 flex items-center">
            {/* Left Scroll Button */}
            {showLeftArrow && (
                <button
                    className="absolute left-0 bg-gray-800 h-full px-3 flex items-center justify-center z-50"
                    onClick={() => scrollMenu("left")}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
            )}

            {/* Menu List */}
            <ul
                ref={menuRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide items-center w-full px-12 whitespace-nowrap"
                onScroll={checkScroll}
            >
                {menuItems.map((item, index) => (
                    <li key={index} className="relative">
                        <div
                            className="flex items-center gap-2 px-4  cursor-pointer hover:bg-gray-700 rounded-md"
                            onClick={() => item.submenu && toggleMenu(item.title)}
                        >
                            <FontAwesomeIcon icon={item.icon} />
                            <span className="text-base">{item.title}</span>
                            {item.submenu && (
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className={`ml-1 transition-transform ${menuState[item.title] ? "rotate-180" : ""
                                        }`}
                                />
                            )}
                        </div>

                        {/* Dropdown Submenu */}
                        {item.submenu && menuState[item.title] && (
                            <ul className="absolute left-0 bg-gray-800 text-white mt-2 rounded shadow-lg w-48">
                                {item.submenu.map((sub, subIndex) => (
                                    <li
                                        key={subIndex}
                                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                                    >
                                        {sub}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}

                {/* Logout */}
                <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700 rounded-md flex items-center gap-2"
                    onClick={logout}
                >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span>Logout</span>
                </li>
            </ul>

            {/* Right Scroll Button */}
            {showRightArrow && (
                <button
                    className="absolute right-0 bg-gray-800 h-full px-3 flex items-center justify-center z-50"
                    onClick={() => scrollMenu("right")}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            )}
        </nav>
    );
};

export default HorizontalNavbar;
