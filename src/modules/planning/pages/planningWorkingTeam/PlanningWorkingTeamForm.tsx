
import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import Button from "@/components/form/Button";
import Checkbox from "@/components/form/Checkbox";
import { FormField } from "@/components/form/FormField";
import SelectDropdown from "@/components/form/SelectDropdown";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import PageHeader from "@/components/layout/PageHeader";
import Panel from "@/components/layout/Panel";
import { useTheme } from "@/hooks/useTheme";
import { PlanningRoleOptions } from "@/types/global";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { faBackward, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearPlanningWorkingTeamMessages, clearPlanningWorkingTeamState, getPlanningWorkingTeam, setPlanningWorkingTeamValidationErrors, updatePlanningWorkingTeamField, updatePlanningWorkingTeamRow } from "../../reduxSlices/planningWorkingTeam.Slice";
import { IPlanningWorkingTeam, planningWorkingTeamSchema, PlanningWorkingTeamValidationErrors } from "./planningWorkingTeam.interface";
const PlanningWorkingTeamForm = () => {

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { planningWorkingTeam, error, message, validationErrors } = useSelector((state: RootState) => state.planningWorkingTeam);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
 const { rowsPerPage, layout, company } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);
    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearPlanningWorkingTeamMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearPlanningWorkingTeamMessages());
        }
    }, [message]);

    useEffect(() => {
        document.title = "Planning Working Team Setup";
        console.log("Planning Working Team Mounted");
        setPageTitle("Planning Working Team Save");
        // dispatch(fetchAllProductionType());
        return () => {
            document.title = "";
            dispatch(clearPlanningWorkingTeamState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            document.title = "Planning Working Team Edit";
            setPageTitle("Planning Working Team Edit");
            setIsUpdateMode(true);
            dispatch(getPlanningWorkingTeam(Number(id)))
        }
    }, [id]);

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(webRoutes.PLANNING_WORKING_TEAM_LIST);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parseResult = planningWorkingTeamSchema.safeParse(planningWorkingTeam);
        if (!parseResult.success) {
            const errors: PlanningWorkingTeamValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof IPlanningWorkingTeam;
                errors[key] = issue.message;
            }
            dispatch(setPlanningWorkingTeamValidationErrors(errors));
            return;
        }
        // if (isUpdateMode) {
        //     dispatch(editPurchaseRequisition({ id: Number(id), payload: planningWorkingTeam }));
        // } else {
        //     dispatch(addPurchaseRequisition(planningWorkingTeam));
        // }
    };

    const handleChange = (key: keyof IPlanningWorkingTeam, value: string, displayValue?: string) => {
        dispatch(
            updatePlanningWorkingTeamField({
                key: key,
                value: value,
            })
        );
    };

    // for updating a single row from table
    const handleChangeRows = (index: number, key: keyof IPlanningWorkingTeam, value: string) => {
        dispatch(updatePlanningWorkingTeamRow({ index, key, value }));
    };

    const handleCheckboxChange = (key: keyof IPlanningWorkingTeam, value: boolean) => {
        dispatch(
            updatePlanningWorkingTeamField({
                key: key,
                value: value,
            })
        );
    };

    return (
        <>
            <Panel
                header={
                    <PageHeader
                        title={pageTitle}
                    />
                }
                footer={
                    <div className="flex items-center justify-between p-2 border-b border-gray-200">
                        <Button
                            onClick={handleSubmit}
                            size="sm"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            <FontAwesomeIcon icon={faSave} /> Save Change
                        </Button>
                        <Button
                            onClick={handleBack}
                            size="sm"
                            variant="outlined"
                            className="px-4 py-2 float-end bg-white text-black rounded hover:bg-gray-200">
                            <FontAwesomeIcon icon={faBackward} /> Back
                        </Button>
                    </div>
                }
            >
                <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-1">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                {/* first row */}
                                <FormField
                                    label="Team Name"
                                    id="teamName"
                                    variant="block"
                                    labelFontSize="text-sm"
                                    error={validationErrors?.teamName}
                                >
                                    <SimpleInputBox
                                        value={planningWorkingTeam.teamName}
                                        onChange={(val) => handleChange("teamName", val)}
                                        id="teamName"
                                        type="text"
                                        placeholder="Type Team Name"
                                        className="w-full"
                                    />
                                </FormField>
                                <FormField
                                    label="User Code"
                                    id="userCode"
                                    variant="block"
                                    labelFontSize="text-sm"
                                    error={validationErrors?.userCode}
                                >
                                    <SimpleInputBox
                                        value={planningWorkingTeam.userCode}
                                        onChange={(val) => handleChange("userCode", val)}
                                        id="userCode"
                                        type="text"
                                        placeholder="Type User Code"
                                        className="w-full"
                                    />
                                </FormField>
                                <FormField
                                    label="User Role"
                                    id="role"
                                    variant="block"
                                    labelFontSize="text-sm"
                                    error={validationErrors?.role}
                                >
                                    <SelectDropdown
                                        options={PlanningRoleOptions}
                                        value={planningWorkingTeam.role}
                                        isSameKeyValue={true}
                                        onChange={(val) => handleChange("role", val)}
                                        className="h-8 text-sm w-full"
                                    />
                                </FormField>
                                <FormField
                                    label=""
                                    id="role"
                                    variant="block"
                                    labelFontSize="text-sm"
                                    error={validationErrors?.role}
                                >
                                    <Checkbox
                                        label="Is Active"
                                        size="small"
                                        checked={planningWorkingTeam.isActive}
                                        onChange={(val) => handleCheckboxChange("isActive", val)}
                                        color="primary"
                                        shape="square"
                                    />
                                </FormField>
                            </div>
                            <div>
                                {/* second row */}
                                <FormField
                                    label="Name"
                                    id="name"
                                    variant="block"
                                    labelFontSize="text-sm"
                                    error={validationErrors?.name}
                                >
                                    <SimpleInputBox
                                        value={planningWorkingTeam.name}
                                        onChange={(val) => handleChange("name", val)}
                                        id="userCode"
                                        type="text"
                                        placeholder="Type User Code"
                                        className="w-full"
                                    />
                                </FormField>
                                <FormField
                                    label="Designation"
                                    id="designation"
                                    variant="block"
                                    labelFontSize="text-sm"
                                    error={validationErrors?.designation}
                                >
                                    <SimpleInputBox
                                        value={planningWorkingTeam.designation}
                                        onChange={(val) => handleChange("designation", val)}
                                        id="designation"
                                        type="text"
                                        placeholder="Type Designation"
                                        className="w-full"
                                    />
                                </FormField>
                                <FormField
                                    label="Department"
                                    id="department"
                                    variant="block"
                                    labelFontSize="text-sm"
                                    error={validationErrors?.department}
                                >
                                    <SimpleInputBox
                                        value={planningWorkingTeam.department}
                                        onChange={(val) => handleChange("department", val)}
                                        id="department"
                                        type="text"
                                        placeholder="Type Department"
                                        className="w-full"
                                    />
                                </FormField>
                                <FormField
                                    label="Email"
                                    id="email"
                                    variant="block"
                                    labelFontSize="text-sm"
                                    error={validationErrors?.email}
                                >
                                    <SimpleInputBox
                                        value={planningWorkingTeam.email}
                                        onChange={(val) => handleChange("email", val)}
                                        id="email"
                                        type="text"
                                        placeholder="Type User Email"
                                        className="w-full"
                                    />
                                </FormField>
                            </div>
                        </div>

                    </div>

                </div>
            </Panel >
        </>
    );
};

export default PlanningWorkingTeamForm;
