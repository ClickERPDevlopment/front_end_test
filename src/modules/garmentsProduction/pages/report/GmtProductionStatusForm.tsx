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
import { useState } from "react";
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

const GmtProductionStatusForm = () => {
    const { companies, } = useSelector((state: RootState) => state.company);
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
        if (!formData.factoryId || formData.factoryId.trim() === "") {
            showError("Please select a factory");
            return false;
        }

        if (!formData.fromDate || !formData.toDate) {
            showError("Please select both From Date and To Date");
            return false;
        }

        if (formData.fromDate > formData.toDate) {
            showError("From Date cannot be after To Date");
            return false;
        }

        return true;
    };


    const handleShowReport = () => {
        if (!validateForm()) return; // stop if validation fails


        let url = `${webRoutes.PRODUCTION_STATUS_REPORT}?factory_id=${formData.factoryId
            }&from_date=${formatDate(
                formData.fromDate.toDateString(),
                "short"
            )}&to_date=${formatDate(formData.toDate.toDateString(), "short")}`;


        window.open(url, "_blank");

    }

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
                            onChange={(val, item) => handleChange("factoryId", val)}
                            className="w-full bg-white dark:bg-gray-800"
                        />
                    </FormField>
                </div>

                {/* From Date */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-2">
                    <FormField label="From Date" id="" variant="block">
                        <CustomDatePicker
                            selected={formData.fromDate ? new Date(formData.fromDate) : null}
                            onChange={(date) => handleChange("fromDate", date)}
                        />
                    </FormField>
                    <FormField label="To Date" id="" variant="block">
                        <CustomDatePicker
                            selected={formData.toDate ? new Date(formData.toDate) : null}
                            onChange={(date) => handleChange("toDate", date)}
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
                    <Button
                        className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gray-500 hover:bg-gray-600"
                        variant="filled"
                        size="sm"
                        onClick={handleClear}
                    >
                        <FontAwesomeIcon icon={faEraser} /> Clear
                    </Button>
                </div>
            </div>
        </Panel>
    );
};

export default GmtProductionStatusForm;
