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
import { faAdd, faEraser, faFileLines, faRemove } from "@fortawesome/free-solid-svg-icons";
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

const MonthlStyleWiseProductionSummaryReportForm = () => {
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

    const handleChange = (field: keyof typeof formData, value: string | Date | null | number[],
        option?: IBuyer | IColor | IStyle | IGmtPurchaseOrder | IFloor | null,
        displayValue?: string) => {

        setFormData(prev => ({
            ...prev,
            [field]: value,

        }));
    };

    const handleClear = () => {
        setFormData({
            fromDate: new Date(),
            toDate: new Date(),
            factoryId: String(company?.companyId),
        })
    }

    const showError = (message: string, width = "280px") => {
        showHotError(message, {
            bgColor: "#FF0000",
            textColor: "#ffffff",
            width,
        });
    };

    const validateForm = () => {

        // if (!searchData.buyerId || searchData.buyerId === 0) {
        //     showError("Please select a buyer");
        //     return false;
        // }

        // if (!searchData.styleId || searchData.styleId == 0) {
        //     showError("Please select a style");
        //     return false;
        // }

        // if (!formData.fromDate || !formData.toDate) {
        //     showError("Please select both From Date and To Date");
        //     return false;
        // }

        // if (formData.fromDate > formData.toDate) {
        //     showError("From Date cannot be after To Date");
        //     return false;
        // }

        return true;
    };


    const handleShowReport = () => {
        if (!validateForm()) return;

        const params = new URLSearchParams({
            factoryId: searchData.factoryId.toString(),
            buyerId: searchData.buyerId.toString(),
            fromDate: searchData.fromDate,
            toDate: searchData.toDate,
        });

        const url = `${webRoutes.MONTHLY_STYLE_WISE_PRODUCTION_SUMMARY_REPORT}?${params.toString()}`;
        window.open(url, "_blank");
    };


    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {

        dispatch(GetAllConfigBuyer())
        dispatch(GetAllSecCompany())

    }, [dispatch])


    useEffect(() => {
        dispatch(setDropdownData({
            data: buyers,
            name: "buyerList",
            labelKey: "NAME",
            valueKey: "Id",
        }));
    }, [buyers]);

    type SearchDataType = {
        fromDate: string;
        toDate: string;
        fromOPMDate: string;
        toOPMDate: string;
        factoryId: number;
        buyerId: number;
        styleId: number;
        colorId: number;
        poId: number;
        po: string;
    };



    const [searchData, setSearchData] = useState<SearchDataType>({
        fromDate: new Date().toISOString().split("T")[0],
        toDate: new Date().toISOString().split("T")[0],
        fromOPMDate: new Date().toISOString().split("T")[0],
        toOPMDate: new Date().toISOString().split("T")[0],
        factoryId: 0,
        buyerId: 0,
        styleId: 0,
        colorId: 0,
        poId: 0,
        po: "",
    });

    const handleChangeSearchInfo = (field: keyof SearchDataType, value: string | number) => {
        setSearchData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <Panel className="min-h-screen p-4 sm:p-6 overflow-auto" rounded={false}>
            <div className="mt-5 space-y-2">

                {/* Factory */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    <FormField label="Factory" id="factory" variant="block">
                        <SelectDropdown
                            options={companies}
                            value={formData.factoryId}
                            isSameKeyValue={false}
                            labelKey="name"
                            valueKey="companyId"
                            onChange={(val, item) => handleChangeSearchInfo("factoryId", val)}
                            // onChange={(val, item) => handleChange("factoryId", val)}
                            className="w-full bg-white dark:bg-gray-800"
                        />
                    </FormField>
                </div>

                {/* From Date */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-2">
                    <FormField label="From Date" id="" variant="block">
                        <CustomDatePicker
                            selected={searchData.fromDate ? new Date(searchData.fromDate) : null}
                            onChange={(date) => handleChangeSearchInfo("fromDate", date?.toISOString() || "")}
                        />
                    </FormField>
                    <FormField label="To Date" id="" variant="block">
                        <CustomDatePicker
                            selected={searchData.toDate ? new Date(searchData.toDate) : null}
                            onChange={(date) => handleChangeSearchInfo("toDate", date?.toISOString() || "")}
                        />
                    </FormField>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    <FormField
                        label="Buyer"
                        id="buyer"
                        variant="inline"
                        labelFontSize="text-sm"
                    >
                        <DropdownAutoSuggest
                            name="buyerList"
                            onSelect={(val, displayVal) =>
                                handleChangeSearchInfo("buyerId", val)
                            }
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

                    {/* Clear Button */}
                    {/* <Button
                        className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gray-500 hover:bg-gray-600"
                        variant="filled"
                        size="sm"
                        onClick={handleClear}
                    >
                        <FontAwesomeIcon icon={faEraser} /> Clear
                    </Button> */}
                </div>
            </div>
        </Panel>
    );
};

export default MonthlStyleWiseProductionSummaryReportForm;
