import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import Checkbox from "@/components/form/Checkbox";
import { FormField } from "@/components/form/FormField";
import SelectDropdown from "@/components/form/SelectDropdown";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import { ActionButtons, ActionType } from "@/components/layout/ActionButtons";
import { useTheme } from "@/hooks/useTheme";
import { useDashboardActions } from "@/layouts/DashboardLayout";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addStore, editStore, updateStoreField } from "../../reduxSlices/store.Slice";
import { clearUomMessages, clearUomState, getUom } from "../../reduxSlices/uom.Slice";
import { IStore } from "./store.interface";

const StoreInfoForm = () => {

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { storeGroups } = useSelector((state: RootState) => state.storeGroup);
    const { companies } = useSelector((state: RootState) => state.company);
    const { store, error, message, validationErrors } = useSelector((state: RootState) => state.store);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { layout } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);
    const { setActions } = useDashboardActions();
    const [isEditMode, setIsEditMode] = useState(false);
    // --- Action Button Handlers --- 
    const handleAction = useCallback(
        //debugger
        (action: ActionType) => {
            // switch (action) {
            //     case "save":
            //         dispatch(addInventorySale({ ...saleInfo, id: 0, factoryID: company?.companyId || 0 }));
            //         break;
            //     case "update":
            //         dispatch(addInventorySale({ ...saleInfo, id: Number(id), }));
            //         break;
            //     case "delete":
            //         showHotError(" Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
            //         break;
            //     case "clear":
            //         dispatch(clearInventorySaleState())
            //         break;
            //     case "preview":
            //         showHotError("Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
            //         break;
            // }
        },
        [dispatch, store]
    );
    useEffect(() => {
        //debugger
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);



    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearUomMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearUomMessages());
        }
    }, [message]);

    useEffect(() => {
        document.title = "Store Form";
        console.log("Store Form Mounted");
        setPageTitle("Store Form");
        // dispatch(fetchAllProductionType());
        return () => {
            document.title = "";
            dispatch(clearUomState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            document.title = "Store Info Edit";
            setPageTitle("Store Info");
            setIsUpdateMode(true);
            dispatch(getUom(Number(id)))
        }
    }, [id]);


    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(webRoutes.UOM_LIST);
        }
    };





    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isUpdateMode) {
            dispatch(editStore({ id: Number(id), payload: store }));
        } else {
            dispatch(addStore(store));
        }
    };


    const handleChange = (key: keyof IStore, value: string) => {
        dispatch(
            updateStoreField({
                key: key,
                value: value,
            })
        );
    };

    const handleCheckboxChange = (key: keyof IStore, value: boolean) => {
        dispatch(
            updateStoreField({
                key: key,
                value: value,
            })
        );
    };

    return (
        <div>

            <div className="sm:grid-cols-1 md:grid-cols-2 lg:grid grid-cols-3">
                <div className="flex flex-col gap-2">
                    {/* Factory name */}
                    <div>
                        <FormField
                            label="Factory Name"
                            id="FactoryName"
                            variant="block"
                            error={validationErrors?.factoryName}
                        >
                            <SelectDropdown
                                options={companies}
                                value={store.factoryId.toString()}
                                isSameKeyValue={false}
                                labelKey="name"
                                valueKey="companyId"
                                onChange={(val, item) => handleChange('factoryId', val)}
                                className="h-8 text-sm w-full bg-white dark:bg-gray-800"
                            />
                        </FormField>
                    </div>

                    {/* Store Group Name */}
                    <div>
                        <FormField
                            label="Store Group Name"
                            id="StoreGroupName"
                            variant="block"
                            error={validationErrors?.storeGroupName}
                        >
                            <SelectDropdown
                                options={storeGroups}
                                value={store.storeGroupId.toString()}
                                isSameKeyValue={false}
                                labelKey="storeGroup"
                                valueKey="id"
                                onChange={(val, item) => handleChange('storeGroupId', val)}
                                className="h-8 text-sm w-full bg-white dark:bg-gray-800"
                            />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {/* Store Code */}
                        <div>
                            <FormField
                                label="Store Code"
                                id="StoreCode"
                                variant="block"
                                error={validationErrors?.storeCode}
                            >
                                <SimpleInputBox
                                    value={store.storeCode}
                                    onChange={(val) => handleChange("storeCode", val)}
                                    id="shortname"
                                    placeholder="Store Code"
                                    className="w-full"
                                    type="text"
                                />
                            </FormField>
                        </div>

                        {/* Store Prefix */}
                        <div>
                            <FormField
                                label="Store Prefix"
                                id="storePrefix"
                                variant="block"
                                error={validationErrors?.storePrefix}
                            >
                                <SimpleInputBox
                                    value={store.storePrefix}
                                    onChange={(val) => handleChange("storePrefix", val)}
                                    id="storePrefix"
                                    placeholder="Store Prefix"
                                    className="w-full"
                                    type="text"
                                />
                            </FormField>
                        </div>
                    </div>

                    {/* Contact Person Name */}
                    <div>
                        <FormField
                            label="Contact Person Name"
                            id="ContactPersonName"
                            variant="block"
                            error={validationErrors?.contactPersonName}
                        >
                            <SimpleInputBox
                                value={store.contactPersonName}
                                onChange={(val) => handleChange("contactPersonName", val)}
                                id="shortname"
                                placeholder="Contact Person Name"
                                className="w-full"
                                type="text"
                            />
                        </FormField>
                    </div>

                    {/* Contact Person No */}
                    <div>
                        <FormField
                            label="Contact Person No"
                            id="contactPersonNumber"
                            variant="block"
                            error={validationErrors?.contactPersonNumber}
                        >
                            <SimpleInputBox
                                value={store.contactPersonNumber}
                                onChange={(val) => handleChange("contactPersonNumber", val)}
                                id="contactPersonNumber"
                                placeholder="Contact Person No"
                                className="w-full"
                                type="text"
                            />
                        </FormField>
                    </div>

                    {/* Address */}
                    <div>
                        <FormField
                            label="Address"
                            id="address"
                            variant="block"
                            error={validationErrors?.address}
                        >
                            <SimpleInputBox
                                value={store.address}
                                onChange={(val) => handleChange("address", val)}
                                id="address"
                                placeholder="Address"
                                className="w-full"
                                type="text"
                            />
                        </FormField>
                    </div>

                    {/* Remarks */}
                    <div>
                        <FormField
                            label="Remarks"
                            id="remarks"
                            variant="block"
                            error={validationErrors?.remarks}
                        >
                            <SimpleInputBox
                                value={store.remarks}
                                onChange={(val) => handleChange("remarks", val)}
                                id="remarks"
                                placeholder="Remarks"
                                className="w-full"
                                type="text"
                            />
                        </FormField>
                    </div>

                    {/* Is Active */}
                    <div>
                        <FormField
                            label=""
                            id="isActive"
                            variant="block"
                            error={validationErrors?.isActive}
                        >
                            <Checkbox
                                label="Is Active"
                                size="small"
                                checked={store.isActive}
                                onChange={(val) => handleCheckboxChange("isActive", val)}
                                color="primary"
                                shape="square"
                            />
                        </FormField>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreInfoForm;

