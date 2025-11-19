import { setDropdownData } from "@/app/dropdownSlice";
import { AppDispatch, RootState } from "@/app/store";
import { ActionButtons, ActionType } from "@/components/layout/ActionButtons";
import ConfirmDialog, { IConfirmDialog } from "@/components/feedback-interaction/ConfirmDialog";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import CustomDatePicker from "@/components/form/CustomDatePicker";
import DropdownAutoSuggest from "@/components/form/DropdownAutoSuggest";
import { FormField } from "@/components/form/FormField";
import SelectDropdown from "@/components/form/SelectDropdown";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import { useTheme } from "@/hooks/useTheme";
import { fetchAllBusinessUnits } from "@/modules/accounts/reduxSlices/businessUnitSlice";
import { getCostCenter } from "@/modules/accounts/reduxSlices/costCenterSlice";
import { getAllCurrencies } from "@/modules/accounts/reduxSlices/currencySlice";
import { getAllSupplier } from "@/modules/procurement/reduxSlices/supplierSlice";
import { useHotToast } from "@/utils/hotToast.util";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { approvalPostInventorySale, clearInventorySaleMessages, clearInventorySaleState, clearSaleDetails, getInventorySale, setInventorySaleValidationErrors, unApprovalPostInventorySale, updateInventorySaleField, updateSaleDetailsField } from "../../reduxSlices/inventorySale.slice";
import { getStockByStoreAndMaterial } from "../../reduxSlices/materialInfo.Slice";
import { IInventorySale, IInventorySaleDetails, InventorySaleValidationErrors } from "./inventorySale.interface";
import TextareaBox from "@/components/form/TextareaBox";
import { useDashboardActions } from "@/layouts/DashboardLayout";

export default function InventorySaleApprovalForm() {

    // --- ACTION BUTTON IN TOP NAVBAR  ---
    const { setActions } = useDashboardActions();
    const [isEditMode, setIsEditMode] = useState(false);
    // -------------------------------------
    const { id } = useParams();
    const { showHotError, showHotSuccess } = useHotToast();
    const dispatch: AppDispatch = useDispatch();
    const { rowsPerPage, company } = useTheme();
    const [page, setPage] = useState(1);
    const dropdowns = useSelector((state: RootState) => state.dropdown);

    const { saleInfo, detailsInfo, error, message, validationErrors } = useSelector((state: RootState) => state.inventorySale);
    const { suppliers, } = useSelector((state: RootState) => state.supplier);

    const { stores } = useSelector((state: RootState) => state.store)
    const { costCenters } = useSelector((state: RootState) => state.costCenter)
    const { businessUnits } = useSelector((state: RootState) => state.businessUnit)
    const { currencies } = useSelector((state: RootState) => state.currency);
    //
    const searchCriteria = dropdowns["materialList"]?.searchCriteria ?? "";
    const { materials, material } = useSelector((state: RootState) => state.material);
    const [modalConfiramtion, setModalConfiramtion] = useState<IConfirmDialog>({ open: false, title: "Confirm", message: "This is dialog message" });
    const [pendingStore, setPendingStore] = useState<{ value: number; displayVal?: string } | null>(null);
    const [isApprovedMode, setIsApproveMode] = useState(false)


    // // --- Action Button Handlers --- 
    const handleAction = useCallback(
        ////debugger
        (action: ActionType) => {
            switch (action) {
                case "save":
                    showHotError("Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
                    break;
                case "update":
                    showHotError("Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
                    break;
                case "delete":
                    showHotError("Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
                    break;
                case "clear":
                    showHotError("Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });

                    break;
                case "preview":
                    showHotError("Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
                    break;
                case "approve":
                    dispatch(approvalPostInventorySale(Number(id)));
                    break;
                case "unApprove":
                    dispatch(unApprovalPostInventorySale(Number(id)));
                    break;
            }
        },
        [dispatch, saleInfo, company]
    );

    useEffect(() => {
        if (saleInfo) {
            setIsApproveMode(saleInfo.isApproved === 1)
        }

    }, [saleInfo])

    useEffect(() => {
        ////debugger
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} show={{ approve: !isApprovedMode, unApprove: isApprovedMode }} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction, isApprovedMode]);


    // --- Clear On Render --- 
    useEffect(() => {
        ////debugger
        return () => {
            dispatch(clearInventorySaleState())
        }
    }, [])

    // --- stock filter ---
    useEffect(() => {
        ////debugger
        if (material && material.materialStockCount) {
            if (material.materialStockCount === 1) {
                dispatch(updateSaleDetailsField({
                    key: "model",
                    value: material.filterMaterialStock && material.filterMaterialStock.length > 0 ? material.filterMaterialStock[0].model.toString() : "",
                    displayVal: material.filterMaterialStock && material.filterMaterialStock.length > 0 ? material.filterMaterialStock[0].model.toString() : "",
                }));
                dispatch(updateSaleDetailsField({
                    key: "brandId",
                    value: material.filterMaterialStock && material.filterMaterialStock.length > 0 ? material.filterMaterialStock[0].brandId.toString() : "",
                    displayVal: material.filterMaterialStock && material.filterMaterialStock.length > 0 ? material.filterMaterialStock[0].brandName.toString() : "",
                }));
                dispatch(updateSaleDetailsField({
                    key: "originId",
                    value: material.filterMaterialStock && material.filterMaterialStock.length > 0 ? material.filterMaterialStock[0].originId.toString() : "",
                    displayVal: material.filterMaterialStock && material.filterMaterialStock.length > 0 ? material.filterMaterialStock[0].originName.toString() : "",
                }));
            }
        }
    }, [material])

    // --- Fetching Data For Update if ID is Available ---
    useEffect(() => {
        ////debugger
        if (id) {
            setIsEditMode(true);
            dispatch(getInventorySale(Number(id)));
        }

    }, [id])

    // --- Handling Messages ---
    useEffect(() => {
        ////debugger
        if (message) {
            showHotSuccess(message);
            dispatch(clearInventorySaleMessages());
            dispatch(getInventorySale(Number(id)));

        }

    }, [message])

    useEffect(() => {
        ////debugger
        if (error) {
            showHotError(error, { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
            dispatch(clearInventorySaleMessages());
        }

    }, [error])


    // --- Get data ---
    useEffect(() => {
        dispatch(getAllSupplier());
        dispatch(getCostCenter());
        dispatch(fetchAllBusinessUnits());
        dispatch(getAllCurrencies());

    }, [dispatch]);

    useEffect(() => {
        console.log('selected store name is ', detailsInfo.storeName)
    }, [detailsInfo.storeName])

    // handle master table states 
    const handleChangeMasterInfo = (key: keyof IInventorySale, value: string, displayVal?: string) => {
        dispatch(updateInventorySaleField({
            key,
            value,
            displayVal
        }))
    }

    const handleCancel = () => {
        const storeName = detailsInfo.storeName || "";

        // Revert back (same as your earlier logic)
        dispatch(
            updateSaleDetailsField({
                key: "storeId",
                value: detailsInfo.storeId,
                displayVal: "--",
            })
        );

        setTimeout(() => {
            dispatch(
                updateSaleDetailsField({
                    key: "storeId",
                    value: detailsInfo.storeId,
                    displayVal: storeName,
                })
            );
        }, 0);

        setPendingStore(null);
        setModalConfiramtion(prev => (prev && { ...prev, open: false }) || null);
    };


    const handleConfirm = () => {
        if (!pendingStore) return;

        dispatch(clearSaleDetails());
        dispatch(
            updateSaleDetailsField({
                key: "storeId",
                value: pendingStore.value,
                displayVal: pendingStore.displayVal,
            })
        );

        //showHotSuccess("Store changed — cleared sale items table.");
        setPendingStore(null);
        setModalConfiramtion(prev => (prev && { ...prev, open: false }) || null);
    };

    // link suppliers dropdown list
    useEffect(() => {
        dispatch(setDropdownData({
            data: suppliers,
            name: "supplierList",
            labelKey: "Name",
            valueKey: "Id",
            hasMoreData: suppliers.length !== 0,
        }));
    }, [suppliers]);

    // link suppliers dropdown list
    useEffect(() => {
        dispatch(setDropdownData({
            data: stores,
            name: "storeList",
            labelKey: "name",
            valueKey: "id",
        }));
    }, [stores]);

    // link materials dropdown list
    useEffect(() => {
        dispatch(setDropdownData({
            data: materials,
            name: "materialList",
            labelKey: "name",
            valueKey: "id",
            isLoading: false,
            append: true
        }));
    }, [materials]);

    // link Costcenter dropdown list
    useEffect(() => {
        dispatch(setDropdownData({
            data: costCenters,
            name: "costCenterList",
            labelKey: "costName",
            valueKey: "costNo",
        }));
    }, [costCenters]);

    // --- Table Columns ---
    const columns: Column<IInventorySaleDetails>[] = [
        {
            key: "storeName",
            header: "Store",
        },
        {
            key: "itemName",
            header: "Material",
        },
        {
            key: "qty",
            "header": "Qty"
        },
        {
            key: "unitPrice",
            "header": "Unit Price"
        },
        {
            key: "amount",
            "header": "Amount",
            render: (row, index) => (row.unitPrice * row.qty).toFixed(2)
        },
        {
            key: "uom",
            "header": "UOM",
        },
        {
            key: "approvedQty",
            "header": "Approved Qty"
        },
        {
            key: "model",
            "header": "Model"
        },
        {
            key: "brandName",
            "header": "Brand"
        },
        {
            key: "brandId",
            "header": "BRAND_ID",
            visible: false
        },
        {
            key: "originName",
            "header": "Origin"
        },
        {
            key: "originId",
            "header": "ORIGIN_ID",
            visible: false
        },
        {
            key: "packingNote",
            "header": "Packing Note",
        }

    ]

    // --- Fetch Stock on Store & Material Change ---
    useEffect(() => {

        if (detailsInfo.storeId && detailsInfo.itemId) {
            dispatch(
                getStockByStoreAndMaterial({
                    storeId: detailsInfo.storeId,
                    itemId: detailsInfo.itemId,
                    companyID: company?.companyId || 0
                })
            );
        }
    }, [detailsInfo.storeId, detailsInfo.itemId, dispatch, company?.companyId]);


    return (
        <div >
            {/* --- Sale Info Master Section --- */}
            <div className=" px-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2">
                <div className="flex flex-col">
                    {/* Sale No */}
                    <FormField
                        label="Sale No"
                        id="saleNo"
                        variant="inline"
                        required
                    >
                        <SimpleInputBox
                            disabled
                            value={saleInfo.saleNo}
                            onChange={(val) => handleChangeMasterInfo("saleNo", val)}
                            type="text"
                        />
                    </FormField>

                    {/* Sale Date */}
                    <FormField
                        label="Sale Date"
                        id="saleDate"
                        variant="inline"
                        required
                        error={validationErrors?.saleDate}

                    >
                        <CustomDatePicker
                            className="w-40"
                            disabled
                            selected={saleInfo.saleDate ? new Date(saleInfo.saleDate) : null}
                            onChange={(date) => handleChangeMasterInfo('saleDate', date?.toLocaleString() || "")}
                        />
                    </FormField>

                    {/* Business Unit */}
                    <FormField
                        label="Business Unit"
                        id="businessUnit"
                        variant="inline"
                        error={validationErrors?.businessUnitId}
                    >
                        <SelectDropdown
                            disabled
                            options={businessUnits || []}
                            value={String(saleInfo.businessUnitId) || ""}
                            isSameKeyValue={false}
                            labelKey='baName'
                            valueKey='baNo'
                            onChange={(val, item) => handleChangeMasterInfo("businessUnitId", val, item?.baName || "")}
                            className="text-sm w-full"
                        />
                    </FormField>

                    {/* Currency */}
                    <FormField
                        label="Currency"
                        id="currency"
                        variant="inline"
                        error={validationErrors?.currencyId}
                    >
                        <SelectDropdown
                            disabled
                            options={currencies || []}
                            value={String(saleInfo.currencyId) || ""}
                            isSameKeyValue={false}
                            labelKey='Currencyname'
                            valueKey='Id'
                            onChange={(val, item) => handleChangeMasterInfo("currencyId", val, item?.Currencyname || "")}
                            className="text-sm w-full"
                        />


                    </FormField>

                    {/* Cost Center No */}
                    <FormField
                        label="Cost Center"
                        id="costCenterName"
                        variant="inline"
                        required
                        error={validationErrors?.costCenterId}
                    >

                        <DropdownAutoSuggest
                            disabled
                            name="costCenterList"
                            value={saleInfo.costCenterName}
                            onSelect={(val, displayVal) =>
                                handleChangeMasterInfo("costCenterId", val, displayVal)
                            }
                        />

                    </FormField>

                    {/* Customer   */}
                    <FormField
                        label="Customer"
                        id="customerName"
                        variant="inline"
                        required
                        error={validationErrors?.customerId}
                    >
                        <DropdownAutoSuggest
                            disabled
                            name="supplierList"
                            value={saleInfo.customerName}
                            onSelect={(val, displayVal) =>
                                handleChangeMasterInfo("customerId", val, displayVal)
                            }
                        />
                    </FormField>

                    {/* Driver Name   */}
                    <FormField
                        label="Driver Name"
                        id="driverName"
                        variant="inline"
                    >
                        <SimpleInputBox
                            name="driverName"
                            disabled
                            value={saleInfo.driverName || ""}
                            onChange={(val) => handleChangeMasterInfo("driverName", val)}
                        />
                    </FormField>

                    {/* Driver Phone   */}
                    <FormField
                        label="Driver Phone No"
                        id="driverPhoneNo"
                        variant="inline"
                    >
                        <SimpleInputBox
                            name="driverPhoneNo"
                            disabled
                            value={saleInfo.driverPhoneNo || ""}
                            onChange={(val) => handleChangeMasterInfo("driverPhoneNo", val)}
                        />
                    </FormField>

                    {/* Driver Phone   */}
                    <FormField
                        label="Vehicle No"
                        id="vehicleNo"
                        variant="inline"
                    >
                        <SimpleInputBox
                            name="vehicleNo"
                            disabled
                            value={saleInfo.vehicleNo || ""}
                            onChange={(val) => handleChangeMasterInfo("vehicleNo", val)}
                        />
                    </FormField>

                    {/* Remarks   */}
                    <FormField
                        label="Remarks"
                        id="remarks"
                        variant="inline"
                    >
                        <TextareaBox
                            name="remarks"
                            value={saleInfo.remarks || ""}
                            rows={2}
                            onChange={(val) => handleChangeMasterInfo("remarks", val)}
                        />
                    </FormField>

                    {/* Total Amount   */}
                    <FormField
                        label="Total Amount"
                        id="remarks"
                        variant="inline"
                    >
                        <SimpleInputBox
                            name="totalAmount"
                            disabled
                            value={saleInfo.totalAmount || ""}
                            onChange={() => { }}
                        />
                    </FormField>
                </div>
            </div>

            {/* --- Sale Items Table Section --- */}
            <div className="px-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">

                <FormField id="table_error" error={validationErrors?.details} >
                    <div></div>
                </FormField>

                <CustomDataTable
                    data={saleInfo.details}
                    columns={columns}

                />

            </div>

            {/* The animated confirmation modal */}
            <ConfirmDialog
                open={modalConfiramtion?.open || false}
                title={modalConfiramtion?.title || "Confirm"}
                message={modalConfiramtion?.message || "This is dialog message"}
                confirmText="Yes, Clear"
                cancelText="Cancel"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div >

    );

}


