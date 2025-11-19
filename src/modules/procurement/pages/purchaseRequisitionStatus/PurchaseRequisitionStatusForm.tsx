import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import Modal from "@/components/feedback-interaction/Modal";
import Button from "@/components/form/Button";
import { FormField } from "@/components/form/FormField";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import PageHeader from "@/components/layout/PageHeader";
import Panel from "@/components/layout/Panel";
import { useTheme } from "@/hooks/useTheme";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearPurchaseRequisitionMessages, clearPurchaseRequisitionState, getPurchaseRequisition, setPurchaseRequisitionValidationErrors } from "../../reduxSlices/purchaseRequisition.Slice";
import { updatePurchaseRequisitionStatusField } from "../../reduxSlices/purchaseRequisitionStatus.Slice";
import PurchaseRequisitionForm from "../purchaseRequisitionStatus/PurchaseRequisitionStatusForm";
import { IPurchaseRequisitionStatus, PurchaseRequisitionStatusValidationErrors, purchaseRequisitonSchema } from './purchaseRequisitionStatus.interface';



const PurchaseRequisitionStatusForm = () => {

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { purchaseRequisitionStatus, error, message, validationErrors } = useSelector((state: RootState) => state.purchaseRequisitionStatus);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { rowsPerPage, layout, company } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);
    
    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearPurchaseRequisitionMessages());
        }

    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearPurchaseRequisitionMessages());
        }

    }, [message]);

    useEffect(() => {
        document.title = "PurchaseRequisition Setup";
        console.log("PurchaseRequisitionForm mounted");
        setPageTitle("Purchase Requisition Setup");
        // dispatch(fetchAllProductionType());

        return () => {
            document.title = "";
            dispatch(clearPurchaseRequisitionState());

        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            document.title = "PurchaseRequisition Edit";
            setPageTitle("Purchase Requisition Edit");
            setIsUpdateMode(true);
            dispatch(getPurchaseRequisition(Number(id)))
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
        const parseResult = purchaseRequisitonSchema.safeParse(purchaseRequisitionStatus);

        if (!parseResult.success) {
            const errors: PurchaseRequisitionStatusValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof IPurchaseRequisitionStatus;
                errors[key] = issue.message;
            }
            dispatch(setPurchaseRequisitionValidationErrors(errors));
            return;
        }
        // if (isUpdateMode) {
        //     dispatch(editPurchaseRequisition({ id: Number(id), payload: purchaseRequisitons }));
        // } else {
        //     dispatch(addPurchaseRequisition(purchaseRequisitons));
        // }
    };


    const handleChange = (key: keyof IPurchaseRequisitionStatus, value: string, displayValue?: string) => {
        dispatch(
            updatePurchaseRequisitionStatusField({
                key: key,
                value: value,
            })
        );
    };

    const detailsRow = (id: number) => {
        // TBD
    };

    // left table
    const LeftTablerows = useSelector(
        (state: RootState) => state.purchaseRequisitionStatus.purchaseRequisitonStatusList
    );
    const LeftTablecolumns: Column<IPurchaseRequisitionStatus>[] = [
        { key: "id", header: "SL", render: (_, idx) => idx + 1 },
        {
            key: "reqNo",
            header: "reqNo",
            render: (row) => (
                <SimpleInputBox
                    type="text"
                    value={row.reqNo}
                    onChange={(val) =>
                        handleChange("reqNo", val)
                    }
                />
            ),
        },
        {
            key: "status",
            header: "status",
            render: (row) => (
                <SimpleInputBox
                    type="text"
                    value={row.status}
                    onChange={(val) =>
                        handleChange("status", val)
                    }
                />
            ),
        },
        {
            key: "actions",
            header: "Action",
            render: (row) => (
                <Button
                    size="sm"
                    className="bg-green-500 text-white"
                    onClick={() => detailsRow(row.id)}
                >
                    Details
                </Button>
            ),
        },
    ];

    // right table
    const RightTablerows = useSelector(
        (state: RootState) => state.purchaseRequisitionStatus.purchaseRequisitonStatusList
    );
    const RightTablecolumns: Column<IPurchaseRequisitionStatus>[] = [
        { key: "id", header: "SL", render: (_, idx) => idx + 1 },
        {
            key: "materialName",
            header: "materialName",
            render: (row) => (
                <SimpleInputBox
                    type="text"
                    value={row.materialName}
                    onChange={(val) =>
                        handleChange("materialName", val)
                    }
                />
            ),
        },
        {
            key: "approveQuantity",
            header: "approveQuantity",
            render: (row) => (
                <SimpleInputBox
                    type="text"
                    value={row.approveQuantity}
                    onChange={(val) =>
                        handleChange("approveQuantity", val)
                    }
                />
            ),
        },
        {
            key: "approxRate",
            header: "approxRate",
            render: (row) => (
                <SimpleInputBox
                    type="text"
                    value={row.approxRate}
                    onChange={(val) =>
                        handleChange("approxRate", val)
                    }
                />
            ),
        },
        {
            key: "unit",
            header: "unit",
            render: (row) => (
                <SimpleInputBox
                    type="text"
                    value={row.unit}
                    onChange={(val) =>
                        handleChange("unit", val)
                    }
                />
            ),
        },
        {
            key: "assignedTo",
            header: "assignedTo",
            render: (row) => (
                <SimpleInputBox
                    type="text"
                    value={row.assignedTo}
                    onChange={(val) =>
                        handleChange("assignedTo", val)
                    }
                />
            ),
        },
        {
            key: "approvePrice",
            header: "approvePrice",
            render: (row) => (
                <SimpleInputBox
                    type="text"
                    value={row.approvePrice}
                    onChange={(val) =>
                        handleChange("approvePrice", val)
                    }
                />
            ),
        },
        {
            key: "currency",
            header: "currency",
            render: (row) => (
                <SimpleInputBox
                    type="text"
                    value={row.currency}
                    onChange={(val) =>
                        handleChange("currency", val)
                    }
                />
            ),
        },
        {
            key: "supplier",
            header: "supplier",
            render: (row) => (
                <SimpleInputBox
                    type="text"
                    value={row.supplier}
                    onChange={(val) =>
                        handleChange("supplier", val)
                    }
                />
            ),
        },
        {
            key: "brandName",
            header: "brandName",
            render: (row) => (
                <SimpleInputBox
                    type="text"
                    value={row.brandName}
                    onChange={(val) =>
                        handleChange("brandName", val)
                    }
                />
            ),
        },
        {
            key: "country",
            header: "country",
            render: (row) => (
                <SimpleInputBox
                    type="text"
                    value={row.country}
                    onChange={(val) =>
                        handleChange("country", val)
                    }
                />
            ),
        },
        {
            key: "actions",
            header: "Action",
            render: (row) => (
                <Button
                    size="sm"
                    className="bg-green-500 text-white"
                    onClick={() => detailsRow(row.id)}
                >
                    Details
                </Button>
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
            >
                <div className="">
                    <div className="">
                        <Modal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            title="Purchase Requisition Status"
                            widthClass="max-w-lg"
                            heightClass="max-h-[80vh]"
                        >
                            <PurchaseRequisitionForm />
                        </Modal>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <div className="flex justify-between">
                                    <div>
                                        <FormField
                                            label=""
                                            id="dateRange1"
                                            variant="block"
                                            error={validationErrors?.dateRange1}
                                        >
                                            <SimpleInputBox
                                                value={purchaseRequisitionStatus.dateRange1}
                                                onChange={(val) => handleChange("dateRange1", val)}
                                                id="dateRange1"
                                                type="text"
                                                placeholder="DD/MM/YYYY"
                                                className="w-full"
                                            />
                                        </FormField>
                                    </div>
                                    <div>
                                        <FormField
                                            label=""
                                            id="dateRange2"
                                            variant="block"
                                            error={validationErrors?.dateRange2}
                                        >
                                            <SimpleInputBox
                                                value={purchaseRequisitionStatus.dateRange2}
                                                onChange={(val) => handleChange("dateRange2", val)}
                                                id="dateRange2"
                                                type="text"
                                                placeholder="DD/MM/YYYY"
                                                className="w-full"
                                            />
                                        </FormField>
                                    </div>
                                </div>
                                <div>
                                    <FormField
                                        label=""
                                        id="reqNo"
                                        variant="block"
                                        error={validationErrors?.reqNo}
                                    >
                                        <SimpleInputBox
                                            value={purchaseRequisitionStatus.reqNo}
                                            onChange={(val) => handleChange("reqNo", val)}
                                            id="reqNo"
                                            type="text"
                                            placeholder="Req No"
                                            className="w-full"
                                        />
                                    </FormField>
                                    <CustomDataTable
                                        data={LeftTablerows}
                                        columns={LeftTablecolumns}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <div>
                                        <FormField
                                            label=""
                                            id="reqNo"
                                            variant="block"
                                            error={validationErrors?.reqNo}
                                        >
                                            <SimpleInputBox
                                                value={purchaseRequisitionStatus.reqNo}
                                                onChange={(val) => handleChange("reqNo", val)}
                                                id="reqNo"
                                                type="text"
                                                placeholder="Req No."
                                                className="w-full"
                                            />
                                        </FormField>
                                    </div>
                                    <div>
                                        <FormField
                                            label=""
                                            id="status"
                                            variant="block"
                                            error={validationErrors?.status}
                                        >
                                            <SimpleInputBox
                                                value={purchaseRequisitionStatus.status}
                                                onChange={(val) => handleChange("dateRange2", val)}
                                                id="status"
                                                type="text"
                                                placeholder="Status"
                                                className="w-full"
                                            />
                                        </FormField>
                                    </div>
                                </div>
                                <CustomDataTable
                                    data={RightTablerows}
                                    columns={RightTablecolumns}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Panel >
        </>
    );
};

export default PurchaseRequisitionStatusForm;
