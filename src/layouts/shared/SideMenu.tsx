import type React from "react";
import MultiLabelMenu from "./MultiLabelMenu"
import { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllMenus } from "@/modules/configurations/reduxSlices/menuSlice";
import SimpleBar from "simplebar-react";

interface SideMenuProps {
    isSidebarOpen: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ isSidebarOpen }) => {
    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();
    const { menus: menuItems, moduleMenus } = useSelector((state: RootState) => state.menu);
    const [isHovered, setIsHovered] = useState(false);
    const { modules } = useSelector((state: RootState) => state.module);
    const navigate = useNavigate();

    useEffect(() => {
        const segments = location.pathname.split("/").filter(Boolean);
        const secondSegment = segments[1];
        const validModules = [
            "pnConfig",
            "pnMerchandiser",
            "pnPlanning",
            "pnPurchase",
            "pnInventory",
            "pnProduction",
            "pnCommercial",
            "pnAccounts",
            "pnPayroll",
            "pnTransportLogistics",
            "pnTextile",
            "pnIE",
            "pnQuality",
            "pnPrintingEmbroidery",
            "pnPurchase",
            "report"
        ];
        if (validModules.includes(secondSegment)) {
            dispatch(fetchAllMenus(secondSegment));
        }
    }, [location, dispatch]);

    const isDashboard = location.pathname.endsWith("/webapp/dashboard");

    return (
        <aside
            className={`fixed top-[38px] left-0 h-screen bg-white dark:bg-gray-900 border-r
        transition-[width] duration-300 ease-in-out
        ${isSidebarOpen ? "w-[240px]" : "w-[50px]"}
      `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex-1 h-[calc(100vh-50px)] overflow-y-auto">
                    {isDashboard ? (
                        moduleMenus.map((record, i) => (
                            <div key={i}>
                                {Object.entries(record).map(([moduleName, items]) => {
                                    const module = modules?.find((m) => m.name === moduleName);
                                    return (
                                        <>
                                            <div
                                                key={moduleName}
                                                className="flex items-center gap-2 py-2 px-2 font-bold text-[12px]"
                                            >
                                                {module?.image && (
                                                    <img
                                                        src={module.image}
                                                        alt={module.name}
                                                        className="w-4 h-6 object-contain rounded"
                                                    />
                                                )}
                                                {isSidebarOpen && (
                                                    <span className="text-[14px] truncate flex-1">
                                                        {moduleName}
                                                    </span>
                                                )}
                                            </div>

                                            <MultiLabelMenu
                                                items={items}
                                                isSidebarOpen={isSidebarOpen}
                                            />
                                        </>
                                    );
                                })}
                            </div>
                        ))
                    ) : (
                        <MultiLabelMenu
                            items={menuItems}
                            isSidebarOpen={isSidebarOpen}
                        />
                    )}
                </div>
        </aside>
    )
}

export default SideMenu