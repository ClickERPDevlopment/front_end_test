import React, { useEffect, useMemo, useState } from "react";
import { AppDispatch, RootState } from "../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { Column, CustomDataTable } from "../../../../components/data-display/CustomDataTable";
import { CuttingFormDetails, CuttingFormMaster } from "./cutting.interface";
import { LayerCuttingMasterInfo } from "./LayerCuttingChilds/LayerCuttingMasterInfo";
import { LayerCuttingDetailsInfo } from "./LayerCuttingChilds/LayerCuttingDetailsInfo";
import { resetDropdownData, setDropdownData } from "../../../../app/dropdownSlice";
import { fetchAllStylesByBuyerId, } from "../../reduxSlices/styleSlice";
import { fetchAllDistinctColorsByPoNo, fetchAllDistinctOrderDeliveryDateByPoNoColorIdPlacementMonth, fetchAllDistinctOrderPlacementMonthsByPoNoColorId, fetchAllDistinctPOsByStyleId, fetchAllDistinctSizeByPoNoColorIdPlacementMonthDeliveryDate, resetDeliveryDates, resetOrderColors, resetOrderSizes, resetPlacementMonths, } from "../../reduxSlices/gmtPurchaseOrderSlice";
import SimpleInputBox from "../../../../components/form/SimpleInputBox";
import { DropdownButton } from "../../../../components/form/DropdownButton";
import { MoreVertical } from "react-feather";
import { formatDate } from "../../../../utils/dateUtil";
import { filterFloorBySection } from "@/modules/configurations/reduxSlices/floorSlice";
import { filterLineByFloor } from "@/modules/configurations/reduxSlices/lineSlice";

interface SizeRowType {
    id: number;
    sizeName: string;
    ratio: number;
    maxRatio: number;
}

const LayerCuttingEntry: React.FC = () => {
    const [formData, setFormData] = useState<CuttingFormMaster>({
        bns: 0,
        sns: 0,
        floorId: "",
        lineId: "",
        buyerName: "",
        buyerId: "",
        styleId: "",
        styleNo: "",
        type: "",
        fabricType: "",
        layerNo: "",
        qty: 0,
        cuttingQty: 0,
        markerQty: 0,
        layQty: 0,
        remarks: "",
        minBundleQty: 0,
        bundleQty: 0,
        allowanceLength: 0,
        markerWidth: 0,
        markerLength: 0,
        cuttingDate: null,
        cuttingNo: "",
    });

    const [formDetailsData, setFormDetailsData] = useState<CuttingFormDetails>({
        colorId: 0,
        colorName: "",
        deliveryDate: "",
        gsm: "",
        layQty: 0,
        length: 0,
        lotBatchNo: "",
        placementMonth: "",
        poId: 0,
        poNo: "",
        rollNo: "",
        rollBal: 0,
        shade: "",
        shrinkage: "",
        weight: 0,
        uomId: 0,
        actualBalance: 0,
        allowanceLength: 0,
        allowanceWidth: 0,
        balance: 0,
        uomName: "",
        utilized: 0,
        wastage: 0
    });

    const dispatch: AppDispatch = useDispatch();
    const { filteredFloor } = useSelector((state: RootState) => state.floor);
    const { filteredLines } = useSelector((state: RootState) => state.line);
    const { buyers } = useSelector((state: RootState) => state.buyer);
    const { styles } = useSelector((state: RootState) => state.style);
    const { uoms } = useSelector((state: RootState) => state.uom);
    const { orders, orderColors, placementMonths, deliveryDates, orderSizes } = useSelector((state: RootState) => state.gmtPurchaseOrder);

    const [sizeRows, setSizeRows] = useState<SizeRowType[]>([]);

    const [detailsRows, setDetailsRow] = useState<CuttingFormDetails[]>([]);
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

    const detailsColumns: Column<CuttingFormDetails>[] = [
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
        { key: 'poNo', header: 'PO No.', align: 'center' },
        { key: 'colorName', header: 'Color', align: 'center' },
        { key: 'lotBatchNo', header: 'Lot No.', align: 'center' },
        { key: 'rollNo', header: 'Roll No.', align: 'center' },
        { key: 'gsm', header: 'GSM', },
        { key: 'allowanceLength', header: 'Alow. Len', align: 'center' },
        { key: 'allowanceWidth', header: 'Alow. Width', align: 'center' },
        { key: 'length', header: 'Length', align: 'center' },
        { key: 'uomName', header: 'UOM', align: 'center' },
        { key: 'weight', header: 'Weight', align: 'center' },
        { key: 'utilized', header: 'Utilized', align: 'center' },
        { key: 'balance', header: 'Balance', align: 'center' },
        { key: 'actualBalance', header: 'Actual Balance', align: 'center' },
        { key: 'wastage', header: 'Wastage', align: 'center' },
        { key: 'shrinkage', header: 'Shrinkage', align: 'center' },
        { key: 'shade', header: 'Shade', align: 'center' },
        { key: 'layQty', header: 'Lay Qty', align: 'center' },
        { key: 'deliveryDate', header: 'Del. Dt', align: 'center' },
        { key: 'placementMonth', header: 'Place M.', align: 'center' },
    ];

    const sizeColumns = useMemo<Column<SizeRowType>[]>(() => [
        { key: 'sizeName', header: 'Size', width: 'w-4/12' },
        {
            key: 'ratio',
            header: 'Ratio',
            width: 'w-4/12',
            render: (item, index) => (
                <SimpleInputBox
                    value={item.ratio.toString()}
                    onChange={(val) => handleRatioChange(index, 'ratio', parseInt(val) || 0)}
                    type="number"
                    className="h-8 text-sm w-full"
                />
            ),
        },
        {
            key: 'maxRatio',
            header: 'Max Ratio',
            width: 'w-4/12',
            render: (item, index) => (
                <SimpleInputBox
                    value={item.maxRatio.toString()}
                    onChange={(val) => handleRatioChange(index, 'maxRatio', parseInt(val) || 0)}
                    type="number"
                    className="h-8 text-sm w-full"
                />
            ),
        },
    ], [sizeRows]);

    useEffect(() => {
        document.title = "Layer Cutting Entry";
        dispatch(filterFloorBySection({ section_id: 1 }))
        // dispatch(fetchAllBuyersJson())
        // dispatch(fetchAllUomsJson())

        // Optionally return a cleanup function if needed
        return () => {
            // Reset title or do other cleanup if needed
            document.title = "";
        };
    }, [dispatch]);


    useEffect(() => {
        dispatch(
            setDropdownData({
                name: 'buyers',
                data: buyers,
                labelKey: 'name',
                valueKey: 'id',
            })
        );
    }, [buyers]);


    useEffect(() => {
        dispatch(
            setDropdownData({
                name: 'styles',
                data: styles,
                labelKey: 'styleNo',
                valueKey: 'id',
            })
        );
    }, [styles]);

    useEffect(() => {
        dispatch(
            setDropdownData({
                name: 'orders',
                data: orders,
                labelKey: 'poNo',
                valueKey: 'poNo',
            })
        );
    }, [orders]);

    useEffect(() => {

        if (orderSizes.length > 0) {
            setSizeRows((prev) =>
                orderSizes.map((item) => {
                    const existing = prev.find((s) => s.id === item.sizeId);
                    return {
                        id: item.sizeId,
                        sizeName: item.sizeName,
                        ratio: existing?.ratio ?? 0,
                        maxRatio: existing?.maxRatio ?? 0,
                    };
                })
            );
        }
    }, [orderSizes]);

    useEffect(() => {
        setFormData((prev) => ({ ...prev, ["lineId"]: "" }));
        return () => {

        };
    }, [filteredLines]);

    const handleChange = (key: keyof CuttingFormMaster, value: string, displayValue?: string) => {
        if (key === "floorId") {
            dispatch(filterLineByFloor({ floor_id: value }))
        }
        if (key === "buyerId") {
            dispatch(fetchAllStylesByBuyerId({ buyerId: Number(value) }));
            setFormData((prev) => ({
                ...prev,
                [key]: value,
                buyerName: displayValue || "",
                styleId: '',
                styleNo: ''
            }));
            setFormDetailsData((prev) => ({
                ...prev,
                poId: 0,
                poNo: "",
                colorId: 0,
                colorName: "",
                placementMonth: "",
                deliveryDate: ""
            }));
            dispatch(resetDropdownData({ name: 'orders' }))
            dispatch(resetOrderColors())
            dispatch(resetOrderSizes())
            dispatch(resetPlacementMonths())
            dispatch(resetDeliveryDates())
            return;
        }
        if (key === "styleId") {
            dispatch(fetchAllDistinctPOsByStyleId({ styleId: Number(value) }))
            setFormData((prev) => ({
                ...prev,
                [key]: value,
                styleNo: displayValue || "",
            }));
            setFormDetailsData((prev) => ({
                ...prev,
                poId: 0,
                poNo: "",
                colorId: 0,
                colorName: "",
                placementMonth: "",
                deliveryDate: ""
            }));
            dispatch(resetDropdownData({ name: 'orders' }))
            dispatch(resetOrderColors())
            dispatch(resetOrderSizes())
            dispatch(resetPlacementMonths())
            dispatch(resetDeliveryDates())
            return;
        }
        setFormData((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const handleChangeDetails = (key: keyof CuttingFormDetails, value: string) => {

        if (key === "poNo") {
            dispatch(fetchAllDistinctColorsByPoNo({ poNo: value }))
        }
        if (key === "colorId") {
            dispatch(fetchAllDistinctOrderPlacementMonthsByPoNoColorId({ poNo: formDetailsData.poNo, colorId: Number(value) }))
        }
        if (key === "placementMonth") {
            dispatch(fetchAllDistinctOrderDeliveryDateByPoNoColorIdPlacementMonth({
                poNo: formDetailsData.poNo,
                colorId: formDetailsData.colorId,
                orderPlacementMonth: value
            }))
        }
        if (key === "deliveryDate") {
            dispatch(fetchAllDistinctSizeByPoNoColorIdPlacementMonthDeliveryDate({
                poNo: formDetailsData.poNo,
                colorId: formDetailsData.colorId,
                orderPlacementMonth: formDetailsData.placementMonth,
                deliveryDate: value
            }))
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
        <div className="p-5 rounded panel shadow-md dark:shadow-lg">
            {/* Top Section: 3 Columns -> Stacked on mobile, 3 columns on lg+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                {/* Column 1: Master Info */}
                <div className="space-y-4 lg:col-span-3 md:col-span-2 col-span-1">
                    <LayerCuttingMasterInfo
                        formData={formData}
                        onChange={handleChange}
                        onDateChange={handleDateChange}
                        filteredFloor={filteredFloor}
                        filteredLines={filteredLines}
                    />
                </div>

                {/* Column 2: Details Info */}
                <div className="space-y-4 lg:col-span-2 md:col-span-2 col-span-1">
                    <LayerCuttingDetailsInfo
                        formData={formDetailsData}
                        onChange={handleChangeDetails}
                        orderColors={orderColors}
                        placementMonths={placementMonths}
                        deliveryDates={deliveryDates}
                        uoms={uoms}
                        onClick={() => handleOnClickAddDetails()}
                    />
                </div>

                {/* Column 3: Size Table */}
                <div className="space-y-4 lg:col-span-2 md:col-span-2 col-span-1">
                    {sizeRows.length > 0 && (
                        <CustomDataTable
                            columns={sizeColumns}
                            data={sizeRows}
                            fixedHeight="h-[450px]"
                        />
                    )}

                    {sizeRows.length == 0 && (
                        <CustomDataTable
                            columns={sizeColumns}
                            data={sizeRows}
                            fixedHeight="h-[450px]"
                        />
                    )}

                </div>
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
        </div>
    );
};

export default LayerCuttingEntry;
