import React, { useState } from "react";
import Panel from "@/components/layout/Panel";
import PageHeader from "@/components/layout/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { DashboardData } from "./typesManagement";
import managementDashboardJson from '../report/management_data.json';
import { FormField } from "@/components/form/FormField";
import CustomDatePicker from "@/components/form/CustomDatePicker";
import SelectDropdown from "@/components/form/SelectDropdown";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import Button from "@/components/form/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faFileLines, faRemove } from "@fortawesome/free-solid-svg-icons";


import { IStyle } from "../../types/style.interface";
import { IBuyer } from "@/modules/merchandising/pages/buyerSetup/buyerSetup.interface";
import { ICompany } from "@/modules/configurations/pages/companySetup/company.interface";
import { IColor } from "@/modules/merchandising/pages/colorSetup/colorSetup.interface";

const ShipmentScheduleReport = () => {
    const { companies, } = useSelector((state: RootState) => state.company);
    const { buyers, } = useSelector((state: RootState) => state.buyer);
    const { styles, } = useSelector((state: RootState) => state.style);
    const [tableData, setTableData] = useState<TableRow[]>([]);

    type TableRow = {
        type: string;   // "Factory" | "Buyer" | "Style"
        name: string;   // Display name
        id: number;     // Actual ID
        actions?: string;
    };

    const columns: Column<TableRow>[] = [
        { key: "id", header: "ID", width: "w-10" },
        { key: "type", header: "Type" },
        { key: "name", header: "Name" },
        {
            key: "actions",
            header: "Actions",
            width: "w-20",
            align: "center",
            render: (_item, rowIndex) => (
                <button
                    onClick={() => handleRemoveRow(rowIndex)}
                    className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                >
                    <FontAwesomeIcon icon={faRemove} />
                </button >
            ),
        },
    ];

    // const [data, setData] = useState<any>(null);
    const data: DashboardData = managementDashboardJson as DashboardData;

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<{
        fromExport: Date;
        toExport: Date;
        fromShipment: Date;
        toShipment: Date;
        fromProd: Date;
        toProd: Date;
        factoryId: string;
        buyerId: string;
        poId: string;
        styleId: string;
        isActive: boolean;
        buyer: IBuyer | null;
        style: IStyle | null;
        factory: ICompany | null;
        color: IColor | null;
    }>({
        fromExport: new Date(),
        toExport: new Date(),
        fromShipment: new Date(),
        toShipment: new Date(),
        fromProd: new Date(),
        toProd: new Date(),
        factoryId: "",
        buyerId: "",
        poId: "",
        styleId: "",
        isActive: false,
        buyer: null,
        style: null,
        factory: null,
        color: null,
    });

    // adds a row in table upon selecting from the drop downs 
    const handleAddRow = (type: "Factory" | "Buyer" | "Style") => {
        let id = 0;
        let name = "";

        if (type === "Factory") {
            id = Number(formData.factoryId);
            name = formData.factory?.name || ""
        } else if (type === "Buyer") {
            id = Number(formData.buyerId);
            name = formData.buyer?.buyerName || "";
        } else if (type === "Style") {
            id = Number(formData.styleId);
            name = formData.style?.styleName || "";
        }

        if (!id)
            return; // Prevent empty selection

        setTableData(prev => [...prev, { type, id, name }]);
    };

    // for removing a row from table
    const handleRemoveRow = (rowIndex: number) => {
        setTableData(prev => prev.filter((_, idx) => idx !== rowIndex));
    };

    const handleChange = (field: keyof typeof formData, value: string | Date | null | number[],
        option?: IBuyer | IStyle | ICompany | null,
        displayValue?: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
            buyer: field === 'buyerId' && option ? (option as IBuyer) : (prev.buyerId === "0" ? null : prev.buyer),
            style: field === 'styleId' && option ? (option as IStyle) : (prev.styleId === "0" ? null : prev.style),
            factory: field === 'factoryId' && option ? (option as ICompany) : (prev.factoryId === "0" ? null : prev.factory)
        }));
    };

    return (
        <Panel
            header={
                <PageHeader
                    title="Shipment Schedule Report"
                />
            }
        >
            <div className="grid grid-cols-2">
                <div className="flex flex-col gap-3">
                    {/* Date fields */}
                    {/* From Export */}
                    <div className="flex gap-2">
                        <FormField
                            label="From Export"
                            id="exportYear"
                            variant="block"
                        // error={validationErrors?.code}
                        >
                            <CustomDatePicker
                                selected={formData.fromExport ? new Date(formData.fromExport) : null}
                                onChange={(date) => handleChange('fromExport', date)}
                                className="h-8"
                                monthYearOnly
                                dateFormat="MM/yyyy"
                            />
                        </FormField>
                        {/* To Export */}
                        <FormField
                            label="From Export"
                            id="toExport"
                            variant="block"
                        // error={validationErrors?.code}
                        >
                            <CustomDatePicker
                                selected={formData.toExport ? new Date(formData.toExport) : null}
                                onChange={(date) => handleChange('toExport', date)}
                                className="h-8"
                                monthYearOnly
                                dateFormat="MM/yyyy"
                            />
                        </FormField>
                    </div>
                    <div className="flex gap-2">
                        {/* Form Shipment */}
                        <FormField
                            label="From Shipment"
                            id="fromShipment"
                            variant="block"
                        // error={validationErrors?.code}
                        >
                            <CustomDatePicker
                                selected={formData.fromShipment ? new Date(formData.fromShipment) : null}
                                onChange={(date) => handleChange('fromShipment', date)}
                                className="h-8"
                            />
                        </FormField>
                        {/* To Shipment */}
                        <FormField
                            label="To Shipment"
                            id="toShipment"
                            variant="block"
                        // error={validationErrors?.code}
                        >
                            <CustomDatePicker
                                selected={formData.toShipment ? new Date(formData.toShipment) : null}
                                onChange={(date) => handleChange('toShipment', date)}
                                className="h-8"
                            />
                        </FormField>
                    </div>
                    <div className="flex gap-2">
                        {/* From Production */}
                        <FormField
                            label="From Production"
                            id="fromProd"
                            variant="block"
                        // error={validationErrors?.code}
                        >
                            <CustomDatePicker
                                selected={formData.fromProd ? new Date(formData.fromProd) : null}
                                onChange={(date) => handleChange('fromProd', date)}
                                className="h-8"
                                monthYearOnly
                                dateFormat="MM/yyyy"
                            />
                        </FormField>
                        {/* To Production */}
                        <FormField
                            label="To Production"
                            id="toProd"
                            variant="block"
                        // error={validationErrors?.code}
                        >
                            <CustomDatePicker
                                selected={formData.toProd ? new Date(formData.toProd) : null}
                                onChange={(date) => handleChange('toProd', date)}
                                className="h-8"
                                monthYearOnly
                                dateFormat="MM/yyyy"
                            />
                        </FormField>
                    </div>
                    {/* Dropdown fields */}
                    <div className="grid grid-cols-2">
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
                                onChange={(val, item) => handleChange('factoryId', val, item)}
                                className="h-8 text-sm w-full bg-white dark:bg-gray-800"
                            />
                        </FormField>
                        <div>
                            <Button
                                onClick={() => handleAddRow("Factory")}
                                className="mt-5 ml-2 text-sm border rounded bg-blue-500 text-white"
                                size="sm"
                            >
                                <FontAwesomeIcon icon={faAdd} />
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <FormField
                            label="Buyers"
                            id="buyers"
                            variant="block"
                        // error={validationErrors?.factory}
                        >
                            <SelectDropdown
                                options={buyers}
                                value={formData.buyerId}
                                isSameKeyValue={false}
                                labelKey="buyerName"
                                valueKey="id"
                                onChange={(val, item) => handleChange('buyerId', val, item)}
                                className="h-8 text-sm w-full bg-white dark:bg-gray-800"
                            />
                        </FormField>
                        <div>
                            <Button
                                onClick={() => handleAddRow("Buyer")}
                                className="mt-5 ml-2 text-sm border rounded bg-blue-500 text-white"
                                size="sm"
                            >
                                <FontAwesomeIcon icon={faAdd} />
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <FormField
                            label="Styles"
                            id="styles"
                            variant="block"
                        // error={validationErrors?.factory}
                        >
                            <SelectDropdown
                                options={styles}
                                value={formData.styleId}
                                isSameKeyValue={false}
                                labelKey="styleName"
                                valueKey="id"
                                onChange={(val, item) => handleChange('styleId', val, item)}
                                className="h-8 text-sm w-full bg-white dark:bg-gray-800"
                            />
                        </FormField>
                        <div>
                            <Button
                                onClick={() => handleAddRow("Style")}
                                className="mt-5 ml-2 text-sm border rounded bg-blue-500 text-white"
                                size="sm"
                            >
                                <FontAwesomeIcon icon={faAdd} />
                            </Button>
                        </div>
                    </div>

                    <div className="flex float-end">
                        <Button className="" variant="filled" href="" size="sm">
                            <FontAwesomeIcon icon={faFileLines} /> Show
                        </Button>
                    </div>

                </div>

                {/* Table for showing data */}
                <div>
                    <CustomDataTable
                        columns={columns}
                        data={tableData}
                        bordered
                    />
                </div>
            </div>

        </Panel >
    );
};

export default ShipmentScheduleReport;
