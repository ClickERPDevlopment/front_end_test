
import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import { FormField } from "@/components/form/FormField";
import SelectDropdown from "@/components/form/SelectDropdown";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import { ActionButtons, ActionType } from "@/components/layout/ActionButtons";
import { useTheme } from "@/hooks/useTheme";
import { useDashboardActions } from "@/layouts/DashboardLayout";
import { IEMachineTypeOptions, MODAL_KEYS } from "@/types/global";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addMachine, clearMachineMessages, clearMachineState, editMachine, getMachine, setMachineValidationErrors, updateMachineField } from "../../reduxSlices/machine.Slice";
import { ieMachinesSchema, IMachines, MachineValidationErrors } from "./machine.interface";

const MachineSetupForm = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { machine, error, message, validationErrors } = useSelector((state: RootState) => state.machine);
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
        [dispatch, machine]
    );
    useEffect(() => {
        //debugger
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearMachineMessages());
        }

    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearMachineMessages());
        }

    }, [message]);

    useEffect(() => {
        document.title = "Machine Setup";
        console.log("MachineSetupForm mounted");
        setPageTitle("Machine Setup");
        // dispatch(fetchAllProductionType());

        return () => {
            document.title = "";
            dispatch(clearMachineState());

        };
    }, [dispatch]);

    useEffect(() => {

        if (id) {
            document.title = "MachineSetup Edit";
            setPageTitle("MachineSetup Edit");
            setIsUpdateMode(true);
            dispatch(getMachine(Number(id)))
        }

    }, [id]);

    const handleChange = (key: keyof IMachines, value: string, displayValue?: string) => {
        dispatch(
            updateMachineField({
                key: key,
                value: value,
            })
        );
    };


    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(webRoutes.IE_MACHINES_LIST);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parseResult = ieMachinesSchema.safeParse(machine);

        if (!parseResult.success) {
            const errors: MachineValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof IMachines;
                errors[key] = issue.message;
            }

            dispatch(setMachineValidationErrors(errors));
            return;
        }

        if (isUpdateMode) {
            dispatch(editMachine({ id: Number(id), payload: machine }));
        } else {
            dispatch(addMachine(machine));
        }

    };

    const openModal = (id: number) => {

        navigate(`/webapp/modal/${MODAL_KEYS.IE_MACHINES_ADD}`, {
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
            <div className="grid grid-cols-3">
                <div className="flex flex-col gap-2 mt-5">
                    <FormField
                        label='Machine Type'
                        id='MachineType'
                        variant='block'
                        error={validationErrors?.type}
                    >
                        <SelectDropdown
                            options={IEMachineTypeOptions}
                            value={machine.type}
                            isSameKeyValue={true}
                            onChange={(val) => handleChange("type", val)}
                            className="h-8 text-sm w-full"
                        />
                    </FormField>
                    <FormField
                        label="Machine Code"
                        id="IEMachineCode"
                        variant="block"
                        error={validationErrors?.code}
                    >

                        <SimpleInputBox
                            value={machine.code}
                            onChange={(val) => handleChange("code", val)}
                            id="code"
                            placeholder="Type Machine Code"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Machine Name"
                        id="IEMachineName"
                        variant="block"
                        error={validationErrors?.name}
                    >
                        <SimpleInputBox
                            value={machine.name}
                            onChange={(val) => handleChange("name", val)}
                            id="name"
                            placeholder="Type Machine Name"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Machine Category"
                        id="IEMachineCategory"
                        variant="block"
                        error={validationErrors?.category}
                    >
                        <SimpleInputBox
                            value={machine.category}
                            onChange={(val) => handleChange("category", val)}
                            id="category"
                            placeholder="Type Machine Category"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Machine Brand"
                        id="IEMachineBrand"
                        variant="block"
                        error={validationErrors?.brand}
                    >
                        <SimpleInputBox
                            value={machine.brand}
                            onChange={(val) => handleChange("brand", val)}
                            id="brand"
                            placeholder="Type Machine Brand"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Machine Model"
                        id="IEMachineModel"
                        variant="block"
                        error={validationErrors?.model}
                    >
                        <SimpleInputBox
                            value={machine.model}
                            onChange={(val) => handleChange("model", val)}
                            id="model"
                            placeholder="Type Machine Model"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Machine Wastage"
                        id="IEMachineWastage"
                        variant="block"
                        error={validationErrors?.wastage}
                    >
                        <SimpleInputBox
                            value=""
                            onChange={(val) => handleChange("wastage", val)}
                            id="wastage"
                            placeholder="Type Machine Wastage"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="No of Cone"
                        id="IEMachineCone"
                        variant="block"
                        error={validationErrors?.cone}
                    >
                        <SimpleInputBox
                            value={machine.cone}
                            onChange={(val) => handleChange("cone", val)}
                            id="cone"
                            placeholder="Type Machine Cone"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Remarks"
                        id="IEMachineRemarks"
                        variant="block"
                        error={validationErrors?.remarks}
                    >
                        <SimpleInputBox
                            value={machine.remarks}
                            onChange={(val) => handleChange("remarks", val)}
                            id="remarks"
                            placeholder="Type Machine Remarks"
                            className="w-full"
                        />
                    </FormField>
                </div>
            </div>
        </div>
    );
};

export default MachineSetupForm;

