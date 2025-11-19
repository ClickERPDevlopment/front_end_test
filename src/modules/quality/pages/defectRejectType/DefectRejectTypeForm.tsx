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
import { addDefectRejectType, clearDefectRejectTypeMessages, clearDefectRejectTypeState, editDefectRejectType, getDefectRejectType, setDefectRejectTypeValidationErrors, updateDefectRejectTypeField } from "../../reduxSlices/defectRejectType.Slice";
import { defectRejectTypeSchema, DefectRejectTypeValidationErrors, IDefectRejectType } from './defectRejectType.interface';

const DefectRejectTypeForm = () => {

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { defectReject, error, message, validationErrors } = useSelector((state: RootState) => state.defectReject);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        [dispatch, defectReject]
    );
    useEffect(() => {
        //debugger
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearDefectRejectTypeMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearDefectRejectTypeMessages());
        }
    }, [message]);

    useEffect(() => {
        document.title = "DefectRejects Add";
        console.log("DefectRejects Form mounted");
        setPageTitle("DefectRejects Add");
        // dispatch(fetchAllProductionType());
        return () => {
            document.title = "";
            dispatch(clearDefectRejectTypeState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            document.title = "DefectRejects Edit";
            setPageTitle("DefectRejects Edit");
            setIsUpdateMode(true);
            dispatch(getDefectRejectType(Number(id)))
        }
    }, [id]);

    const handleChange = (key: keyof IDefectRejectType, value: string, displayValue?: string) => {
        dispatch(
            updateDefectRejectTypeField({
                key: key,
                value: value,
            })
        );
    };

    const handleCheckboxChange = (key: keyof IDefectRejectType, value: boolean) => {
        dispatch(
            updateDefectRejectTypeField({
                key: key,
                value: value,
            })
        );
    };


    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(webRoutes.DEFECT_REJECTS_LIST);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parseResult = defectRejectTypeSchema.safeParse(defectReject);

        if (!parseResult.success) {
            const errors: DefectRejectTypeValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof IDefectRejectType;
                errors[key] = issue.message;
            }
            dispatch(setDefectRejectTypeValidationErrors(errors));
            return;
        }
        if (isUpdateMode) {
            dispatch(editDefectRejectType({ id: Number(id), payload: defectReject }));
        } else {
            dispatch(addDefectRejectType(defectReject));
        }
    };

    // const openModal = (id: number) => {

    //     navigate(`/webapp/modal/${MODAL_KEYS.IEMACHINESETUP_ADD}`, {
    //         state: {
    //             backgroundLocation: {
    //                 pathname: location.pathname,
    //                 search: location.search,
    //                 hash: location.hash,
    //             }
    //         }, // this is key
    //     });
    // };

    return (
        <div>
            <div className="md:grid grid-cols-2">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-4 mb-2 pt-2">
                        <Checkbox
                            id="isDefect"
                            label='Is Defect?'
                            checked={defectReject.isDefect}
                            onChange={(val) => handleCheckboxChange("isDefect", val)}
                            size='small'
                        />
                        <Checkbox
                            id="isReject"
                            label='Is Reject?'
                            checked={defectReject.isReject}
                            onChange={(val) => handleCheckboxChange("isReject", val)}
                            size='small'
                        />
                    </div>
                    <FormField
                        label="Defect/Reject Code"
                        id="code"
                        variant="block"
                        error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={defectReject.code}
                            onChange={(val) => handleChange("code", val)}
                            id="code"
                            placeholder="Type Defect/Reject Code"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Defect/Reject Name"
                        id="name"
                        variant="block"
                        error={validationErrors?.name}
                    >
                        <SimpleInputBox
                            value={defectReject.name}
                            onChange={(val) => handleChange("name", val)}
                            id="name"
                            placeholder="Type Defect/Reject Name"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Defect/Reject Type"
                        id="type"
                        variant="block"
                        error={validationErrors?.type}
                    >
                        <SimpleInputBox
                            value={defectReject.type}
                            onChange={(val) => handleChange("type", val)}
                            id="type"
                            placeholder="Type Defect/Reject Type"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Sort By"
                        id="sortBy"
                        variant="block"
                        error={validationErrors?.sortBy}
                    >
                        <SimpleInputBox
                            value={defectReject.sortBy}
                            onChange={(val) => handleChange("sortBy", val)}
                            id="remarks"
                            placeholder="Type Sort By"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Penalty Points"
                        id="penaltyPoints"
                        variant="block"
                        error={validationErrors?.penaltyPoints}
                    >
                        <SimpleInputBox
                            value={defectReject.penaltyPoints}
                            onChange={(val) => handleChange("penaltyPoints", val)}
                            id="remarks"
                            type="number"
                            placeholder="Type Sort By"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Remarks"
                        id="remarks"
                        variant="block"
                        error={validationErrors?.remarks}
                    >
                        <SimpleInputBox
                            value={defectReject.remarks}
                            onChange={(val) => handleChange("remarks", val)}
                            id="remarks"
                            placeholder="Type Remarks"
                            className="w-full"
                        />
                    </FormField>
                </div>
            </div>
        </div >
    );
};

export default DefectRejectTypeForm;

