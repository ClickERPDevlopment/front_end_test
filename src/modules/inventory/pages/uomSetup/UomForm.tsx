import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import { FormField } from "@/components/form/FormField";
import SelectDropdown from "@/components/form/SelectDropdown";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import { ActionButtons, ActionType } from "@/components/layout/ActionButtons";
import { useTheme } from "@/hooks/useTheme";
import { useDashboardActions } from "@/layouts/DashboardLayout";
import { MODAL_KEYS, UOMMeasurementTypeOptions, } from "@/types/global";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addUom, clearUomMessages, clearUomState, editUom, getUom, setUomValidationErrors, updateUomField } from "../../reduxSlices/uom.Slice";
import { IUom, uomSchema, UomValidationErrors } from "./uom.interface";
const UomForm = () => {

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { uoms, uom, error, message, validationErrors } = useSelector((state: RootState) => state.uom);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { rowsPerPage, layout, company } = useTheme();
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
        [dispatch, uom]
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
        document.title = "Uom Add";
        console.log("UomForm mounted");
        setPageTitle("Uom Add");
        // dispatch(fetchAllProductionType());
        return () => {
            document.title = "";
            dispatch(clearUomState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            document.title = "Uom Edit";
            setPageTitle("Uom Edit");
            setIsUpdateMode(true);
            dispatch(getUom(Number(id)))
        }
    }, [id]);

    const handleChange = (key: keyof IUom, value: string, displayValue?: string) => {
        dispatch(
            updateUomField({
                key: key,
                value: value,
            })
        );
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(webRoutes.UOM_LIST);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parseResult = uomSchema.safeParse(uom);
        if (!parseResult.success) {
            const errors: UomValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof IUom;
                errors[key] = issue.message;
            }
            dispatch(setUomValidationErrors(errors));
            return;
        }
        if (isUpdateMode) {
            dispatch(editUom({ id: Number(id), payload: uom }));
        } else {
            dispatch(addUom(uom));
        }
    };

    const openModal = (id: number) => {
        navigate(`/webapp/modal/${MODAL_KEYS.UOM_ADD}`, {
            state: {
                backgroundLocation: {
                    pathname: location.pathname,
                    search: location.search,
                    hash: location.hash,
                }
            }, // this is key
        });
    };

    return (
        <div>
            {/* Bottom Section: Full-width Table */}
            {/* Measurement Type */}
            <div className="p-2 grid grid-cols-1">
                <div className="grid grid-cols-1 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-xl xl:max-w-xl gap-2">
                    {/* Floor Code */}
                    <FormField
                        label="Measurement Type"
                        id="MeasurementType"
                        variant="block"
                        error={validationErrors?.uomType}
                    >
                        {/* need to modify as tna optionbox */}
                        <SelectDropdown
                            options={UOMMeasurementTypeOptions}
                            value={uom.uomType}
                            isSameKeyValue={true}
                            onChange={(val) => handleChange("uomType", val)}
                            className="text-sm w-full"
                        />
                    </FormField>
                    {/* Uom Name */}
                    <FormField
                        label="Uom Name"
                        id="UomName"
                        variant="block"
                        error={validationErrors?.uomName}
                    >
                        <SimpleInputBox
                            value={uom.uomName}
                            onChange={(val) => handleChange("uomName", val)}
                            id="name"
                            placeholder="Type uom Name"
                            className="w-full"
                        />
                    </FormField>
                    {/* Short name */}
                    <FormField
                        label="Short Name"
                        id="ShortName"
                        variant="block"
                        error={validationErrors?.uomShortname}
                    >
                        <SimpleInputBox
                            value={uom.uomShortname}
                            onChange={(val) => handleChange("uomShortname", val)}
                            id="shortname"
                            placeholder="Short Name"
                            className="w-full"
                        />
                    </FormField>
                    {/* Convert Rate */}
                    <FormField
                        error={validationErrors?.uomConvertRate}
                        label="Currency Rate" id="CurrencyRate" variant="block">
                        <SimpleInputBox
                            value={uom.uomConvertRate.toString()}
                            onChange={(val) => handleChange("uomConvertRate", val)}
                            id="rate"
                            type="number"
                            placeholder="Type Convert Rate"
                            className="w-full"
                        />
                    </FormField>
                </div>
            </div>
        </div>
    );
};

export default UomForm;

