import { useTheme } from "@/hooks/useTheme";
import { ReactNode, useEffect, useRef, useState } from "react";
import SettingsSidebar from "./shared/SettingsSidebar";
import TopNavBar from "./shared/TopNavBar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { fetchAllCompanies } from "@/modules/configurations/reduxSlices/companySlice";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayoutNoSidebar = ({ children }: DashboardLayoutProps) => {
    const rightSideBarRef = useRef<HTMLDivElement | null>(null);
    const leftSideBarRef = useRef<HTMLDivElement | null>(null);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
    const [isSidebarOpenByHover] = useState(false);
    const [moduleName] = useState("Dashboard");
    const [menuName] = useState("Dashboard Menu");
    const [isOnline] = useState(true);
    const profile_img = "/profile-avatar.png";
    const { themeName, screenSize } = useTheme();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCompanies())
    }, [])

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                rightSideBarRef.current &&
                !rightSideBarRef.current.contains(event.target as Node)
            ) {
                toggleRightSidebar(false);
            }

            if (
                leftSideBarRef.current &&
                !leftSideBarRef.current.contains(event.target as Node)
            ) {

                toggleSidebar();
            }
        };

        if (isRightSidebarOpen) {
            console.log('click on right')
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        if (isSideBarOpen && screenSize === "mobile") {
            console.log('click on left')
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            console.log('click on left')
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
        setIsSideBarOpen((prev) => !prev); // Toggle Sidebar state
    };

    const handleCloseSidebar = () => {
        setIsRightSidebarOpen(false); // Close the sidebar
    };

    const toggleRightSidebar = (condition: boolean) => {
        setIsRightSidebarOpen(condition); // Close the sidebar
    };

    return (
        <div className={`flex ${themeName}`} id="main-content">

            <TopNavBar
                isSidebarOpenByHover={isSidebarOpenByHover}
                isSideBarOpen={isSideBarOpen}
                moduleName={moduleName}
                menuName={menuName}
                isFirstPage={true}
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
            {
                screenSize === 'mobile'
                    ? <main className={`flex-1 mt-10 p-10`}>
                        {children}
                    </main> :
                    <main className={`flex-1 p-10 mt-10`}>
                        {children}
                    </main>
            }


        </div>
    );
};

export default DashboardLayoutNoSidebar;
