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
import { clearMaterialInfoMessages, clearMaterialInfoState, getMaterialInfo, updateMaterialInfoField } from "../../reduxSlices/materialInfo.Slice";
import BasicMaterialInfo from "./BasicMaterialInfo";
import GLInfo from "./GLInfo";
import ItemToStoreMap from "./ItemToStoreMap";
import { IMaterial } from "./materialinfo.interface";
import MeasurementInfo from "./MeasurementInfo";
import OtherInfo from "./OtherInfo";
import SectionInfo from "./SectionInfo";

const MaterialInfoForm = () => {

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { materials, material, error, message, validationErrors } = useSelector((state: RootState) => state.material);
    const { materialGroups, materialGroup } = useSelector((state: RootState) => state.materialGroup);
    const { materialSubGroups, materialSubGroup } = useSelector((state: RootState) => state.materialSubGroup);
    const { sections } = useSelector((state: RootState) => state.section);
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
        [dispatch, material, materialGroup, materialSubGroup]
    );
    useEffect(() => {
        //debugger
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearMaterialInfoMessages());
        }

    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearMaterialInfoMessages());
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
        setPageTitle("Material Details");
        // dispatch(fetchAllProductionType());
        return () => {
            document.title = "";
            dispatch(clearMaterialInfoState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            document.title = "MaterialInfo Edit";
            setPageTitle("Material Group Edit");
            setIsUpdateMode(true);
            dispatch(getMaterialInfo(Number(id)))
        }
    }, [id]);

    const handleChange = (key: keyof IMaterial, value: string, displayValue?: string) => {
        dispatch(
            updateMaterialInfoField({
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
        // const parseResult = materialInfoSchema.safeParse(materialgroup);

        // if (!parseResult.success) {
        //     const errors: MaterialInfoValidationErrors = {};
        //     for (const issue of parseResult.error.issues) {
        //         const key = issue.path[0] as keyof IMaterial;
        //         errors[key] = issue.message;
        //     }
        //     dispatch(setMaterialInfoValidationErrors(errors));
        //     return;
        // }
        // if (isUpdateMode) {
        //     dispatch(editMaterialInfo({ id: Number(id), payload: materialgroup }));
        // } else {
        //     dispatch(addMaterialInfo(materialInfo));
        // }
    };

    return (
        <div className="p-2">
            {/* Tabs */}
            <Tabs
                variant="underline"
                tabs={[
                    {
                        label: "Basic Info",
                        content: (
                            <BasicMaterialInfo />
                        )
                    },
                    {
                        label: "Measurement",
                        content: (
                            <MeasurementInfo />
                        )
                    },
                    {
                        label: "G/L Info",
                        content: (
                            <GLInfo />
                        )
                    },
                    {
                        label: "Item To Store Map",
                        content: (
                            <ItemToStoreMap />
                        )
                    },
                    {
                        label: "Other",
                        content: (
                            <OtherInfo />
                        )
                    },
                    {
                        label: "Section",
                        content: (
                            <SectionInfo />
                        )
                    },
                ]}
            >
            </Tabs>
        </div>
    );
};

export default MaterialInfoForm;
