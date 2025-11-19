import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import Checkbox from "@/components/form/Checkbox";
import { FormField } from "@/components/form/FormField";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import { ActionButtons, ActionType } from "@/components/layout/ActionButtons";
import { useTheme } from "@/hooks/useTheme";
import { useDashboardActions } from "@/layouts/DashboardLayout";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addCurrency, clearCurrencyMessages, clearCurrencyState, editCurrency, getCurrency, setCurrencyValidationErrors, updateCurrencyField } from "../../reduxSlices/currencySlice";
import { currencySchema, CurrencyValidationErrors, ICurrency } from "./currency.interface";

const CurrencyForm = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { currency, error, message, validationErrors } = useSelector((state: RootState) => state.currency);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>("");
    const { setActions } = useDashboardActions();
    const [isEditMode, setIsEditMode] = useState(false);

        const {  layout } = useTheme();
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
        [dispatch, currency]
    );
    useEffect(() => {
        //debugger
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearCurrencyMessages());
        }

    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearCurrencyMessages());
        }

    }, [message]);

    useEffect(() => {
        document.title = "Currency Add";
        setPageTitle("Currency Add");
        // dispatch(fetchAllProductionType());
        return () => {
            document.title = "Currency Add";
            dispatch(clearCurrencyState());

        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            document.title = "Currency Edit";
            setPageTitle("Currency Edit");
            setIsUpdateMode(true);
            dispatch(getCurrency(Number(id)))
        }
    }, [id]);

    const handleChange = (key: keyof ICurrency, value: string, displayValue?: string) => {
        dispatch(
            updateCurrencyField({
                key: key,
                value: value,
            })
        );
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(webRoutes.CURRENCY_LIST);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parseResult = currencySchema.safeParse(currency);

        if (!parseResult.success) {
            const errors: CurrencyValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof ICurrency;
                errors[key] = issue.message;
            }

            dispatch(setCurrencyValidationErrors(errors));
            return;
        }
        if (isUpdateMode) {
            dispatch(editCurrency({ id: Number(id), payload: currency }));
        } else {
            dispatch(addCurrency(currency));
        }
    };

    return (
        <div>
            {/* Bottom Section: Full-width Table */}
            <div className="grid grid-cols-1 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-xl xl:max-w-xl">
                <div className="flex flex-col gap-2 mt-5">

                    <FormField
                        error={validationErrors?.Currencyname}
                        label="Currency Name" id="CurrencyName" variant="block">
                        <SimpleInputBox
                            value={currency.Currencyname}
                            onChange={(val) => handleChange("Currencyname", val)}
                            id="currencyName"
                            placeholder="Type Currency Name"
                            className="w-full"
                        />
                    </FormField>

                    <FormField
                        error={validationErrors?.Currencycode}
                        label="Currency Code" id="CurrencyCode" variant="block">
                        <SimpleInputBox
                            value={currency.Currencycode}
                            onChange={(val) => handleChange("Currencycode", val)}
                            id="currencyCode"
                            placeholder="Type Currency Code"
                            className="w-full"
                        />
                    </FormField>

                    <FormField
                        error={validationErrors?.Symbol}
                        label="Currency Symbol" id="CurrencySymbol" variant="block">
                        <SimpleInputBox
                            value={currency.Symbol}
                            onChange={(val) => handleChange("Symbol", val)}
                            id="currencySymbol"
                            placeholder="Type Currency Symbol"
                            className="w-full"
                        />
                    </FormField>


                    <div className="flex">
                        <Checkbox
                            id="is-active"
                            label="Default Currency"
                            checked={false}
                            size="small"
                        />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CurrencyForm;
