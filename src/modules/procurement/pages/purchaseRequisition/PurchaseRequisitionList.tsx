import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import Modal from "@/components/feedback-interaction/Modal";
import Button from "@/components/form/Button";
import PageHeader from "@/components/layout/PageHeader";
import Panel from "@/components/layout/Panel";
import { useTheme } from "@/hooks/useTheme";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { faBackward, faSave, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { clearPurchaseRequisitionMessages, clearPurchaseRequisitionState, getPurchaseRequisition, setPurchaseRequisitionValidationErrors, updatePurchaseRequisitionField } from "../../reduxSlices/purchaseRequisition.Slice";
import PurchaseRequisitionForm from "../purchaseRequisitionStatus/PurchaseRequisitionStatusForm";
import { IPurchaseRequisition, PurchaseRequisitionValidationErrors, purchaseRequisitonSchema } from './purchaseRequisition.interface';



const PurchaseRequisitionList = () => {

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { purchaseRequisitons, error, message, validationErrors } = useSelector((state: RootState) => state.purchaseRequisition);
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
        const parseResult = purchaseRequisitonSchema.safeParse(purchaseRequisitons);
        if (!parseResult.success) {
            const errors: PurchaseRequisitionValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof IPurchaseRequisition;
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

    const handleChange = (key: keyof IPurchaseRequisition, value: string, displayValue?: string) => {
        dispatch(
            updatePurchaseRequisitionField({
                key: key,
                value: value,
            })
        );
    };

    const detailsRow = (id: number) => {
        // TBD
    };

    const rows = useSelector(
        (state: RootState) => state.purchaseRequisition.purchaseRequisitons
    );


    // table
    const columns: Column<IPurchaseRequisition>[] = [
        { key: "id", header: "SL", render: (_, idx) => idx + 1 },
        {
            key: "prNo",
            header: "prNo",
        },
        {
            key: "factory",
            header: "factory",
        },
        {
            key: "proposedBy",
            header: "proposedBy",
        },
        {
            key: "requisitionType",
            header: "requisitionType",
        },
        {
            key: "actions",
            header: "Action",
            render: (row) => (
                <Link to={`/webapp/pnPurchase/purchase-requisition-details/${row.id}`}>
                    <Button
                        size="sm"
                        className="bg-green-500 text-white"
                    >
                        Details
                    </Button>
                </Link>
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
                <div className="">
                    <div className="">
                        <Button
                            variant="filled"
                            size="sm"
                            className="mb-2"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <FontAwesomeIcon icon={faSearch} />
                            Search Previous
                        </Button>
                        <Modal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            title="Purchase Requisition Status"
                            widthClass="max-w-7xl"
                            heightClass="max-h-[80vh]"
                        >
                            <PurchaseRequisitionForm />
                        </Modal>
                    </div>
                    <CustomDataTable
                        data={rows}
                        columns={columns}
                    />
                </div>
            </Panel >
        </>
    );
};

export default PurchaseRequisitionList;
