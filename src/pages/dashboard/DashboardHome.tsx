import { useTheme } from "@/hooks/useTheme";
import { fetchAllMenusWithLink, fetchModuleMenus } from "@/modules/configurations/reduxSlices/menuSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import Meta from "../../components/layout/Meta";
import { fetchAllModules } from "../../modules/configurations/reduxSlices/moduleSlice";

const DashboardHome = () => {
    const [title, setTitle] = useState("Modules");
    const dispatch: AppDispatch = useDispatch();
    const { modules } = useSelector((state: RootState) => state.module);
    const { companies } = useSelector((state: RootState) => state.company);
    const { company, setCompany } = useTheme();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [welcomeShown, setWelcomeShown] = useState(false);
    const location = useLocation();
    const token = localStorage.getItem('authToken');
    const { screenSize } = useTheme();

    useEffect(() => {
        dispatch(fetchAllMenusWithLink())
    }, [])

    useEffect(() => {
        setTitle("Modules");
        // Update the document title when the component renders or when `title` changes
        document.title = title;
        dispatch(fetchAllModules())
        // dispatch(fetchAllModulesMenus()) // this one
        // dispatch(fetchAllModulesJson())

        // dispatch(fetchAllGmtPurchaseOrdersJson())
        // Optionally return a cleanup function if needed
        return () => {
            // Reset title or do other cleanup if needed
            document.title = "Default Page Title";

        };
    }, [title]);

    useEffect(() => {
        if (modules.length > 0) {
            dispatch(fetchModuleMenus())
        }

    }, [modules])

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         showHotSuccess("Login Successful!", {
    //             icon: <FaCheckCircle />,
    //             bgColor: "#0f0",
    //             iconSize: 50,
    //             textColor: "#fff",
    //             position: "top-center",
    //             duration: 3000,
    //         });
    //         setWelcomeShown(true);
    //     }
    // }, [isAuthenticated]);


    return (
        <div className="h-full">
            <Meta title="Modules" />
            <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 pt-0 lg:pt-0 gap-4">
                {modules.map((module) => (
                    <Link
                        to={module.link}
                        key={module.name}
                        className="dashboard-tile cursor-pointer p-3 transition-transform duration-300 block"
                    >
                        {screenSize === "mobile" ? (
                            <div className="flex flex-col items-center justify-center gap-1 text-center">
                                {/* Mobile: icon first */}
                                <div className="w-[60px] h-[60px]">
                                    <img
                                        src={module.image}
                                        alt={module.name}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>
                                <div className="text-xs text-[10px] dashboard-tile-text font-bold underline">{module.name}</div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-between gap-3">
                                {/* Desktop: name first */}
                                <div className="w-[120px] h-[120px] flex-shrink-0">
                                    <img
                                        src={module.image}
                                        alt={module.name}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>
                                <div className="flex-1 text-left text-[14px] dashboard-tile-text font-bold underline">
                                    {module.name}
                                </div>
                            </div>
                        )}
                    </Link>
                ))}
            </div>



        </div>
    );
};

export default DashboardHome;
