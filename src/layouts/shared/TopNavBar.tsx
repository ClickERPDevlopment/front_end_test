import { AppDispatch, RootState } from "@/app/store";
import DropdownAutoSuggest from "@/components/form/DropdownAutoSuggest";
import SelectDropdown from "@/components/form/SelectDropdown";
import { useTheme } from "@/hooks/useTheme";
import { faCog, faHome, faQuestionCircle, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons"; // Import your required icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AlignLeft } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Bell, Home, Maximize2, Minimize2, Moon, Settings, Sun, X, } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FeatherIcon from "../../components/FeatherIcon";
import { AllignLeft } from "../../components/Icons";
import { useAuth } from "../../hooks/useAuth";

interface NavbarProps {
    isSidebarOpenByHover: boolean;
    isSideBarOpen: boolean;
    moduleName: string;
    menuName: string;
    isOnline: boolean;
    profile_img: string;
    isRightSidebarOpen: boolean;
    isFirstPage: boolean;
    homePage: () => void;
    toggleSidebar: () => void;
    toggleRightSidebarOpen: (isSideBarOpen: boolean) => void;
}

const TopNavBar = ({
    isSidebarOpenByHover,
    isSideBarOpen,
    moduleName,
    menuName,
    isOnline,
    profile_img,
    isFirstPage,
    homePage,
    toggleSidebar,
    toggleRightSidebarOpen
}: NavbarProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const profileRef = useRef<HTMLDivElement | null>(null);
    const [fullScreen, setFullScreen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const { theme, setTheme, screenSize } = useTheme();
    const { logout } = useAuth();
    const location = useLocation()
    const toggleProfile = useCallback(() => {
        toggleRightSidebarOpen(false);
        setShowProfile(prev => !prev);
    }, [toggleRightSidebarOpen]);
    const { companies } = useSelector((state: RootState) => state.company);
    const { company, setCompany, setIsCompanyByUser } = useTheme();


    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setShowProfile(false); // always close
            }
        };
        if (showProfile) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [showProfile]);


    const handleToggleSideBar = () => {
        toggleSidebar();
    };

    const toggleFullScreen = () => {
        const elem = document.documentElement;

        if (!document.fullscreenElement) {
            elem.requestFullscreen().then(() => setFullScreen(true));
        } else {
            document.exitFullscreen().then(() => setFullScreen(false));
        }
    };

    const handleSettingsClick = () => {
        toggleRightSidebarOpen(true); // Open the sidebar
    };


    const navigate = useNavigate();
    const isMobile = screenSize === "mobile";
    const isTablet = screenSize === "tablet";

    // -----------------------------
    // STEP: MOBILE LAYOUT
    // - This block is rendered only when `isMobile === true`.
    // - Company Select and DropdownAutoSuggest are intentionally omitted for mobile.
    // - A hamburger (AllignLeft) is present and calls handleToggleSideBar().
    // -----------------------------
    const MobileHeader = (
        <div className="flex items-center justify-between w-full px-3">
            <div className="flex items-center gap-3">
                {/* <AlignLeft
                    id="mobile-hamburger"      // <-- add this
                    onClick={() => toggleSidebar()}
                    className="cursor-pointer"
                    size={22}
                /> */}

                <div className="cursor-pointer">
                    {isSideBarOpen ? (
                        <X size={22} onClick={handleToggleSideBar} />
                    ) : (
                        <AlignLeft size={22} onClick={handleToggleSideBar} />
                    )}
                </div>


            </div>

            <div className="flex items-center gap-3">
                {/* Mobile: optional home icon when not on dashboard */}
                {moduleName.toLowerCase() !== "dashboard" && (
                    <FeatherIcon
                        icon={Home}
                        size={17}
                        className="cursor-pointer"
                        onClick={homePage}
                    />
                )}

                {/* Home Button */}
                <Link to="/" className="block">
                    <FeatherIcon
                        onClick={homePage} // or use <Link to="/" /> if you want router navigation
                        icon={Home}
                        size={17}
                        className="cursor-pointer hover"
                    />
                </Link>

                <FeatherIcon
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    icon={theme === "dark" ? Sun : Moon}
                    size={17}
                    className="cursor-pointer"
                />

                <FeatherIcon icon={Bell} size={17} className="cursor-pointer" />

                <FeatherIcon onClick={toggleFullScreen} icon={fullScreen ? Minimize2 : Maximize2} size={17} className="cursor-pointer" />

                {/* Profile (mobile) */}
                <div className="relative" ref={profileRef}>
                    <button
                        type="button"
                        aria-label="Profile"
                        aria-haspopup="true"
                        onClick={toggleProfile}
                        className="flex items-center"
                    >
                        <img
                            src={profile_img}
                            alt="Profile"
                            className="rounded-full h-8 w-8 object-cover"
                        />
                    </button>

                    {showProfile && (
                        <div>
                            <ul className="dropdown-menu profile absolute rounded-md top-full w-64 text shadow-md right-3">
                                <li className="dropdown-header">
                                    <h6 className="font-semibold">Admin</h6>
                                    <span className="text-medium">Administrator</span>
                                </li>
                                <li>
                                    {isMobile && (
                                        <div className="mr-2">
                                            <div className="">
                                                <SelectDropdown
                                                    options={companies}
                                                    value={String(company?.companyId) || ""}
                                                    isSameKeyValue={false}
                                                    labelKey="name"
                                                    valueKey="companyId"
                                                    onChange={(_, item) =>{ setCompany(item ?? null); setIsCompanyByUser(true) }}
                                                    className="mt-0"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="px-4 py-3">
                                    <a href="#" className="flex items-center text-sm">
                                        <FontAwesomeIcon icon={faUser} />
                                        <span className="ml-2 text-medium">My Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="px-4 py-3">
                                    <a href="#" className="flex items-center text-sm ">
                                        <FontAwesomeIcon icon={faCog} />
                                        <span className="ml-2 text-medium">Account Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="px-4 py-3">
                                    <a href="#" className="flex items-center text-sm">
                                        <FontAwesomeIcon icon={faQuestionCircle} />
                                        <span className="ml-2 text-medium">Need Help?</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="px-4 py-3">
                                    <button onClick={logout} className="flex items-center text-sm w-full text-left">
                                        <FontAwesomeIcon icon={faSignOutAlt} />
                                        <span className="ml-2 text-medium">Sign Out</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <FeatherIcon
                    aria-label="anchor"
                    onClick={handleSettingsClick}
                    icon={Settings}
                    size={17}
                    className="cursor-pointer"
                />
            </div>
        </div>
    );

    // -----------------------------
    // STEP: DESKTOP / TABLET LAYOUT
    // - This block preserves your original desktop layout closely.
    // - DropdownAutoSuggest stays visible here (inside the left area) and SelectDropdown is shown as before.
    // - Minor fixes: ensure the burger appears only in the intended conditions on desktop.
    // -----------------------------
    const DesktopHeader = (
        <div className={`mx-auto flex items-center h-full w-full pb-0.5`}>
            <div className=" flex justify-between items-center w-full">
                {/* Left Side (Logo or Branding) */}
                <div className="hidden relative w-1/2 md:flex items-center pl-0">

                    {/* Sidebar Header */}
                    <div className="flex h-[40px] sidebar-header">
                        <Link to={'/webapp/dashboard'}>
                            <div
                                className={`flex items-center transition-all duration-500 ease-in-out overflow-hidden
                                ${isSideBarOpen ? "w-[15rem] pl-0" : "w-[40px]"}`}
                            >
                                {/* Expanded Logo */}
                                <img
                                    src="/click_logo_2.png"
                                    alt="Click Logo"
                                    className={`absolute h-[45px] object-contain ml-2 mt-1 transition-all duration-500 ease-in-out
                                ${isSideBarOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                                />

                                {/* Collapsed Logo */}
                                <img
                                    src="/ielog.png"
                                    alt="Ielog logo"
                                    className={`h-[40px] w-[40px] p-0 object-contain transition-all duration-500 ease-in-out
                                ${isSideBarOpen ? "opacity-0 scale-150" : "opacity-100 scale-100"}`}
                                />
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center pe-[1rem] h-full">
                        {/* Toggle Button Wrapper with Transition */}
                        <div
                            className={`transition-all duration-500 ease-in-out ${isSideBarOpen ? "ml-[1rem]" : "ml-5"}`}
                        >
                            {/* Mobile: show burger when not on /dashboard - kept for desktop hover-mode */}
                            {screenSize === "mobile" && !location.pathname.endsWith('webapp/dashboard') && (

                                <>
                                    {/* Home Button */}
                                    <FeatherIcon
                                        onClick={homePage} // or use <Link to="/" /> if you want router navigation
                                        icon={Home}
                                        size={17}
                                        className="mr-3 cursor-pointer hover"
                                    />

                                    <AllignLeft
                                        onClick={handleToggleSideBar}
                                        className="cursor-pointer"
                                        color={theme === "dark" ? "white" : "white"}
                                        height={30}
                                        width={30}
                                    />

                                </>
                            )}



                            {/* Desktop: show burger only when hover-mode is active */}
                            {screenSize !== "mobile" && isSidebarOpenByHover && (
                                <AllignLeft
                                    onClick={handleToggleSideBar}
                                    className="cursor-pointer"
                                    color={theme === "dark" ? "white" : "white"}
                                    height={30}
                                    width={30}
                                />
                            )}
                        </div>
                    </div>


                    <div className="w-100">
                        <DropdownAutoSuggest
                            name="searchbarMenus"
                            onSelect={(value, label) => {
                                if (value && value !== "") {
                                    navigate(value);
                                }
                            }}
                            className="mt-1"
                            inputWidth={80}
                            showListIcon={true}
                        />
                    </div>
                </div>


                {/* Right Side (Navigation Links and User Profile) */}
                <div className=" flex items-center ml-auto h-full">
                    {/* ------------------------------- */}
                    {/* COMPANY SELECT - HIDE ON MOBILE */}
                    {/* ------------------------------- */}
                    {!isMobile && (
                        <div className="mr-2">
                            <SelectDropdown
                                options={companies}
                                value={String(company?.companyId) || ""}
                                isSameKeyValue={false}
                                labelKey="name"
                                valueKey="companyId"
                                onChange={(_, item) => setCompany(item ?? null)}
                                className="mt-1"
                            />
                        </div>
                    )}

                    {screenSize === "mobile" && moduleName.toLowerCase() !== "dashboard" && (
                        <FontAwesomeIcon
                            onClick={homePage}
                            icon={faHome}
                            className="cursor-pointer ml-2 mr-2 mt-1"
                        />
                    )}
                    {
                        screenSize === "mobile" && (
                            <Link to="/" className="block">
                                <FeatherIcon
                                    icon={Home}
                                    size={17}
                                    className=" mr-3 cursor-pointer hover text-[0.875rem]"
                                />
                            </Link>
                        )
                    }

                    {/* Desktop: theme, bell, fullscreen (we keep these visible on desktop) */}
                    {!isMobile && (
                        <>
                            {/* Home Button */}
                            <Link to="/" className="block">
                                <FeatherIcon
                                    onClick={homePage} // or use <Link to="/" /> if you want router navigation
                                    icon={Home}
                                    size={17}
                                    className="mr-3 cursor-pointer hover"
                                />
                            </Link>

                            <FeatherIcon
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                icon={theme === "dark" ? Sun : Moon}
                                size={17}
                                className=" mr-3 cursor-pointer hover "
                            />

                            <FeatherIcon icon={Bell} size={17} className="mr-3 cursor-pointer hover" />

                            <FeatherIcon onClick={toggleFullScreen} icon={fullScreen ? Minimize2 : Maximize2} size={17} className=" mr-3 cursor-pointer hover" />
                        </>
                    )}

                    {/* Profile Dropdown (desktop) */}
                    {!isMobile && (
                        <div className="relative" ref={profileRef}>
                            <a
                                href="#"
                                className="nav-link hover flex items-center "
                                aria-label="Profile"
                                aria-haspopup="true"
                                onClick={toggleProfile}
                            >
                                <img
                                    src={profile_img}
                                    alt="Profile"
                                    className="rounded-full h-8 w-8 object-cover "
                                />
                                <span className="mx-3 text-[0.875rem] font-medium ">
                                    Admin
                                </span>
                            </a>

                            {showProfile && (
                                <ul className="dropdown-menu profile absolute rounded-md top-full w-80 text shadow-md -right-3">
                                    <li className="dropdown-header">
                                        <h6 className="font-semibold ">Admin</h6>
                                        <span className="text-medium">Administrator</span>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li className="px-4 py-3">
                                        <a
                                            href="#"
                                            className="flex items-center text-sm"
                                        >
                                            <FontAwesomeIcon
                                                icon={faUser}
                                            />
                                            <span className="ml-2 text-medium">My Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li className="px-4 py-3">
                                        <a
                                            href="#"
                                            onClick={logout}
                                            className="flex items-center text-sm"
                                        >
                                            <FontAwesomeIcon
                                                icon={faSignOutAlt}
                                            />
                                            <span className="ml-2 text-medium">Sign Out</span>
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li className="px-4 py-3">
                                        <a
                                            href="#"
                                            className="flex items-center text-sm "
                                        >
                                            <FontAwesomeIcon icon={faCog} />
                                            <span className="ml-2 text-medium">Account Settings</span>
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li className="px-4 py-3">
                                        <a
                                            href="#"
                                            className="flex items-center text-sm"
                                        >
                                            <FontAwesomeIcon icon={faQuestionCircle} />
                                            <span className="ml-2 text-medium">Need Help?</span>
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}

                    {/* Settings Icon (desktop) */}
                    {!isMobile && (
                        <FeatherIcon
                            aria-label="anchor"
                            onClick={handleSettingsClick}
                            icon={Settings}
                            size={17}
                            className="duration-300  mr-5 cursor-pointer hover" />
                    )}
                </div>
            </div>
        </div>
    );



    const TabletHeader = (
        <div className="flex items-center justify-between w-full px-4 py-1">
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-3">
                <div className="cursor-pointer" onClick={handleToggleSideBar}>
                    {isSideBarOpen ? <X size={20} /> : <AlignLeft size={20} />}
                </div>

                {/* Logo (smaller) */}
                <Link to="/webapp/dashboard" className="flex items-center">
                    <img
                        src="/click_logo_2.png"
                        alt="Click Logo"
                        className="h-[28px] object-contain"
                    />
                </Link>

                {/* Optional: Module Name */}
                <h3 className="text-sm font-medium ml-2">{moduleName}</h3>
            </div>

            {/* Right: Icons + Profile */}
            <div className="flex items-center gap-3">
                {/* Home Button */}
                <FeatherIcon icon={Home} size={18} className="cursor-pointer" onClick={homePage} />

                {/* Theme Switch */}
                <FeatherIcon
                    icon={theme === "dark" ? Sun : Moon}
                    size={18}
                    className="cursor-pointer"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                />

                {/* Notifications */}
                <FeatherIcon icon={Bell} size={18} className="cursor-pointer" />

                {/* Fullscreen */}
                <FeatherIcon
                    icon={fullScreen ? Minimize2 : Maximize2}
                    size={18}
                    className="cursor-pointer"
                    onClick={toggleFullScreen}
                />

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                    <button onClick={toggleProfile} className="flex items-center">
                        <img
                            src={profile_img}
                            alt="Profile"
                            className="rounded-full h-7 w-7 object-cover"
                        />
                    </button>

                    {showProfile && (
                        <ul className="dropdown-menu profile absolute right-0 top-full w-64 mt-2 rounded-md shadow-md">
                            <li className="px-4 py-3 border-b">
                                <span className="font-semibold">Admin</span>
                                <p className="text-sm text-gray-500">Administrator</p>
                            </li>
                            <li>
                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Sign Out
                                </button>
                            </li>
                        </ul>
                    )}
                </div>

                {/* Settings */}
                <FeatherIcon
                    icon={Settings}
                    size={18}
                    className="cursor-pointer"
                    onClick={handleSettingsClick}
                />
            </div>
        </div>
    );


    return (
        <nav
            className={`navbar fixed flex items-center top-0 !h-[38px] duration-500 ease-in-out z-30
            ${isMobile ? "left-0 w-full" : ((!isFirstPage) ? ((isSideBarOpen || !isSidebarOpenByHover)
                    ? "left-0 w-full"
                    : "left-0 w-full")
                    : "left-0 w-full")}
            ${moduleName.toLowerCase()} `}
        >
            {isMobile ? MobileHeader : DesktopHeader}

        </nav>

        
    );
};

export default TopNavBar;
