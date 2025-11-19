import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import Modal from "@/components/feedback-interaction/Modal";
import Button from "@/components/form/Button";
import Checkbox from "@/components/form/Checkbox";
import { FormField } from "@/components/form/FormField";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import PageHeader from "@/components/layout/PageHeader";
import Panel from "@/components/layout/Panel";
import { useTheme } from "@/hooks/useTheme";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { faBackward, faSave, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearPurchaseRequisitionDetailsMessages, clearPurchaseRequisitionDetailsState, getPurchaseRequisitionDetails, setPurchaseRequisitionDetailsValidationErrors, updatePurchaseRequisitionDetailsField, updatePurchaseRequisitionDetailsRow } from "../../reduxSlices/purchaseRequisitionDetails.Slice";
import PurchaseRequisitionHistoryForm from "../purchaseRequisitionHistory/PurchaseRequisitionHistoryForm";
import { IPurchaseRequisitionDetails, PurchaseRequisitionDetailsValidationErrors, purchaseRequisitonDetailsSchema } from "./purchaseRequisitionDetails.interface";

const PurchaseRequisitionDetailsForm = () => {

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { purchaseRequisitionDetails, error, message, validationErrors } = useSelector((state: RootState) => state.purchaseRequisitionDetails);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
 const { rowsPerPage, layout, company } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);
    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearPurchaseRequisitionDetailsMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearPurchaseRequisitionDetailsMessages());
        }
    }, [message]);

    useEffect(() => {
        document.title = "PurchaseRequisition Setup";
        console.log("PurchaseRequisitionForm mounted");
        setPageTitle("Purchase Requisition Approval");
        // dispatch(fetchAllProductionType());
        return () => {
            document.title = "";
            dispatch(clearPurchaseRequisitionDetailsState());

        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            document.title = "PurchaseRequisition Edit";
            setPageTitle("Purchase Requisition Edit");
            setIsUpdateMode(true);
            dispatch(getPurchaseRequisitionDetails(Number(id)))
        }
    }, [id]);

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(webRoutes.PURCHASE_REQ_APPROVAL);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parseResult = purchaseRequisitonDetailsSchema.safeParse(purchaseRequisitionDetails);

        if (!parseResult.success) {
            const errors: PurchaseRequisitionDetailsValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof IPurchaseRequisitionDetails;
                errors[key] = issue.message;
            }
            dispatch(setPurchaseRequisitionDetailsValidationErrors(errors));
            return;
        }
        // if (isUpdateMode) {
        //     dispatch(editPurchaseRequisition({ id: Number(id), payload: purchaseRequisitionDetails }));
        // } else {
        //     dispatch(addPurchaseRequisition(purchaseRequisitionDetails));
        // }
    };

    const handleChange = (key: keyof IPurchaseRequisitionDetails, value: string, displayValue?: string) => {
        dispatch(
            updatePurchaseRequisitionDetailsField({
                key: key,
                value: value,
            })
        );
    };

    // for updating a single row from table
    const handleChangeRows = (index: number, key: keyof IPurchaseRequisitionDetails, value: string) => {
        dispatch(updatePurchaseRequisitionDetailsRow({ index, key, value }));
    };


    const handleCheckboxChange = (key: keyof IPurchaseRequisitionDetails, value: boolean) => {
        dispatch(
            updatePurchaseRequisitionDetailsField({
                key: key,
                value: value,
            })
        );
    };


    // right table
    const TableRows = useSelector(
        (state: RootState) => state.purchaseRequisitionDetails.purchaseRequisitonDetailsList
    );

    const callPurchaseHistory = () => {
        //api call in future
        setIsModalOpen(true)
    }

    const TableColumns: Column<IPurchaseRequisitionDetails>[] = [
        { key: "id", header: "SL", render: (_, idx) => idx + 1 },
        {
            key: "assignedPerson",
            header: "assignedPerson",
        },
        {
            key: "actions",
            header: "Action",
            render: (row) => (
                <Button
                    size="sm"
                    className="bg-blue-500 text-white"
                // onClick={() => detailsRow(row.id)}
                >
                    Assign
                </Button>
            ),
        },
        {
            key: "subGroup",
            header: "subGroup",
        },
        {
            key: "itemName",
            header: "itemName",
        },
        {
            key: "brandName",
            header: "brandName",
        },
        {
            key: "model",
            header: "model",
        },
        {
            key: "country",
            header: "country",
        },
        {
            key: "unitPrice",
            header: "unitPrice",
        },
        {
            key: "requiredQuantity",
            header: "requiredQuantity",
        },
        {
            key: "approveQuantity",
            header: "approveQuantity",
            render: (row, idx) => (
                <SimpleInputBox
                    type="number"
                    value={row.approveQuantity}
                    onChange={(val) =>
                        // needs to be updated using handleChangeRows
                        handleChangeRows(idx, "approveQuantity", val)
                    }
                    className="w-[100px]"
                />
            ),
        },
        {
            key: "stockQuantity",
            header: "stockQuantity",
        },
        {
            key: "remarks",
            header: "remarks",
        },
        {
            key: "so",
            header: "so",
            render: (row) => (
                <Button variant="filled" size="sm">S.O</Button>
            ),
        },
        {
            key: "currency",
            header: "currency",
        },
        {
            key: "approximateRate",
            header: "approximateRate",
        },
        {
            key: "unit",
            header: "unit",
        },
        {
            key: "supplier",
            header: "supplier",
        },
        {
            key: "userRemarks",
            header: "userRemarks",
        },
        {
            key: "actions",
            header: "Action",
            render: (row) => (
                <div className="flex gap-3">
                    <Button
                        size="sm"
                        className="bg-blue-500 text-white"
                    // onClick={() => detailsRow(row.id)}
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                    <Button
                        size="sm"
                        className="bg-blue-500 text-white"
                        onClick={() => callPurchaseHistory()}
                    >
                        Purchase History
                    </Button>
                </div>

            ),
        },
    ];

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
                <div className="grid grid-cols-1">
                    <div className="w-full">
                        <div className="grid grid-cols-4 gap-3">
                            <FormField
                                label="Requisition No"
                                id="reqNo"
                                variant="block"
                                error={validationErrors?.reqNo}
                            >
                                <SimpleInputBox
                                    value={purchaseRequisitionDetails.reqNo}
                                    onChange={(val) => handleChange("reqNo", val)}
                                    id="reqNo"
                                    type="text"
                                    placeholder="Req No"
                                    className="w-full"
                                />
                            </FormField>
                            <FormField
                                label="Proposed Date"
                                id="proposedDate"
                                variant="block"
                                error={validationErrors?.proposedDate}
                            >
                                <SimpleInputBox
                                    value={purchaseRequisitionDetails.proposedDate}
                                    onChange={(val) => handleChange("proposedDate", val)}
                                    id="proposedDate"
                                    type="text"
                                    placeholder="Proposed Date"
                                    className="w-full"
                                />
                            </FormField>
                            <FormField
                                label="Proposed By"
                                id="proposedBy"
                                variant="block"
                                error={validationErrors?.proposedBy}
                            >
                                <SimpleInputBox
                                    value={purchaseRequisitionDetails.proposedBy}
                                    onChange={(val) => handleChange("proposedBy", val)}
                                    id="proposedBy"
                                    type="text"
                                    placeholder="Proposed By"
                                    className="w-full"
                                />
                            </FormField>
                            <FormField
                                label="Requisition Type"
                                id="requisitionType"
                                variant="block"
                                error={validationErrors?.requisitionType}
                            >
                                <SimpleInputBox
                                    value={purchaseRequisitionDetails.requisitionType}
                                    onChange={(val) => handleChange("requisitionType", val)}
                                    id="requisitionType"
                                    type="text"
                                    placeholder="Requisition Type"
                                    className="w-full"
                                />
                            </FormField>
                            <FormField
                                label="Field Of Use"
                                id="fieldOfUse"
                                variant="block"
                                error={validationErrors?.fieldOfUse}
                            >
                                <SimpleInputBox
                                    value={purchaseRequisitionDetails.fieldOfUse}
                                    onChange={(val) => handleChange("fieldOfUse", val)}
                                    id="fieldOfUse"
                                    type="text"
                                    placeholder="Field of use"
                                    className="w-full"
                                />
                            </FormField>
                            <div className="flex gap-4 mt-5">
                                <FormField
                                    label=""
                                    id="approve"
                                    variant="block"
                                    error={validationErrors?.approve}
                                >
                                    <Checkbox
                                        label="Approve All"
                                        size="small"
                                        checked={purchaseRequisitionDetails.approve}
                                        onChange={(val) => handleCheckboxChange("approve", val)}
                                        color="primary"
                                        shape="square"
                                    />
                                </FormField>
                                <FormField
                                    label=""
                                    id="deny"
                                    variant="block"
                                    error={validationErrors?.deny}
                                >
                                    <Checkbox
                                        label="Deny All"
                                        size="small"
                                        checked={purchaseRequisitionDetails.deny}
                                        onChange={(val) => handleCheckboxChange("deny", val)}
                                        color="primary"
                                        shape="square"
                                    />
                                </FormField>
                            </div>
                        </div>
                        <div className="w-full">
                            <CustomDataTable
                                data={TableRows}
                                columns={TableColumns}
                            />
                        </div>
                        <Modal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            title="Purchase Requisition Status"
                            widthClass="max-w-7xl"
                            heightClass="max-h-[80vh]"
                        >
                            <PurchaseRequisitionHistoryForm />
                        </Modal>
                    </div>
                </div>
            </Panel >
        </>
    );
};

export default PurchaseRequisitionDetailsForm;
