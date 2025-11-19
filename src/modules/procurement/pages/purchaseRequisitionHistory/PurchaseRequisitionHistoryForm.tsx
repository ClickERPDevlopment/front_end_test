import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import Button from "@/components/form/Button";
import { FormField } from "@/components/form/FormField";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import PageHeader from "@/components/layout/PageHeader";
import Panel from "@/components/layout/Panel";
import { useTheme } from "@/hooks/useTheme";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { faBackward, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearPurchaseRequisitionHistoryMessages, clearPurchaseRequisitionHistoryState, getPurchaseRequisitionHistory, setPurchaseRequisitionHistoryValidationErrors, updatePurchaseRequisitionHistoryField } from "../../reduxSlices/purchaseRequisitionHistory.Slice";
import { IPurchaseRequisitionHistory, purchaseRequisitionHistorySchema, PurchaseRequisitionHistoryValidationErrors } from "./purchaseRequisitionHistory.interface";

const PurchaseRequisitionHistoryForm = () => {

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { purchaseRequisitionHistory, error, message, validationErrors } = useSelector((state: RootState) => state.purchaseRequisitionHistory);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>("");


 const { rowsPerPage, layout, company } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);
    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearPurchaseRequisitionHistoryMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearPurchaseRequisitionHistoryMessages());
        }
    }, [message]);

    useEffect(() => {
        document.title = "PurchaseRequisition Setup";
        console.log("PurchaseRequisitionForm mounted");
        setPageTitle("Purchase History");
        // dispatch(fetchAllProductionType());
        return () => {
            document.title = "";
            dispatch(clearPurchaseRequisitionHistoryState());

        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            document.title = "Purchase History Edit";
            setPageTitle("Purchase History");
            setIsUpdateMode(true);
            dispatch(getPurchaseRequisitionHistory(Number(id)))
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
        const parseResult = purchaseRequisitionHistorySchema.safeParse(purchaseRequisitionHistory);

        if (!parseResult.success) {
            const errors: PurchaseRequisitionHistoryValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof IPurchaseRequisitionHistory;
                errors[key] = issue.message;
            }
            dispatch(setPurchaseRequisitionHistoryValidationErrors(errors));
            return;
        }
        // if (isUpdateMode) {
        //     dispatch(editPurchaseRequisition({ id: Number(id), payload: purchaseRequisitons }));
        // } else {
        //     dispatch(addPurchaseRequisition(purchaseRequisitons));
        // }
    };

    const handleChange = (key: keyof IPurchaseRequisitionHistory, value: string, displayValue?: string) => {
        dispatch(
            updatePurchaseRequisitionHistoryField({
                key: key,
                value: value,
            })
        );
    };

    // for updating a single row from table
    const handleChangeRows = (id: number, key: keyof IPurchaseRequisitionHistory, value: string) => {
        dispatch(updatePurchaseRequisitionHistoryField({ key, value }));
    };



    // const handleCheckboxChange = (key: keyof IPurchaseRequisitionHistory, value: boolean) => {
    //     dispatch(
    //         updatePurchaseRequisitionHistoryField({
    //             key: key,
    //             value: value,
    //         })
    //     );
    // };


    // left table
    const LeftTableRows = useSelector(
        (state: RootState) => state.purchaseRequisitionHistory.purchaseRequisitonHistoryList
    );
    const LeftTableColumns: Column<IPurchaseRequisitionHistory>[] = [
        { key: "id", header: "SL", render: (_, idx) => idx + 1 },
        {
            key: "brand",
            header: "brand",
        },
        {
            key: "origin",
            header: "origin",
        },
        {
            key: "model",
            header: "model",
        },
        {
            key: "stock",
            header: "stock",
        },
    ];


    // right table
    const RightTableRows = useSelector(
        (state: RootState) => state.purchaseRequisitionHistory.purchaseRequisitonHistoryList
    );
    const RightTableColumns: Column<IPurchaseRequisitionHistory>[] = [
        { key: "id", header: "SL", render: (_, idx) => idx + 1 },
        {
            key: "purchaseDate",
            header: "purchaseDate",
        },
        {
            key: "poNo",
            header: "poNo",
        },
        {
            key: "purchaseQuantity",
            header: "purchaseQuantity",
        },
        {
            key: "supplier",
            header: "supplier",
        },
        {
            key: "unitPrice",
            header: "unitPrice",
        },
        {
            key: "origin",
            header: "origin",
        },
        {
            key: "model",
            header: "model",

        },
        {
            key: "brand",
            header: "brand",
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
                    <div>
                        <CustomDataTable
                            data={LeftTableRows}
                            columns={LeftTableColumns}
                        />
                    </div>
                    <div className="w-full">
                        <div className="flex gap-2">
                            <>
                                <FormField
                                    label="From Date"
                                    id="fromDate"
                                    variant="block"
                                    error={validationErrors?.fromDate}
                                >
                                    <SimpleInputBox
                                        value={purchaseRequisitionHistory.fromDate}
                                        onChange={(val) => handleChange("fromDate", val)}
                                        id="fromDate"
                                        type="text"
                                        placeholder="From Date"
                                        className="w-full"
                                    />
                                </FormField>

                                <FormField
                                    label="To Date"
                                    id="toDate"
                                    variant="block"
                                    error={validationErrors?.toDate}
                                >
                                    <SimpleInputBox
                                        value={purchaseRequisitionHistory.toDate}
                                        onChange={(val) => handleChange("toDate", val)}
                                        id="toDate"
                                        type="text"
                                        placeholder="To Date"
                                        className="w-full"
                                    />
                                </FormField>
                                <Button
                                    size="sm"
                                    className="bg-blue-500 text-white h-8 mt-5"
                                // onClick={() => detailsRow(row.id)}
                                >
                                    <FontAwesomeIcon icon={faSearch} />
                                </Button>
                            </>
                        </div>
                        <div>
                            <CustomDataTable
                                data={RightTableRows}
                                columns={RightTableColumns}
                            />
                        </div>
                    </div>
                </div>
            </Panel >
        </>
    );
};

export default PurchaseRequisitionHistoryForm;
