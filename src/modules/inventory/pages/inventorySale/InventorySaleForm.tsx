import { setDropdownData } from "@/app/dropdownSlice";
import { AppDispatch, RootState } from "@/app/store";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import ConfirmDialog, { IConfirmDialog } from "@/components/feedback-interaction/ConfirmDialog";
import Button from "@/components/form/Button";
import CustomDatePicker from "@/components/form/CustomDatePicker";
import DropdownAutoSuggest from "@/components/form/DropdownAutoSuggest";
import { FormField } from "@/components/form/FormField";
import SelectDropdown from "@/components/form/SelectDropdown";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import TextareaBox from "@/components/form/TextareaBox";
import { ActionButtons, ActionType } from "@/components/layout/ActionButtons";
import { useTheme } from "@/hooks/useTheme";
import { useDashboardActions } from "@/layouts/DashboardLayout";
import { fetchAllBusinessUnits } from "@/modules/accounts/reduxSlices/businessUnitSlice";
import { getCostCenter } from "@/modules/accounts/reduxSlices/costCenterSlice";
import { getAllCurrencies } from "@/modules/accounts/reduxSlices/currencySlice";
import { getAllSupplier } from "@/modules/procurement/reduxSlices/supplierSlice";
import { useHotToast } from "@/utils/hotToast.util";
import { faChevronDown, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addInventorySale, addSaleDetailsToSaleInfo, clearInventorySaleMessages, clearInventorySaleState, clearSaleDetails, getInventorySale, removeSaleDetail, setInventorySaleValidationErrors, updateInventorySaleField, updateSaleDetailsField, updateSaleField } from "../../reduxSlices/inventorySale.slice";
import { getPagedMaterialInfos, getStockByStoreAndMaterial, setFilters } from "../../reduxSlices/materialInfo.Slice";
import { getAllStores } from "../../reduxSlices/store.Slice";
import { IMaterial, StockFilters } from "../materialInfo/materialinfo.interface";
import { IInventorySale, IInventorySaleDetails, inventorySaleInsertSchema, inventorySaleUpdateSchema, InventorySaleValidationErrors } from "./inventorySale.interface";

export default function InventorySaleForm() {

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
    const [materislSearchCriteria, setMaterislSearchCriteria] = useState("")
    //

    const { materials, material } = useSelector((state: RootState) => state.material);
    const [modalConfiramtion, setModalConfiramtion] = useState<IConfirmDialog>({ open: false, title: "Confirm", message: "This is dialog message" });
    const [pendingStore, setPendingStore] = useState<{ value: number; displayVal?: string } | null>(null);


    // --- Action Button Handlers --- 
    const handleAction = useCallback(
        ////
        (action: ActionType) => {
            switch (action) {
                case "save":
                    const data = { ...saleInfo, saleDate: saleInfo.saleDateString, id: 0, factoryID: company?.companyId || 0, };
                    if (formValidatoin(data)) {
                        dispatch(addInventorySale(data));
                    }

                    break;
                case "update":
                    debugger
                    const updateData = { ...saleInfo, saleDate: saleInfo.saleDateString, id: Number(id), };
                    if (formValidatoin(updateData)) {
                        dispatch(addInventorySale(updateData));
                    }
                    break;
                case "delete":
                    setModalConfiramtion(prev => ({
                        open: true,
                        message: "Are you sure to delete ?"
                    }));
                    // showHotError(" Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
                    break;
                case "clear": isEditMode ? dispatch(getInventorySale(Number(id))) :
                    dispatch(clearInventorySaleState());

                    break;
                case "preview":
                    showHotError("Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
                    break;
            }
        },
        [dispatch, saleInfo, company, isEditMode]
    );

    useEffect(() => {
        ////
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);

    // --- Clear On Render --- 
    useEffect(() => {
        ////
        return () => {
            dispatch(clearInventorySaleState())
        }
    }, [])


    // --- Handling Errors ---

    const formValidatoin = (data: IInventorySale) => {
        const schema = isEditMode ? inventorySaleUpdateSchema : inventorySaleInsertSchema;

        const parseResult = schema.safeParse(data);

        if (!parseResult.success) {
            const errors: InventorySaleValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof IInventorySale;
                errors[key] = issue.message;
            }

            dispatch(setInventorySaleValidationErrors(errors));
            return false;
        }

        return true;
    }


    // --- stock filter ---
    useEffect(() => {
        ////
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
        ////
        if (id) {
            setIsEditMode(true);
            dispatch(getInventorySale(Number(id)));
        }

    }, [id])

    // --- Handling Messages ---
    useEffect(() => {
        ////
        if (message) {
            showHotSuccess(message);
            if (!isEditMode) {
                dispatch(clearInventorySaleMessages());
                dispatch(clearInventorySaleState())
            }

        }

    }, [message])

    useEffect(() => {
        ////
        if (error) {
            showHotError(error, { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });

        }

    }, [error])

    // --- Get Material For Paginatino ---
    useEffect(() => {
        dispatch(
            getPagedMaterialInfos({
                page,
                perPage: Number(rowsPerPage),
                searchCriteria: { name: materislSearchCriteria },
            })
        );
    }, [page, materislSearchCriteria, dispatch]);

    // --- Get data ---
    useEffect(() => {
        dispatch(getAllSupplier());
        dispatch(getAllStores(company?.companyId || 0));
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

    const handleChange = (
        key: keyof IInventorySaleDetails,
        value: string,
        displayVal?: string
    ) => {
        const numericValue = value ? Number(value) : undefined;

        const getUpdatedFilters = (): StockFilters => {
            //
            const current = {
                brandId: Number(detailsInfo.brandId) || undefined,
                originId: Number(detailsInfo.originId) || undefined,
                model: detailsInfo.model || undefined,
                filterBy: ""
            };

            switch (key) {
                case "brandId":
                    return {
                        ...current,
                        brandId: numericValue,
                        filterBy: "brandId",
                    };
                case "model":
                    return {
                        ...current,
                        model: value || undefined,
                        filterBy: "model",
                    };
                case "originId":
                    return {
                        ...current,
                        originId: numericValue,
                        filterBy: "originId",
                    };
                default:
                    return current;
            }
        };
        // Apply filter logic only if it’s a filterable key
        if (["brandId", "model", "originId"].includes(key)) {
            dispatch(setFilters(getUpdatedFilters()));
        }

        // Always update the sale detail field
        dispatch(
            updateSaleDetailsField({
                key,
                value,
                displayVal,
            })
        );
    };

    // handle Details table states 
    const handleChangeDetailsInfo = (
        key: keyof IInventorySaleDetails,
        value: string,
        displayVal?: string,
        uom?: string
    ) => {

        if (key === "storeId") {
            const numericNewStoreId = Number(value) || 0;
            if (detailsInfo.storeId > 0 && saleInfo.details && saleInfo.details.length > 0 && Number(detailsInfo.storeId) !== numericNewStoreId) {
                setPendingStore({ value: Number(detailsInfo.storeId), displayVal: detailsInfo.storeName });
                setModalConfiramtion(prev => ({
                    open: true,
                    title: "Confirm Store Change",
                    message: "Changing the store will clear the current sale items. Do you want to proceed?"
                }));
                return;
            }
        }

        //
        dispatch(
            updateSaleDetailsField({
                key,
                value,
                displayVal,
            })
        );
        if (uom) {
            dispatch(
                updateSaleDetailsField({
                    key: "uom",
                    value: uom,
                })
            );
        }
    };

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

        showHotSuccess("Store changed — cleared sale items table.");
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
        },
        // add this to the end of `columns`:
        {
            key: "actions",
            header: "Actions",
            render: (row: IInventorySaleDetails, rowIndex: number) => (
                <div className="flex gap-1">
                    <Button size="sm" variant="flat" onClick={() => handleEditRow(rowIndex, row)}> <FontAwesomeIcon icon={faPenToSquare} /></Button>
                    <Button size="sm" variant="flat" className="bg-red-500 text-white hover:bg-red-600" onClick={() => handleDeleteRow(rowIndex)}> <FontAwesomeIcon icon={faTrash} /></Button>
                </div>
            ),
        }


    ]

    // --- Add to Details Table ---
    const onClickHandleAdd = () => {

        // Prevent empty selection
        if (!detailsInfo.storeId || !detailsInfo.itemId) {

            showHotError("Please select both Store and Material.", {
                bgColor: "#EF4444", // modern soft red
                textColor: "#ffffff",
                width: "300px"
            });

            return;
        }
        ////
        // Prevent adding stock-less items

        if (material.totalStock <= 0) {
            showHotError("Cannot add item with zero stock.", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
            return;
        }

        if (detailsInfo.qty > material.totalStock) {
            showHotError("Cannot add item with greater than stock.", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
            return;
        }

        // Prevent adding stock-less items
        if (detailsInfo.qty <= 0) {
            showHotError("Cannot add item with 0 Sale Qty", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
            return;
        }
        // Dispatch the slice action (slice handles qty>stock & duplicates)
        dispatch((dispatch, getState) => {
            dispatch(addSaleDetailsToSaleInfo());
            const latestSaleInfo = getState().inventorySale.saleInfo;
            formValidatoin(latestSaleInfo);
        });


    };

    // Delete a row
    const handleDeleteRow = (index: number) => {
        dispatch(removeSaleDetail(index));
        showHotSuccess("Row deleted successfully.");
    };

    // Edit a row (populate the form)
    const handleEditRow = (index: number, row: IInventorySaleDetails) => {
        debugger
        // dispatch(updateSaleDetailsField({ key: "storeId", value: row.storeId, displayVal: row.storeName }));
        // dispatch(updateSaleDetailsField({ key: "itemId", value: row.itemId, displayVal: row.itemName }));

        dispatch(setDropdownData({
            data: materials,
            name: "materialList",
            labelKey: "name",
            valueKey: "id",

            searchCriteria: row.itemName,
            append: true
        }));

        dispatch(updateSaleField({
            item: row
        }))

        // dispatch(updateSaleDetailsField({ key: "brandId", value: row.brandId, displayVal: row.brandName }));
        // dispatch(updateSaleDetailsField({ key: "originId", value: row.originId, displayVal: row.originName }));
        // dispatch(updateSaleDetailsField({ key: "model", value: row.model }));
        // dispatch(updateSaleDetailsField({ key: "qty", value: row.qty }));
        // dispatch(updateSaleDetailsField({ key: "uom", value: row.uom }));
        // dispatch(updateSaleDetailsField({ key: "unitPrice", value: row.unitPrice }));
        // dispatch(updateSaleDetailsField({ key: "packingNote", value: row.packingNote }));

        // store the row index for updating after editing
        dispatch(updateInventorySaleField({ key: "editingDetailIndex", value: index }));
    };


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
            <div className=" px-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2">


                {/* --- Sale Info Master Section --- */}
                <div className="flex flex-col">
                    {/* Sale No */}
                    <FormField
                        label="Sale No"
                        id="saleNo"
                        variant="inline"
                        required
                        labelFontSize="text-sm"
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
                        labelFontSize="text-sm"
                        error={validationErrors?.saleDate}
                    >
                        <CustomDatePicker
                            className="w-40"
                            selected={saleInfo.saleDate ? new Date(saleInfo.saleDate) : null}
                            onChange={(date) => handleChangeMasterInfo('saleDate', date?.toLocaleString() || "")}
                        />
                    </FormField>

                    {/* Business Unit */}
                    <FormField
                        label="Business Unit"
                        id="businessUnit"
                        variant="inline"
                        labelFontSize="text-sm"
                        error={validationErrors?.businessUnitId}
                    >
                        <SelectDropdown
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
                        labelFontSize="text-sm"
                        error={validationErrors?.currencyId}
                    >
                        <SelectDropdown
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
                        labelFontSize="text-sm"
                        error={validationErrors?.costCenterId}
                    >

                        <DropdownAutoSuggest
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
                        labelFontSize="text-sm"
                        error={validationErrors?.customerId}
                    >
                        <DropdownAutoSuggest
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
                        labelFontSize="text-sm"
                        error={validationErrors?.driverName}
                    >
                        <SimpleInputBox
                            name="driverName"
                            value={saleInfo.driverName || ""}
                            onChange={(val) => handleChangeMasterInfo("driverName", val)}
                        />
                    </FormField>

                    {/* Driver Phone   */}
                    <FormField
                        label="Driver Phone No"
                        id="driverPhoneNo"
                        variant="inline"
                        labelFontSize="text-sm"
                        error={validationErrors?.driverPhoneNo}
                    >
                        <SimpleInputBox
                            name="driverPhoneNo"
                            value={saleInfo.driverPhoneNo || ""}
                            onChange={(val) => handleChangeMasterInfo("driverPhoneNo", val)}
                        />
                    </FormField>

                    {/* Driver Phone   */}
                    <FormField
                        label="Vehicle No"
                        id="vehicleNo"
                        variant="inline"
                        labelFontSize="text-sm"
                        error={validationErrors?.vehicleNo}
                    >
                        <SimpleInputBox
                            name="vehicleNo"
                            value={saleInfo.vehicleNo || ""}
                            onChange={(val) => handleChangeMasterInfo("vehicleNo", val)}
                        />
                    </FormField>

                    {/* Remarks   */}
                    <FormField
                        label="Remarks"
                        id="remarks"
                        variant="inline"
                        labelFontSize="text-sm"
                        error={validationErrors?.remarks}
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
                        labelFontSize="text-sm"
                    >
                        <SimpleInputBox
                            name="totalAmount"
                            disabled
                            value={saleInfo.totalAmount || ""}
                            onChange={() => { }}
                        />
                    </FormField>


                </div>



                <div className="flex flex-col gap-0">
                    {/* --- Item Details Section --- */}
                    {/* Store DropDown Auto Suggest  */}
                    <FormField
                        label="Store"
                        id="store"
                        variant="inline"
                        labelFontSize="text-sm"
                    >
                        <DropdownAutoSuggest
                            name="storeList"
                            inputWidth={200}
                            value={detailsInfo.storeName}
                            onSelect={(val, displayVal) => handleChangeDetailsInfo('storeId', val, displayVal)} />
                    </FormField>

                    {/* Material DropDown Auto Suggest  */}
                    <FormField
                        label="Material"
                        id="material"
                        variant="inline"
                        labelFontSize="text-sm"
                    >
                        <DropdownAutoSuggest<IMaterial>
                            name="materialList"
                            value={detailsInfo.itemName}
                            onSearch={(val) => {
                                setMaterislSearchCriteria(val)
                                setPage(1);
                            }}
                            onScrollEnd={() => setPage((prev) => prev + 1)}
                            onSelect={(val, displayVal, item) => handleChangeDetailsInfo("itemId", val, displayVal, item?.uom || "")}
                        />
                    </FormField>

                    {/* Brand  */}
                    <FormField
                        label="Brand"
                        id="material"
                        variant="inline"
                        labelFontSize="text-sm"
                    >
                        <SelectDropdown
                            options={material.brands || []}
                            value={detailsInfo.brandId.toString() || ""}
                            isSameKeyValue={false}
                            labelKey='name'
                            valueKey='id'
                            onChange={(val, item) => handleChange("brandId", val, item?.name || "")}
                            className="text-sm w-full"
                        />
                    </FormField>

                    {/* Origin  */}
                    <FormField
                        label="Origin"
                        id="material"
                        variant="inline"
                        labelFontSize="text-sm"
                    >
                        <SelectDropdown
                            options={material.origins || []}
                            value={detailsInfo.originId.toString() || ""}
                            isSameKeyValue={false}
                            labelKey='name'
                            valueKey='id'
                            onChange={(val, item) => handleChange("originId", val, item?.name || "")}
                            className="text-sm w-full"
                        />
                    </FormField>

                    {/* Model  */}
                    <FormField
                        label="Model"
                        id="material"
                        variant="inline"
                        labelFontSize="text-sm"
                    >
                        <SelectDropdown
                            options={material.models || []}
                            value={detailsInfo.model.toString() || ""}
                            isSameKeyValue={false}
                            labelKey='name'
                            valueKey='id'
                            onChange={(val, item) => handleChange("model", val, item?.name || "")}
                            className="text-sm w-full"
                        />


                    </FormField>

                    {/* Sale Qty */}
                    <FormField
                        label="Sale Qty"
                        id="saleField"
                        variant="inline"
                        labelFontSize="text-sm"
                    >
                        <SimpleInputBox
                            value={detailsInfo.qty}
                            onChange={(val) => handleChangeDetailsInfo("qty", val)}
                            id="saleInput"
                            type="number"
                        />
                    </FormField>

                    {/*Unit Price */}
                    <FormField
                        label="Unit Price"
                        id="unitPriceField"
                        variant="inline"
                        labelFontSize="text-sm"
                    >
                        <SimpleInputBox
                            value={detailsInfo.unitPrice}
                            onChange={(val) => handleChangeDetailsInfo("unitPrice", val)}
                            id="saleInput"
                            type="number"
                        />
                    </FormField>

                    {/* Packing Note   */}
                    <FormField
                        label="Packing Note"
                        id="packingNote"
                        variant="inline"
                        labelFontSize="text-sm"
                    >
                        <SimpleInputBox
                            name="packingNote"
                            value={detailsInfo.packingNote || ""}
                            onChange={(val) => handleChangeDetailsInfo("packingNote", val)}
                        />
                    </FormField>

                    {/* Stock */}

                    <div className="flex items-start justify-between gap-0">

                        <FormField
                            label="Stock"
                            id="stockField"
                            variant="inline"
                            labelWidth="w-[150px]"
                            labelFontSize="text-sm"
                        >
                            <SimpleInputBox
                                value={material.totalStock}
                                onChange={() => { }}
                                id="stockInput"
                                type="text"
                                disabled
                            />
                        </FormField>


                        <div>
                            <Button
                                size="sm"
                                className="flex flex-start"
                                onClick={() => onClickHandleAdd()}
                            >
                                <FontAwesomeIcon icon={faChevronDown} />
                                {saleInfo.editingDetailIndex !== undefined ? "Edit" : "Add"}
                            </Button>
                        </div>
                    </div>



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


