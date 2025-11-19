import React, { useState } from "react";
import Panel from "@/components/layout/Panel";
import PageHeader from "@/components/layout/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";
import ManagementDashboardTable from "../../components/ManagementDashboardTable";
import { DashboardData } from "./typesManagement";
import managementDashboardJson from '../report/management_data.json';
import Button from "@/components/form/Button";
import { FormField } from "@/components/form/FormField";
import SelectDropdown from "@/components/form/SelectDropdown";
import CustomDatePicker from "@/components/form/CustomDatePicker";
import ManagementBarChart from "../../components/ManagementBarChart";


const ManagementReport = () => {
    const { companies, } = useSelector((state: RootState) => state.company);
    const { buyers, } = useSelector((state: RootState) => state.buyer);

    // const [data, setData] = useState<any>(null);
    const data: DashboardData = managementDashboardJson as DashboardData;
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<{
        buyerId: string;
        factoryId: string;
        fromDate: Date;
        toDate: Date;
    }>({
        buyerId: "",
        factoryId: "",
        fromDate: new Date(),
        toDate: new Date()
    });

    const handleChange = (field: keyof typeof formData, value: string | Date | null | number[],
        displayValue?: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <Panel
            header={
                <PageHeader
                    title="Management Report"
                />
            }
        >
            <div className="flex gap-2">
                <div>
                    <Button
                        onClick={() => { }}
                        size="sm"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        KNIT
                    </Button>
                </div>
                <div>
                    <Button
                        onClick={() => { }}
                        size="sm"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        WOVEN
                    </Button>
                </div>
            </div>

            {/* Input fields/ drop downs */}
            <div className="grid grid-cols-6 mt-3 gap-2">
                <FormField
                    label="Factory"
                    id="factory"
                    variant="block"
                // error={validationErrors?.factory}
                >
                    <SelectDropdown
                        options={companies}
                        value={formData.factoryId}
                        isSameKeyValue={false}
                        labelKey="name"
                        valueKey="companyId"
                        onChange={(val, item) => handleChange('factoryId', val)}
                        className="h-8 text-sm w-full bg-white dark:bg-gray-800"
                    />
                </FormField>
                <FormField
                    label="Buyer"
                    id="buyer"
                    variant="block"
                // error={validationErrors?.factory}
                >
                    <SelectDropdown
                        options={buyers}
                        value={formData.buyerId}
                        isSameKeyValue={false}
                        labelKey="buyerName"
                        valueKey="id"
                        onChange={(val, item) => handleChange('buyerId', val)}
                        className="h-8 text-sm w-full bg-white dark:bg-gray-800"
                    />
                </FormField>
                <div className="flex gap-2">
                    <FormField
                        label="From Date"
                        id="month"
                        variant="block"
                    // error={validationErrors?.factory}
                    >
                        <CustomDatePicker
                            selected={formData.fromDate ? new Date(formData.fromDate) : null}
                            onChange={(date) => handleChange('fromDate', date)}
                            className="h-8"
                            monthYearOnly
                            dateFormat="MM/yyyy"
                        />
                    </FormField>
                    <FormField
                        label="To Date"
                        id="month"
                        variant="block"
                    // error={validationErrors?.factory}
                    >
                        <CustomDatePicker
                            selected={formData.toDate ? new Date(formData.toDate) : null}
                            onChange={(date) => handleChange('toDate', date)}
                            className="h-8"
                            monthYearOnly
                            dateFormat="MM/yyyy"
                        />
                    </FormField>
                </div>
            </div>
            <div className="grid grid-cols-1">
                <div className="grid grid-cols-1 mt-10">
                    <ManagementBarChart data={data} title="Monthly Orders vs Exports" />
                </div>
                <div className="grid grid-cols-1 mt-20">
                    <ManagementDashboardTable data={data} />
                </div>
            </div>
        </Panel>
    );
};

export default ManagementReport;
