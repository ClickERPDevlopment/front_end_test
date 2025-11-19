import { AppDispatch, RootState } from "@/app/store";
import Button from "@/components/form/Button";
import Checkbox from "@/components/form/Checkbox";
import { Column } from "@/components/data-display/CustomDataTable";
import CustomDatePicker from "@/components/form/CustomDatePicker";
import { FormField } from "@/components/form/FormField";
import PageHeader from "@/components/layout/PageHeader";
import Panel from "@/components/layout/Panel";
import SelectDropdown from "@/components/form/SelectDropdown";
import { ICompany } from "@/modules/configurations/pages/companySetup/company.interface";
import { IFloor } from "@/modules/configurations/pages/floorSetup/floor.interface";
import { IBuyer } from "@/modules/merchandising/pages/buyerSetup/buyerSetup.interface";
import { IColor } from "@/modules/merchandising/pages/colorSetup/colorSetup.interface";
import { faAdd, faEraser, faFileLines, faRemove, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IGmtPurchaseOrder } from "../../types/poData.interface";
import { IStyle } from "../../types/style.interface";
import managementDashboardJson from './management_data.json';
import { DashboardData } from "./typesManagement";
import { useTheme } from "@/hooks/useTheme";
import { getRoutes, RouteLayout } from "@/app/constants";
import { formatDate } from "@/utils/dateUtil";
import { useHotToast } from "@/utils/hotToast.util";
import { duplexPair } from "stream";
import { GetAllConfigBuyer } from "@/modules/merchandising/reduxSlices/buyer.Slice";
import DropdownAutoSuggest from "@/components/form/DropdownAutoSuggest";
import { setDropdownData } from "@/app/dropdownSlice";
import { GetAllConfigStyle } from "@/modules/merchandising/reduxSlices/configStyle.Slice";
import { GetAllPurchaseOrder } from "@/modules/merchandising/reduxSlices/purchaseOrderSlice";
import { GetAllSecCompany } from "@/modules/configurations/reduxSlices/companySlice";

const SewingSummaryReportForm = () => {
    const { companies, } = useSelector((state: RootState) => state.company);
    const { buyers } = useSelector((state: RootState) => state.buyer);
    const { styles } = useSelector((state: RootState) => state.configStyle);
    const { purchaseOrders } = useSelector((state: RootState) => state.purchaseOrder);
    const [isDateRange, setIsDateRange] = useState<boolean>(false)
    const { company, layout } = useTheme();
    const { showHotError, showHotSuccess } = useHotToast();

    const webRoutes = getRoutes("report");

    const [formData, setFormData] = useState<{
        fromDate: Date;
        toDate: Date;
        factoryId: string;
    }>({
        fromDate: new Date(),
        toDate: new Date(),

        factoryId: String(company?.companyId),
    });

    const showError = (message: string, width = "280px") => {
        showHotError(message, {
            bgColor: "#FF0000",
            textColor: "#ffffff",
            width,
        });
    };

    const validateForm = () => {
        return true;
    };


    const handleShowReport = () => {
        if (!validateForm()) return;

        const params = new URLSearchParams({
            fromDate: searchData.date,
        });

        const url = `${webRoutes.SEWING_SUMMARY_REPORT}?${params.toString()}`;
        window.open(url, "_blank");
    };


    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {

    }, [dispatch])


    useEffect(() => {
        dispatch(setDropdownData({
            data: companies,
            name: "companyList",
            labelKey: "name",
            valueKey: "id",
        }));
    }, [companies]);


    type SearchDataType = {
        date: string;
        factoryId: number;
        factoryName: string;
    };

    const [searchData, setSearchData] = useState<SearchDataType>({
        date: new Date().toISOString().split("T")[0],
        factoryId: 0,
        factoryName: ""
    });

    const handleChangeSearchInfo = (
        field: keyof SearchDataType,
        value: string | number,
        displayVal?: string
    ) => {

        setSearchData((prev) => ({
            ...prev,
            [field]: value,
            ...(field === "factoryId" && displayVal ? { factoryName: displayVal } : {}),
        }));
    };

    return (
        <Panel className="min-h-screen p-4 sm:p-6 overflow-auto" rounded={false}>

            <div className="mt-5 space-y-2">
                <div>
                    {/* Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        <FormField label="Date" id="" variant="block">
                            <CustomDatePicker
                                selected={searchData.date ? new Date(searchData.date) : null}
                                onChange={(date) => handleChangeSearchInfo("date", date?.toISOString() || "")}
                            />
                        </FormField>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        {/* Show Button */}
                        <Button
                            className="flex items-center justify-center gap-2 w-full sm:w-auto"
                            variant="filled"
                            size="sm"
                            onClick={handleShowReport}
                        >
                            <FontAwesomeIcon icon={faFileLines} /> Show
                        </Button>
                    </div>
                </div>
            </div>
        </Panel>
    );
};

export default SewingSummaryReportForm;
