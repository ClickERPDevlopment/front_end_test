import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import { ActionButtons, ActionType } from "@/components/layout/ActionButtons";
import Tabs from "@/components/layout/Tabs";
import { useTheme } from "@/hooks/useTheme";
import { useDashboardActions } from "@/layouts/DashboardLayout";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { addBuyer, clearBuyerMessages, clearBuyerState, editBuyer, getBuyer, setBuyerValidationErrors, updateBuyerField } from "../../reduxSlices/buyer.Slice";
import BuyerBasicSetup from "./BuyerBasicSetup";
import { buyerSchema, BuyerValidationErrors, IBuyer } from "./buyerSetup.interface";

const BuyerInfo = () => {

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { buyers, buyer, error, message, validationErrors } = useSelector((state: RootState) => state.buyer);
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
        [dispatch, buyer]
    );
    useEffect(() => {
        //debugger
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearBuyerMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearBuyerMessages());
        }
    }, [message]);

    useEffect(() => {
        document.title = "Buyer Setup";
        console.log("Buyer Form mounted");
        setPageTitle("Buyer Setup");
        // dispatch(fetchAllProductionType());
        return () => {
            document.title = "";
            dispatch(clearBuyerState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            document.title = "Buyer Edit";
            setPageTitle("Buyer Group Edit");
            setIsUpdateMode(true);
            dispatch(getBuyer(Number(id)))
        }
    }, [id]);

    const handleChange = (key: keyof IBuyer, value: string, displayValue?: string) => {
        dispatch(
            updateBuyerField({
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
        const parseResult = buyerSchema.safeParse(buyers);

        if (!parseResult.success) {
            const errors: BuyerValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof IBuyer;
                errors[key] = issue.message;
            }
            dispatch(setBuyerValidationErrors(errors));
            return;
        }
        if (isUpdateMode) {
            dispatch(editBuyer({ id: Number(id), payload: buyer }));
        } else {
            dispatch(addBuyer(buyer));
        }
    };

    return (
        <div>
            <Tabs
                variant="underline"
                tabs={[
                    {
                        label: "Basic",
                        content: (
                            <BuyerBasicSetup />
                        )
                    },
                    {
                        label: "G/L",
                        content: (
                            <></>
                        )
                    },
                ]}
            >
            </Tabs>
        </div >
    );
};

export default BuyerInfo;