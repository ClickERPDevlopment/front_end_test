import { AppDispatch, RootState } from "@/app/store";
import BreadcrumbLocation from "@/components/layout/BreadcrumbLocation";
import { useTheme } from "@/hooks/useTheme";
import { fetchAllCompanies } from "@/modules/configurations/reduxSlices/companySlice";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import SettingsSidebar from "./shared/SettingsSidebar";
import Sidebar from "./shared/Sidebar";
import TopNavBar from "./shared/TopNavBar";

interface DashboardLayoutProps {
    actions?: ReactNode;
}

const DashboardLayout = ({ actions: initialActions }: DashboardLayoutProps) => {
    const [actions, setActions] = useState<ReactNode>(initialActions ?? null);
    const rightSideBarRef = useRef<HTMLDivElement | null>(null);
    const leftSideBarRef = useRef<HTMLDivElement | null>(null);
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
    const [isSidebarOpenByHover, setIsSidebarOpenByHover] = useState(true);
    const [moduleName] = useState("Dashboard");
    const [menuName] = useState("Dashboard Menu");
    const [isOnline] = useState(true);
    const profile_img = "/profile-avatar.png";
    const { themeName, screenSize, hasInputControlColor, setLayout, setCompany, isCompanyByUser } = useTheme();
    const dispatch: AppDispatch = useDispatch();
    const { companies } = useSelector((state: RootState) => state.company);

    const location = useLocation();
    const segments = location.pathname.split("/").filter(Boolean);

    useEffect(() => {
        dispatch(fetchAllCompanies())
        setLayout('webapp')
    }, [])

    useEffect(() => {
        if (companies.length > 0) {
            const company = companies.find(c => c.isDefault);
            if (company && !isCompanyByUser) {
                setCompany(company);
            } else if (!isCompanyByUser) {
                setCompany(companies[0]);
            }
        }
    }, [companies])

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target as Node;

            // Right sidebar click check
            if (rightSideBarRef.current && !rightSideBarRef.current.contains(target)) {
                toggleRightSidebar(false);
            }

            // Left sidebar click check
            if (leftSideBarRef.current && !leftSideBarRef.current.contains(target)) {
                // Only close if the click is NOT on hamburger
                const hamburger = document.getElementById("mobile-hamburger");
                if (!hamburger?.contains(target)) {
                    setIsSideBarOpen(false);
                }
            }
        };


        if (isRightSidebarOpen) {
            // console.log('click on right')
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        if (isSideBarOpen && screenSize === "mobile") {
            // console.log('click on left')
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            // console.log('click on left')
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isRightSidebarOpen, isSideBarOpen, screenSize]);

    useEffect(() => {
        if (screenSize === "mobile") {
            setIsSideBarOpen(false);
        } else {
            setIsSideBarOpen(true);
        }
    }, [screenSize])


    const toggleSidebar = () => {
        // setIsSidebarOpenByHover(true);
        // debugger
        setIsSideBarOpen((prev) => !prev); // Toggle Sidebar state
    };

    const toggleSidebarBySideMenu = () => {
        setIsSideBarOpen((prev) => !prev); // Toggle Sidebar state
        setIsSidebarOpenByHover(true); // Disable hover sidebar
    };

    const toggleSidebarByHover = () => {
        setIsSidebarOpenByHover((prev) => !prev); // Toggle Sidebar state
    };

    const handleCloseSidebar = () => {
        setIsRightSidebarOpen(false); // Close the sidebar
    };

    const toggleRightSidebar = (condition: boolean) => {
        setIsRightSidebarOpen(condition); // Close the sidebar
    };


    const { menus, loading } = useSelector((state: RootState) => state.menu);

    useEffect(() => {
    }, [dispatch]);

    return (
        <div className={`module_bg  relative flex ${themeName} ${hasInputControlColor ? 'hasInputControlColor' : ''} `} id="main-content">
            {/* Sidebar */}
            {
                screenSize !== "mobile" &&
                <Sidebar
                    isOpen={isSideBarOpen}
                    toggleSidebar={toggleSidebar}
                    toggleSidebarBySideMenu={toggleSidebarBySideMenu}
                    toggleByHoverSidebar={toggleSidebarByHover}
                />
            }

            {
                screenSize === "mobile" &&
                <div ref={leftSideBarRef} onClick={(e) => e.stopPropagation()}>
                    <Sidebar
                        isOpen={isSideBarOpen}
                        toggleSidebar={toggleSidebar}
                        toggleSidebarBySideMenu={toggleSidebarBySideMenu}
                        toggleByHoverSidebar={toggleSidebarByHover}
                    />
                </div>
            }

            {/* <SideMenu isSidebarOpen={isSideBarOpen} /> */}

            <TopNavBar
                isSidebarOpenByHover={isSidebarOpenByHover}
                isSideBarOpen={isSideBarOpen}
                moduleName={moduleName}
                menuName={menuName}
                isFirstPage={false}
                isOnline={isOnline}
                profile_img={profile_img}
                homePage={() => console.log("Navigating to home page")}
                toggleSidebar={toggleSidebar}
                isRightSidebarOpen={isRightSidebarOpen}
                toggleRightSidebarOpen={toggleRightSidebar}
            />

            {/* Settings Sidebar Component */}
            <div ref={rightSideBarRef}>
                <SettingsSidebar
                    isOpen={isRightSidebarOpen}
                    onClose={handleCloseSidebar}
                />
            </div>

            {/* Main Content */}

            <main
                className={`flex-1 transition-all duration-500 ease-in-out mt-11.5 
    ${screenSize === "mobile"
                        ? "ml-2 mr-2 pl-0 pr-0"
                        : isSideBarOpen
                            ? "ml-58 pl-4 pr-2"
                            : "ml-10 pl-2 pr-2"
                    }
  `}
            >
                {/* <div className="flex items-center justify-between">
                    <BreadcrumbLocation />
                    <div className="flex gap-3">{actions}</div>
                </div> */}

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mb-2">
                    {/* Breadcrumb - always top on mobile */}
                    <div className="">
                        <BreadcrumbLocation />
                    </div>

                    {/* Buttons - next row on mobile, right-aligned on larger screens */}
                    <div className=" flex justify-end">
                        {actions}
                    </div>
                </div>

                <Outlet context={{ setActions }} />
            </main>


        </div>
    );
};

export default DashboardLayout;

export function useDashboardActions() {
    return useOutletContext<{ setActions: (node: ReactNode) => void }>();
}