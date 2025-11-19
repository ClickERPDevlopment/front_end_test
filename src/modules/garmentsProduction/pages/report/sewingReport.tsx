import React, { useEffect, useState } from "react";
import SewingProductionTable from "../../components/SewingProductionTable";
import Panel from "@/components/layout/Panel";
import PageHeader from "@/components/layout/PageHeader";
import LinewiseProductionGraph from "../../components/LinewiseProdudctionGraph";
import FloorwiseProductionGraph from "../../components/FloorwiseProdcutionGraph";
import axiosInstance from "@/api/axiosInstance";
import { FormField } from "@/components/form/FormField";
import CustomDatePicker from "@/components/form/CustomDatePicker";
import SelectDropdown from "@/components/form/SelectDropdown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchAllCompanies } from "@/modules/configurations/reduxSlices/companySlice";
import Button from "@/components/form/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/utils/dateUtil";
import { useTheme } from "@/hooks/useTheme";
import CustomLoader from "@/components/feedback-interaction/CustomLoader";


const SewingReport = () => {
    const { companies } = useSelector((state: RootState) => state.company);
    const [data, setData] = useState<any>(null);
    const { company, setCompany } = useTheme();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<{
        factoryId: string;
        curdate: Date;
    }>({
        factoryId: "",
        curdate: new Date(),
    });

    useEffect(() => {
        document.title = "Hourly Realtime Sewing Production Board";
        dispatch(fetchAllCompanies())

        const searchParams = new URLSearchParams(window.location.search);
        const dtDate = searchParams.get("dtDate");
        const factoryId = searchParams.get("factoryId");

        setFormData({
            factoryId: factoryId || "",
            curdate: dtDate ? new Date(dtDate) : new Date(),
        });
    }, []);

    useEffect(() => {
        if (formData.curdate && !data && formData.factoryId !== "") {
            apiCall()
        }
    }, [formData.curdate]);

    const apiCall = () => {
        axiosInstance
            .get(
                `GmtSewingReport/sewing-hourly-production-board?dtDate=${formatDate(formData.curdate.toLocaleDateString(), 'db_format')}&companyId=${formData.factoryId}`
            )
            .then((res) => setData(res.data))
            .catch((err) => console.error("Failed to load JSON:", err));
    }

    const handleChange = (field: keyof typeof formData, value: string | Date | null | [Date | null, Date | null] | number[],
        displayValue?: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
            ...(displayValue ? { [`${field.replace('Id', 'Name')}`]: displayValue } : {}),
        }));
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        setData(null);
        if (formData.curdate) {
            params.set("dtDate", formatDate(formData.curdate.toLocaleDateString(), 'db_format')); // yyyy-mm-dd
        }
        if (formData.factoryId) {
            params.set("factoryId", formData.factoryId);
        }
        apiCall()
        navigate(`?${params.toString()}`);
    };

    return (
        <Panel
            header={
                <PageHeader
                    title="Hourly Realtime Sewing Production Board"
                />
            }
        >
            <div className="flex mb-5">
                <div className="grid grid-cols-8 gap-2">
                    <FormField label="Production Date" id="cuttingDate" variant="block" labelFontSize="text-xs"
                    >
                        <CustomDatePicker
                            selected={formData.curdate ? new Date(formData.curdate) : null}
                            onChange={(date) => handleChange('curdate', date)}
                            className="h-8"
                        />
                    </FormField>
                    <FormField label="Factory" id="cuttingDate" variant="block" labelFontSize="text-xs"
                    >
                        <SelectDropdown
                            options={companies}
                            value={formData?.factoryId.toString() || ""}
                            isSameKeyValue={false}
                            labelKey="name"
                            valueKey="companyId"
                            onChange={(val) => handleChange('factoryId', val)}
                            className="h-8 text-sm w-full bg-white dark:bg-gray-800"
                        />
                    </FormField>
                    <div>
                        <Button variant="filled" size="sm" className="mt-5" onClick={handleSearch}>
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-[2000px] grid grid-cols-1">
                {data ? (
                    <>
                        <div className="w-[2000px] overflow-y-scroll">
                            <SewingProductionTable data={data} />
                        </div>
                        <div>
                            <LinewiseProductionGraph data={data} />
                        </div>
                        <div>
                            <FloorwiseProductionGraph data={data} />
                        </div>
                    </>
                ) : (
                    <div className="flex justify-center items-center h-80">
                        <CustomLoader
                            size={70}
                            color="bg-blue-600"
                        />
                    </div>
                )}
            </div>

        </Panel>
    );
};

export default SewingReport;
