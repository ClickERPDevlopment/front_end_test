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

const SewingProductionStatusReportForm = () => {
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

        // if (!searchData.factoryId || searchData.factoryId == 0) {
        //     showError("Please select a factory");
        //     return false;
        // }

        return true;
    };


    const handleShowReport = () => {
        if (!validateForm()) return;

        const params = new URLSearchParams({
            factoryIdString: companySearchData.map(item => item.id).join(","),
            dtDate: searchData.date,
        });

        const url = `${webRoutes.SEWING_PRODUCTION_STATUS_REPORT}?${params.toString()}`;
        window.open(url, "_blank");
    };


    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {

        // dispatch(GetAllConfigBuyer())
        // dispatch(GetAllConfigStyle())
        // dispatch(GetAllPurchaseOrder())
        dispatch(GetAllSecCompany())

    }, [dispatch])


    // useEffect(() => {
    //     dispatch(setDropdownData({
    //         data: buyers,
    //         name: "buyerList",
    //         labelKey: "NAME",
    //         valueKey: "Id",
    //     }));
    // }, [buyers]);

    // useEffect(() => {
    //     dispatch(setDropdownData({
    //         data: styles,
    //         name: "styleList",
    //         labelKey: "Styleno",
    //         valueKey: "Id",
    //     }));
    // }, [styles]);

    // useEffect(() => {
    //     dispatch(setDropdownData({
    //         data: purchaseOrders,
    //         name: "purchaseOrderList",
    //         labelKey: "Pono",
    //         valueKey: "Id",
    //     }));
    // }, [purchaseOrders]);



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


    const [companySearchData, setCompanySearchData] = useState<{ id: number; name: string }[]>([]);

    const handleCompanyAdd = () => {
        if (searchData.factoryId && searchData.factoryName) {
            setCompanySearchData((prev) => [
                ...prev,
                { id: searchData.factoryId, name: searchData.factoryName }
            ]);

            setSearchData((prev) => ({
                ...prev,
                factoryId: 0,
                factoryName: ""
            }));
        }
    };


    const handleDeleteCompany = (id: number) => {
        setCompanySearchData((prev) => prev.filter((item) => item.id !== id));
    };

    console.log(companies);


    return (
        <Panel className="min-h-screen p-4 sm:p-6 overflow-auto" rounded={false}>

            <div className="mt-5 space-y-2">
                <div>
                    {/* Factory */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        <FormField label="Date" id="" variant="block">
                            <CustomDatePicker
                                selected={searchData.date ? new Date(searchData.date) : null}
                                onChange={(date) => handleChangeSearchInfo("date", date?.toISOString() || "")}
                            />
                        </FormField>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        <FormField
                            label="Company"
                            id="company"
                            variant="inline"
                            labelFontSize="text-sm"
                        >
                            <DropdownAutoSuggest
                                name="companyList"
                                onSelect={(val, displayVal) =>
                                    handleChangeSearchInfo("factoryId", val, displayVal)
                                }
                            />
                        </FormField>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        <Button
                            className="flex items-center justify-center gap-2 w-full sm:w-auto ms-auto"
                            variant="filled"
                            size="sm"
                            onClick={handleCompanyAdd}
                        >
                            <FontAwesomeIcon icon={faAdd} /> Add
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        <table className="data-table w-full border">
                            <thead>
                                <tr>
                                    <th className="p-2 text-left">#</th>
                                    <th className="p-2 text-left">Company Name</th>
                                    <th className="p-2 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companySearchData.length > 0 ? (
                                    companySearchData.map((item, index) => (
                                        <tr key={item.id} className="border-t">
                                            <td className="p-2">{index + 1}</td>
                                            <td className="p-2">{item.name}</td>
                                            <td className="p-2 text-center">
                                                <button
                                                    onClick={() => handleDeleteCompany(item.id)}
                                                    className="text-red-500 hover:text-red-700 font-semibold"
                                                >
                                                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="p-2 text-center text-gray-500">
                                            No companies added
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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
            </div>
        </Panel>
    );
};

export default SewingProductionStatusReportForm;
