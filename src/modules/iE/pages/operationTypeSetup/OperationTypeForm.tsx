
import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import Button from "@/components/form/Button";
import Checkbox from "@/components/form/Checkbox";
import { FormField } from "@/components/form/FormField";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import PageHeader from "@/components/layout/PageHeader";
import Panel from "@/components/layout/Panel";
import { useTheme } from "@/hooks/useTheme";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { faBackward, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addOperationType, clearOperationTypeMessages, clearOperationTypeState, editOperationType, getOperationType, setOperationTypeValidationErrors, updateOperationTypeField } from "../../reduxSlices/operationTypeSlice";
import { IOperationType, operationTypeSchema, OperationTypeValidationErrors } from "./operationTypeSetup.interface";


const OperationTypeForm = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { operationType, error, message, validationErrors } = useSelector((state: RootState) => state.operationType);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { rowsPerPage, layout, company } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearOperationTypeMessages());
        }

    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearOperationTypeMessages());
        }

    }, [message]);

    useEffect(() => {
        document.title = "Operation Type Add";
        console.log("OperationTypeForm mounted");
        setPageTitle("Operation Type Add");
        // dispatch(fetchAllProductionType());

        return () => {
            document.title = "";
            dispatch(clearOperationTypeState());

        };
    }, [dispatch]);

    useEffect(() => {

        if (id) {
            document.title = "OperationType Edit";
            setPageTitle("Operation Type Edit");
            setIsUpdateMode(true);
            dispatch(getOperationType(Number(id)))
        }

    }, [id]);

    const handleChange = (key: keyof IOperationType, value: string, displayValue?: string) => {
        dispatch(
            updateOperationTypeField({
                key: key,
                value: value,
            })
        );
    };

    const handleCheckboxChange = (key: keyof IOperationType, value: boolean) => {
        dispatch(
            updateOperationTypeField({
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
        const parseResult = operationTypeSchema.safeParse(operationType);

        if (!parseResult.success) {
            const errors: OperationTypeValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof IOperationType;
                errors[key] = issue.message;
            }

            dispatch(setOperationTypeValidationErrors(errors));
            return;
        }

        if (isUpdateMode) {
            dispatch(editOperationType({ id: Number(id), payload: operationType }));
        } else {
            dispatch(addOperationType(operationType));
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
                <div className="grid grid-cols-1 lg:grid-cols-4">
                    <div className="flex flex-col">
                        <FormField
                            label='Operation Type'
                            id='OperationType'
                            variant='block'
                            error={validationErrors?.type}
                        >
                            <SimpleInputBox
                                value={operationType.type}
                                onChange={(val) => handleChange("type", val)}
                                id="code"
                                placeholder="Type Operation Type"
                                className="w-full"
                            />
                        </FormField>
                        <FormField
                            label="Remarks"
                            id="Remarks"
                            variant="block"
                            error={validationErrors?.remarks}
                        >

                            <SimpleInputBox
                                value={operationType.remarks}
                                onChange={(val) => handleChange("remarks", val)}
                                id="code"
                                placeholder="Remarks"
                                className="w-full"
                            />
                        </FormField>
                        <div className="pt-2">
                            <FormField
                                label=""
                                id="IsActive"
                                variant="block"
                                error={validationErrors?.remarks}
                            >
                                <Checkbox
                                    label="is Active?"
                                    id='isActive'
                                    checked={operationType.isActive}
                                    onChange={(val) => handleCheckboxChange("isActive", val)}
                                    size='small'
                                ></Checkbox>
                            </FormField>
                        </div>
                    </div>
                </div>
            </Panel >
        </>
    );
};

export default OperationTypeForm;

