import { getRoutes, RouteLayout } from "@/app/constants";
import { setDropdownData } from "@/app/dropdownSlice";
import { AppDispatch, RootState } from "@/app/store";
import { ActionButtons, ActionType } from "@/components/layout/ActionButtons";
import Tabs from "@/components/layout/Tabs";
import { useTheme } from "@/hooks/useTheme";
import { useDashboardActions } from "@/layouts/DashboardLayout";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { addMaterialGroup, clearMaterialGroupMessages, clearMaterialGroupState, editMaterialGroup, getMaterialGroup, setMaterialGroupValidationErrors, updateMaterialGroupField } from "../../reduxSlices/materialgroup.Slice";
import BasicMaterial from "./BasicMaterial";
import GLMaterial from "./GLMaterial";
import { IMaterialGroup, materialGroupSchema, MaterialGroupValidationErrors } from "./materialgroup.interface";


const MaterialGroupForm = () => {

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { materialGroups, materialGroup, error, message, validationErrors } = useSelector((state: RootState) => state.materialGroup);
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
        [dispatch, materialGroup]
    );
    useEffect(() => {
        //debugger
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearMaterialGroupMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearMaterialGroupMessages());
        }
    }, [message]);

    useEffect(() => {
        dispatch(
            setDropdownData({
                name: 'ledgerAccounts',
                data: [
                    { id: '1', name: 'Cash in Hand', type: 'Assets' },
                    { id: '2', name: 'Bank Account', type: 'Assets' },
                    { id: '3', name: 'Accounts Receivable', type: 'Assets' },
                    { id: '4', name: 'Accounts Payable', type: 'Liabilities' },
                    { id: '5', name: 'Loan Payable', type: 'Liabilities' },
                    { id: '6', name: 'Sales Revenue', type: 'Income' },
                    { id: '7', name: 'Service Income', type: 'Income' },
                    { id: '8', name: 'Office Rent', type: 'Expenses' },
                    { id: '9', name: 'Utilities', type: 'Expenses' },
                    { id: '10', name: 'Salaries', type: 'Expenses' },
                    { id: '11', name: 'Owner’s Capital', type: 'Equity' },
                    { id: '12', name: 'Retained Earnings', type: 'Equity' }
                ],
                labelKey: 'name',
                valueKey: 'id',
            })
        );
        document.title = "Material Group Setup";
        console.log("Material Group Form mounted");
        setPageTitle("Material Group Setup");
        // dispatch(fetchAllProductionType());
        return () => {
            document.title = "";
            dispatch(clearMaterialGroupState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            document.title = "MaterialGroup Edit";
            setPageTitle("Material Group Edit");
            setIsUpdateMode(true);
            dispatch(getMaterialGroup(Number(id)))
        }
    }, [id]);

    const handleChange = (key: keyof IMaterialGroup, value: string, displayValue?: string) => {
        dispatch(
            updateMaterialGroupField({
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
        const parseResult = materialGroupSchema.safeParse(materialGroups);

        if (!parseResult.success) {
            const errors: MaterialGroupValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof IMaterialGroup;
                errors[key] = issue.message;
            }
            dispatch(setMaterialGroupValidationErrors(errors));
            return;
        }
        if (isUpdateMode) {
            dispatch(editMaterialGroup({ id: Number(id), payload: materialGroup }));
        } else {
            dispatch(addMaterialGroup(materialGroup));
        }
    };

    return (
        <div className="p-2">
            <Tabs
                variant="underline"
                tabs={[
                    {
                        label: "Basic Info",
                        content: (
                            <BasicMaterial />
                        )
                    },
                    {
                        label: "G/L Info",
                        content: (
                            <GLMaterial />
                        )
                    }
                ]}
            >
            </Tabs>
        </div>
    );
};

export default MaterialGroupForm;
