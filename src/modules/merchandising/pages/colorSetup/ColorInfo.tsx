import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
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
import { addColor, clearColorMessages, clearColorState, editColor, getColor, setColorValidationErrors, updateColorField } from "../../reduxSlices/color.Slice";
import { colorSchema, ColorValidationErrors, IColor } from "./colorSetup.interface";


const ColorInfo = () => {

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { colors, color, error, message, validationErrors } = useSelector((state: RootState) => state.color);
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
        [dispatch, color]
    );
    useEffect(() => {
        //debugger
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearColorMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearColorMessages());
        }
    }, [message]);

    useEffect(() => {
        document.title = "Color Setup";
        console.log("Color Form mounted");
        setPageTitle("Color Setup");
        // dispatch(fetchAllProductionType());
        return () => {
            document.title = "";
            dispatch(clearColorState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            document.title = "Color Edit";
            setPageTitle("Color Group Edit");
            setIsUpdateMode(true);
            dispatch(getColor(Number(id)))
        }
    }, [id]);

    const handleChange = (key: keyof IColor, value: string, displayValue?: string) => {
        dispatch(
            updateColorField({
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
        const parseResult = colorSchema.safeParse(colors);

        if (!parseResult.success) {
            const errors: ColorValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof IColor;
                errors[key] = issue.message;
            }
            dispatch(setColorValidationErrors(errors));
            return;
        }
        if (isUpdateMode) {
            dispatch(editColor({ id: Number(id), payload: color }));
        } else {
            dispatch(addColor(color));
        }
    };



    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="flex flex-col gap-2 mt-5">
                    {/* Buyer Name */}
                    <FormField
                        label="Buyer Name"
                        id="buyerName"
                        variant="block"
                    // error={validationErrors?.colorName}
                    >
                        <SelectDropdown
                            options={buyers}
                            value={color.buyerId.toString()}
                            isSameKeyValue={false}
                            labelKey="buyerName"
                            valueKey="id"
                            onChange={(val, item) => handleChange('buyerId', val)}
                            className="h-8 text-sm w-full bg-white dark:bg-gray-800"
                        />
                    </FormField>
                    {/* Color Name */}
                    <FormField
                        label="Color Name"
                        id="colorName"
                        variant="block"
                        error={validationErrors?.colorName}
                    >
                        <SimpleInputBox
                            value={color.colorName}
                            onChange={(val) => handleChange("colorName", val)}
                            id="colorName"
                            placeholder="Color Name"
                            className="w-full"
                        />
                    </FormField>
                    {/* Color Display Name */}
                    <FormField
                        label="Color Display Name"
                        id="colorDisplayName"
                        variant="block"
                        error={validationErrors?.colorDisplayName}
                    >
                        <SimpleInputBox
                            value={color.colorDisplayName}
                            onChange={(val) => handleChange("colorDisplayName", val)}
                            id="colorDisplayName"
                            placeholder="Color Display Name"
                            className="w-full"
                        />
                    </FormField>
                    {/* Description */}
                    <FormField
                        label="Description"
                        id="colorDescription"
                        variant="block"
                        error={validationErrors?.colorDescription}
                    >
                        <SimpleInputBox
                            value={color.colorDescription}
                            onChange={(val) => handleChange("colorDescription", val)}
                            id="colorDescription"
                            placeholder="Color Description"
                            className="w-full"
                        />
                    </FormField>
                </div>
            </div>
        </div>
    );
};

export default ColorInfo;