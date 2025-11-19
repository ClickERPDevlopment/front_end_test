import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoreVertical } from "react-feather";
import { VoucherDetails, VoucherMaster } from "./voucher.interface";
import { AppDispatch, RootState } from "@/app/store";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import { DropdownButton } from "@/components/form/DropdownButton";
import { fetchAllChartOfAccountsJson, fetchCOAForVoucherEntery } from "../../reduxSlices/chartOfAccountSlice";

import { fetchAllVoucherTypesJson } from "../../reduxSlices/voucherTypeSlice";

import { fetchAllProjectsJson } from "../../reduxSlices/projectSlice";
import { setDropdownData } from "@/app/dropdownSlice";
import { formatDate } from "date-fns";
import Panel from "@/components/layout/Panel";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { VoucherMasterInfo } from "./VoucherFormChilds/VoucherMasterInfo";
import { VoucherDetailsInfo } from "./VoucherFormChilds/VoucherDetailsInfo";

interface SizeRowType {
    id: number;
    sizeName: string;
    ratio: number;
    maxRatio: number;
}

const VoucherEntry: React.FC = () => {
    const [formData, setFormData] = useState<VoucherMaster>({
        bussinessUnitId: 0,
        bussinessUnitName: "",
        costCenterId: 0,
        costCenterName: "",
        maturityDate: "",
        narration: "",
        projectId: 0,
        projectName: "",
        voucherDate: "",
        voucherId: 0,
        voucherNo: "",
        voucherTypeId: 0,
        voucherTypeName: "",
        voucherScope: ""
    });

    const [formDetailsData, setFormDetailsData] = useState<VoucherDetails>({
        balance: 0,
        chequeDate: "",
        chequeNo: "",
        costCenterId: 0,
        costCenterName: "",
        credit: 0,
        currencyId: 0,
        currencyName: "",
        currencyRate: 0,
        debit: 0,
        ledgerId: 0,
        ledgerName: "",
        note: "",
        refNo: "",
        transactionType: "DR",
        bussinessUnitId: 0,
        bussinessUnitName: "",
        currencyAmount: 0
    });

    const dispatch: AppDispatch = useDispatch();

    const { chartOfAccounts, filteredDebitSideCoa, filteredCreditSideCoa } = useSelector((state: RootState) => state.chartOfAccount);
    const { voucherTypes } = useSelector((state: RootState) => state.voucherType);
    const { businessUnits } = useSelector((state: RootState) => state.businessUnit);
    const { currencies } = useSelector((state: RootState) => state.currency);
    const { costCenters } = useSelector((state: RootState) => state.costCenter);
    const { projects } = useSelector((state: RootState) => state.project);

    const [sizeRows, setSizeRows] = useState<SizeRowType[]>([]);

    const [detailsRows, setDetailsRow] = useState<VoucherDetails[]>([]);
    const [editableIndex, setEditableIndex] = useState<number | null>(null);

    const handleRatioChange = <T extends keyof SizeRowType>(
        index: number,
        field: T,
        value: SizeRowType[T]
    ) => {

        const updated = [...sizeRows];
        updated[index][field] = value;
        setSizeRows(updated);
    };

    // Set a row to edit mode
    const handleEditRow = (index: number) => {
        setEditableIndex(index);
    };

    // Delete a row from the list
    const handleDeleteRow = (index: number) => {
        setDetailsRow((prev) => prev.filter((_, i) => i !== index));
        if (editableIndex === index) setEditableIndex(null);
    };

    const detailsColumns: Column<VoucherDetails>[] = [
        {
            key: "actions",
            header: "",
            width: "w-12",
            align: "center",
            render: (_item, index) => (
                <DropdownButton
                    icon={<MoreVertical size={16} />}
                    size="sm"
                    className="bg-transparent border-none"
                    label=""
                >
                    <ul className="text-sm">
                        <li
                            onClick={() => handleEditRow(index)}
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Edit
                        </li>
                        <li
                            onClick={() => handleDeleteRow(index)}
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Delete
                        </li>
                    </ul>
                </DropdownButton>
            ),
        },
        { key: 'ledgerName', header: 'Ledger', align: 'center' },
        { key: 'debit', header: 'Dr', align: 'center' },
        { key: 'credit', header: 'Cr', align: 'center' },
        { key: 'currencyName', header: 'Cur.', align: 'center' },
        { key: 'currencyAmount', header: 'Cur. Amt', align: 'center' },
        { key: 'currencyRate', header: 'Cur. Rate', align: 'center' },
        { key: 'chequeNo', header: 'Cheque No', align: 'center' },
        { key: 'costCenterName', header: 'Costcenter', align: 'center' },
        { key: 'bussinessUnitName', header: 'Bussiness Unit', align: 'center' },
        { key: 'refNo', header: 'RefNo', align: 'center' },
    ];

    useEffect(() => {
        document.title = "Voucher Entry";
        dispatch(fetchAllChartOfAccountsJson())
        // dispatch(fetchAllBusinessUnitsJson())
        dispatch(fetchAllVoucherTypesJson())
        // dispatch(fetchAllCostCentersJson())
        dispatch(fetchAllProjectsJson())

        // Optionally return a cleanup function if needed
        return () => {
            // Reset title or do other cleanup if needed
            document.title = "";
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            setDropdownData({
                name: 'ledgers',
                data: chartOfAccounts,
                labelKey: 'accName',
                valueKey: 'accNo',
            })
        );
    }, [chartOfAccounts]);

    useEffect(() => {
        dispatch(
            setDropdownData({
                name: 'debitLedgers',
                data: filteredDebitSideCoa,
                labelKey: 'accName',
                valueKey: 'accNo',
            })
        );
    }, [filteredDebitSideCoa]);

    useEffect(() => {
        dispatch(
            setDropdownData({
                name: 'creditLedgers',
                data: filteredCreditSideCoa,
                labelKey: 'accName',
                valueKey: 'accNo',
            })
        );
    }, [filteredCreditSideCoa]);

    useEffect(() => {
        dispatch(
            setDropdownData({
                name: 'costCenters',
                data: costCenters,
                labelKey: 'costName',
                valueKey: 'costNo',
            })
        );
    }, [costCenters]);

    useEffect(() => {
        dispatch(
            setDropdownData({
                name: 'projects',
                data: projects,
                labelKey: 'projectName',
                valueKey: 'id',
            })
        );
    }, [projects]);

    const handleChange = (key: keyof VoucherMaster, value: string, displayValue?: string) => {
        if (key === 'voucherTypeId') {
            dispatch(fetchCOAForVoucherEntery({ nature: Number(displayValue) }))
        }
        setFormData((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const handleChangeDetails = (key: keyof VoucherDetails, value: string) => {

        if (key === "bussinessUnitId") {
            // dispatch(fetchAllDistinctColorsByPoNo({ poNo: value }))
        }

        setFormDetailsData((prev) => ({ ...prev, [key]: value }));
    };

    const handleDateChange = (field: string, date: Date | null) => {

        setFormData((prevData) => ({
            ...prevData,
            [field]: formatDate((date ? date.toISOString() : ""), "db_format"),
        }));
    };

    const handleOnClickAddDetails = () => {
        setDetailsRow((prev) => [...prev, formDetailsData]);
    }

    return (
        <Panel >
            <Breadcrumb
                items={[
                    { label: "Accounts", },
                    { label: "Transaction", },
                    { label: "Voucher Entry" }
                ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">

                <VoucherMasterInfo
                    formData={formData}
                    onChange={handleChange}
                    onDateChange={handleDateChange}
                    businessUnits={businessUnits}
                    voucherTypes={voucherTypes}
                />

                {
                    formData.voucherTypeId > 0
                    && <VoucherDetailsInfo
                        formData={formDetailsData}
                        onChange={handleChangeDetails}
                        currencies={currencies}
                        onClick={() => handleOnClickAddDetails()}
                        voucherScope={formData.voucherScope}
                    />
                }

            </div>

            {/* Bottom Section: Full-width Table */}
            <div className="grid grid-cols-1 ">
                <div className="space-y-4 col-span-1">
                    <CustomDataTable
                        columns={detailsColumns}
                        data={detailsRows}
                        fixedHeight="h-[220px]"
                    />
                </div>
            </div>
        </Panel>
    );
};

export default VoucherEntry;
