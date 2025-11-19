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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { addSize, clearSizeMessages, clearSizeState, editSize, getSize, setSizeValidationErrors, updateSizeField } from "../../reduxSlices/size.Slice";
import { ISize, sizeSchema, SizeValidationErrors } from "./sizeSetup.interface";

const SizeInfo = () => {

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    // states
    const { sizes, size, error, message, validationErrors } = useSelector((state: RootState) => state.size);
    const { buyers, buyer } = useSelector((state: RootState) => state.buyer);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>("");
    const { setActions } = useDashboardActions();
    const [isEditMode, setIsEditMode] = useState(false);
    
 const { rowsPerPage, layout, company } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);
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
        [dispatch, size]
    );
    useEffect(() => {
        //debugger
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearSizeMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearSizeMessages());
        }
    }, [message]);

    useEffect(() => {
        document.title = "Size Setup";
        console.log("Size Form mounted");
        setPageTitle("Size Setup");
        // dispatch(fetchAllProductionType());
        return () => {
            document.title = "";
            dispatch(clearSizeState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            document.title = "Size Edit";
            setPageTitle("Size Group Edit");
            setIsUpdateMode(true);
            dispatch(getSize(Number(id)))
        }
    }, [id]);

    const handleChange = (key: keyof ISize, value: string, displayValue?: string) => {
        dispatch(
            updateSizeField({
                key: key,
                value: value,
            })
        );
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(webRoutes.MATERIALGROUP_LIST);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parseResult = sizeSchema.safeParse(sizes);

        if (!parseResult.success) {
            const errors: SizeValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof ISize;
                errors[key] = issue.message;
            }
            dispatch(setSizeValidationErrors(errors));
            return;
        }
        if (isUpdateMode) {
            dispatch(editSize({ id: Number(id), payload: size }));
        } else {
            dispatch(addSize(size));
        }
    };

    const handleCheckboxChange = (key: keyof ISize, value: boolean) => {
        dispatch(
            updateSizeField({
                key: key,
                value: value,
            })
        );
    };

    return (
        <div>
            <div className="grid grid-cols-3">
                <div className="flex flex-col gap-2 mt-5">
                    <FormField
                        label="Buyer Name"
                        id="buyerName"
                        variant="block"
                        error={validationErrors?.buyerName}
                    >
                        <SelectDropdown
                            options={buyers} //{sizes} confusion here
                            value={size.buyerId.toString()}
                            labelKey="buyerName"
                            valueKey="id"
                            isSameKeyValue={false}
                            onChange={(val) => handleChange("buyerId", val)}
                            className="h-8 text-sm w-full"
                        />
                    </FormField>


                    <FormField
                        label="Size"
                        id="sizeName"
                        variant="block"
                        error={validationErrors?.sizeName}
                    >
                        <SimpleInputBox
                            value={size.sizeName}
                            onChange={(val) => handleChange("sizeName", val)}
                            id="sizeName"
                            placeholder="Size Name"
                            className="w-full"
                        />
                    </FormField>

                    <FormField
                        label="Display Name"
                        id="displayName"
                        variant="block"
                        error={validationErrors?.displayName}
                    >
                        <SimpleInputBox
                            value={size.displayName}
                            onChange={(val) => handleChange("displayName", val)}
                            id="displayName"
                            placeholder="Display Name"
                            className="w-full"
                        />
                    </FormField>

                    <FormField
                        label="Sorting By"
                        id="sortingBy"
                        variant="block"
                        error={validationErrors?.sortingBy}
                    >
                        <SimpleInputBox
                            value={size.displayName}
                            onChange={(val) => handleChange("sortingBy", val)}
                            id="sortingBy"
                            placeholder="Sorting By"
                            className="w-full"
                        />
                    </FormField>

                    <FormField
                        label=""
                        id="isInSeam"
                        variant="block"
                        error={validationErrors?.isInSeam}
                    >
                        <Checkbox
                            label="Is Inseam"
                            checked={size.isInSeam}
                            onChange={(val) => handleCheckboxChange("isInSeam", val)}
                            color="primary"
                            shape="square"
                            size="small"
                        />
                    </FormField>
                </div>
            </div>
        </div>
    );
};

export default SizeInfo;