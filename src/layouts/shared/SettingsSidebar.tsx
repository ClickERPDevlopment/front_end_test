import { AppDispatch } from "@/app/store";
import { useTheme } from "@/hooks/useTheme";
import { fetchAllMenusJsonByReset } from "@/modules/configurations/reduxSlices/menuSlice";
import { faRefresh, faTimes } from "@fortawesome/free-solid-svg-icons"; // You can also use faXmark
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/form/Button";
import Tabs from "../../components/layout/Tabs";
import ThemeColor from "./SettingComponents/ThemeColor";
import ThemeStyle from "./SettingComponents/ThemeStyle";
import UtilsSetup from "./SettingComponents/UtilsSetup";
import ToastSettings from "./SettingComponents/ToastSettings";
import DropdownSidebar from "@/components/layout/DropdownSidebar";


interface SettingsSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

// const tabs = [
//     { label: 'Theme Style', content: <ThemeStyle /> },
//     { label: 'Theme Colors', content: <ThemeColor /> },
//     { label: 'Utils', content: <UtilsSetup /> },
//     { label: 'Toast', content: <ToastSettings /> },
// ];


const sections = [
    { label: "Theme Style", content: <ThemeStyle /> },
    { label: "Theme Colors", content: <ThemeColor /> },
    { label: "Utils", content: <UtilsSetup /> },
    { label: "Toast", content: <ToastSettings /> },
];


const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ isOpen, onClose }) => {
    const dispatch: AppDispatch = useDispatch();
    const {
        setTheme,
        setDirection,
        setFontSize,
        setThemeName

    } = useTheme();

    return (
        <div className={`text switcher fixed top-0 right-0 w-[350px] h-full shadow-lg transition-all duration-300 ease-in-out z-100 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

            <button onClick={onClose} className="absolute top-4 right-5 text-2xl  rounded-full border-1 h-7 w-7 flex items-center justify-center">
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
            <div className="space-y-4">
                <h2 className="text-lg px-5 pt-5">Switcher</h2>
                {/* <Tabs
                    tabs={tabs}
                    tabButtonClassName="w-full text-xs"
                    variant="underline"
                /> */}

                <DropdownSidebar sections={sections} allowMultiple={false} />

                {/* Reset Button */}
                <Button
                    variant="outlined"
                    size="sm"
                    onClick={() => {
                        setTheme("light");
                        setDirection("ltr");
                        setFontSize("16px");
                        setThemeName("default");
                    }}
                    className="w-full text-center"
                >
                    <FontAwesomeIcon icon={faRefresh} /> Reset
                </Button>



                <Button
                    variant="outlined"
                    className="w-full text-center"
                    size="sm"
                    onClick={() => {
                        const segments = location.pathname.split("/").filter(Boolean);
                        const secondSegment = segments[1];
                        dispatch(fetchAllMenusJsonByReset(secondSegment))
                    }}>
                    <FontAwesomeIcon icon={faRefresh} />  <span className="text-sm">Refresh Menu</span>
                </Button>

            </div>
        </div>
    );
};

export default SettingsSidebar;
