import { getRoutes, RouteLayout } from "@/app/constants";
import { setDropdownData } from "@/app/dropdownSlice";
import { AppDispatch, RootState } from "@/app/store";
import Button from "@/components/form/Button";
import PageHeader from "@/components/layout/PageHeader";
import Panel from "@/components/layout/Panel";
import Tabs from "@/components/layout/Tabs";
import { useTheme } from "@/hooks/useTheme";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { faBackward, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { addMaterialSubGroup, clearMaterialSubGroupMessages, clearMaterialSubGroupState, editMaterialSubGroup, getMaterialSubGroup, setMaterialSubGroupValidationErrors, updateMaterialSubGroupField } from "../../reduxSlices/materialsubgroupSlice";
import GLMaterialSub from "./GLMaterialSub";
import MaterialSubBasic from "./MaterialSubBasic";
import { IMaterialSubGroup, materialsubGroupSchema, MaterialSubGroupValidationErrors } from './materialsubgroup.interface';

const MaterialSubGroupForm = () => {

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { materialSubGroups, materialSubGroup, error, message, validationErrors } = useSelector((state: RootState) => state.materialSubGroup);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>("");
    const { rowsPerPage, layout, company } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);
    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearMaterialSubGroupMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearMaterialSubGroupMessages());
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

        document.title = "Material Sub Group Setup";
        console.log("Material Sub Group Form mounted");
        setPageTitle("Material Sub Group Setup");
        // dispatch(fetchAllProductionType());
        return () => {
            document.title = "";
            dispatch(clearMaterialSubGroupState());

        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            document.title = "MaterialSubGroup Edit";
            setPageTitle("Material Sub Group Edit");
            setIsUpdateMode(true);
            dispatch(getMaterialSubGroup(Number(id)))
        }
    }, [id]);

    const handleChange = (key: keyof IMaterialSubGroup, value: string, displayValue?: string) => {
        dispatch(
            updateMaterialSubGroupField({
                key: key,
                value: value,
            })
        );
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(webRoutes.MATERIAL_SUBGROUP_LIST);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parseResult = materialsubGroupSchema.safeParse(materialSubGroups);
        if (!parseResult.success) {
            const errors: MaterialSubGroupValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof IMaterialSubGroup;
                errors[key] = issue.message;
            }
            dispatch(setMaterialSubGroupValidationErrors(errors));
            return;
        }
        if (isUpdateMode) {
            dispatch(editMaterialSubGroup({ id: Number(id), payload: materialSubGroup }));
        } else {
            dispatch(addMaterialSubGroup(materialSubGroup));
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
                            <MaterialSubBasic />
                        )
                    },
                    {
                        label: "G/L Info",
                        content: (
                            <GLMaterialSub />
                        )
                    }
                ]}
            >
            </Tabs>
        </div>
    );
};

export default MaterialSubGroupForm;
