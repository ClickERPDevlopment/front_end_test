// src/modules/inventory/poRelease/PoReleaseApprovalDetails.tsx

import { getRoutes } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import {
    Column,
    CustomDataTable,
} from "@/components/data-display/CustomDataTable";
import ConfirmDialog, {
    IConfirmDialog,
} from "@/components/feedback-interaction/ConfirmDialog";
import Modal from "@/components/feedback-interaction/Modal";
import Button from "@/components/form/Button";
import { FormField } from "@/components/form/FormField";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import { ActionButtons, ActionType } from "@/components/layout/ActionButtons";
import { useDashboardActions } from "@/layouts/DashboardLayout";
import { useHotToast } from "@/utils/hotToast.util";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    approvePoRelease,
    clearPoReleaseMessages,
    clearPoReleaseState,
    getPoReleaseDetails,
    setPoReleaseValidationErrors,
    updatePoDetailField,
} from "../../reduxSlices/poRelease.slice";
import {
    IPoRelease,
    IPoReleaseDetails,
    PoReleaseInsertSchema,
    PoReleaseUpdateSchema,
    PoReleaseValidationErrors,
} from "./poRelease.interface";
import PurchaseHistory from "./PurchaseHistory";

export default function PoReleaseApprovalDetails() {
    // --- ACTION BUTTON IN TOP NAVBAR ---
    const { setActions } = useDashboardActions();
    const [isEditMode, setIsEditMode] = useState(false);
    // ------------------------------------
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { showHotError, showHotSuccess } = useHotToast();
    const dispatch: AppDispatch = useDispatch();

    const crystalReportRoutes = getRoutes("crystalReport");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    const {
        info,
        detailsInfo,
        loading,
        error,
        message,
        validationErrors,
        detailsList,
    } = useSelector((state: RootState) => state.poRelease);

    const [modalConfirmation, setModalConfirmation] = useState<IConfirmDialog>({
        open: false,
        title: "Confirm",
        message: "Are you sure?",
    });

    // --- Action Button Handlers ---
    const handleAction = useCallback(
        (action: ActionType) => {
            switch (action) {
                case "approve":
                    setModalConfirmation({
                        open: true,
                        title: "Approve PO Release",
                        message: "Are you sure you want to approve this Purchase Order?",
                    });
                    break;
                case "preview":
                    let url = `${crystalReportRoutes.PURCHASE_ORDER_REPORT}${id}`;
                    window.open(url, "_blank");
                    break;
            }
        },
        [navigate]
    );

    useEffect(() => {
        const firstItem = detailsList?.[0];

        // Only run after data is loaded
        if (!firstItem) return;

        // Approve calculation
        const isApproveButtonShow = ((firstItem?.myPosition || 0) - (firstItem?.maxApprovedPosition || 0)) === 1
        // Set actions
        setActions(
            <ActionButtons
                onAction={handleAction}
                isEditMode={isEditMode}
                show={{ approve: isApproveButtonShow, preview: true }}
            />
        );

        // Cleanup
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction, detailsList?.[0]]);


    // --- Clear On Render ---
    useEffect(() => {
        return () => {
            dispatch(clearPoReleaseState());
        };
    }, [dispatch]);

    // --- Fetch Data ---
    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            dispatch(getPoReleaseDetails(Number(id)));
        }
    }, [id, dispatch]);

    // --- Validation ---
    const formValidation = (data: IPoRelease) => {
        const schema = isEditMode ? PoReleaseUpdateSchema : PoReleaseInsertSchema;
        const parseResult = schema.safeParse(data);

        if (!parseResult.success) {
            const errors: PoReleaseValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof IPoRelease;
                errors[key] = issue.message;
            }
            dispatch(setPoReleaseValidationErrors(errors));
            return false;
        }

        return true;
    };

    // --- Handling Messages ---
    useEffect(() => {
        if (message) {
            showHotSuccess(message);
            dispatch(clearPoReleaseMessages());
        }
    }, [message, dispatch, showHotSuccess]);

    useEffect(() => {
        if (error) {
            showHotError(error, {
                bgColor: "#EF4444",
                textColor: "#ffffff",
                width: "300px",
            });
            dispatch(clearPoReleaseMessages());
        }
    }, [error, dispatch, showHotError]);

    // --- Approve Confirmation ---
    const handleConfirm = () => {
        if (!detailsList) return;
        dispatch(approvePoRelease(detailsList));
        setModalConfirmation((prev) => ({ ...prev, open: false }));
    };

    const handleCancel = () => {
        setModalConfirmation((prev) => ({ ...prev, open: false }));
    };

    // --- Table Columns ---
    const columns: Column<IPoReleaseDetails>[] = [
        { key: "itemName", header: "Material" },
        { key: "brandName", header: "Brand" },
        { key: "modelName", header: "Model" },
        { key: "originName", header: "Origin" },
        { key: "workOrderQty", header: "PO Qty" },
        { key: "uomName", header: "UOM" },
        { key: "uomPrice", header: "Unit Price" },
        {
            key: "totalPrice",
            header: "Total Price",
            render: (row) => {
                const total = (row.workOrderQty || 0) * (row.uomPrice || 0);
                return `${row.currencySymbol} ${total.toFixed(2)}`;
            },
        },
        {
            key: "approvedQty",
            header: "Aprv Qty",
            paddingNone: true,
            render: (row, index) => (
                <SimpleInputBox
                    value={row.approvedQty}
                    className="rounded-none"
                    onChange={(val) =>
                        dispatch(
                            updatePoDetailField({
                                index,
                                key: "approvedQty",
                                value: Number(val),
                            })
                        )
                    }
                    type="number"
                />
            ),
        },
        {
            key: "approvedUnitPrice",
            header: "Aprv Unit Price",
            paddingNone: true,
            render: (row, index) => (
                <SimpleInputBox
                    className="rounded-none"
                    value={row.approvedUnitPrice || 0}
                    onChange={(val) =>
                        dispatch(
                            updatePoDetailField({
                                index,
                                key: "approvedUnitPrice",
                                value: Number(val),
                            })
                        )
                    }
                    type="number"
                />
            ),
        },
        { key: "approvedTotalPrice", header: "Aprv Total Price" },
        { key: "remarks", header: "Remarks" },
        {
            key: "btnHistoryAction",
            header: "Action",
            width: "w-[10px]",
            align: "center",
            render: (_item: IPoReleaseDetails) => {

                return (
                    <Button
                        variant="outlined"
                        size="sm"
                        onClick={() => {
                            setSelectedItemId(_item.itemId);
                            setIsModalOpen(true);
                        }}
                        className="
              flex items-center gap-2
              text-blue-600 border border-blue-600
              rounded-lg px-3 
              transition-colors duration-200
              hover:bg-blue-600 hover:text-white
            "
                    >
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                        Purchase History
                    </Button>

                );
            },
        },
        {
            key: "btnRefAction",
            header: "REQUISITION REF",
            render: (row) => {
                const reqNumbers = row.reqNumber ? row.reqNumber.split(",") : [];
                const reqIds = row.reqIds ? row.reqIds.split(",") : [];

                return (
                    <div className="flex flex-wrap gap-1">
                        {reqNumbers.map((num: string, index: number) => {
                            const id = reqIds[index]?.trim();
                            const number = num.trim();

                            // If both id and number exist, make it a link
                            if (id && number) {
                                return (
                                    <React.Fragment key={index}>
                                        <a
                                            href={`${crystalReportRoutes.PROCUREMENT_PURCHASE_REQUISITION_REPORT}${id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline hover:text-blue-800"
                                        >
                                            {number}
                                        </a>
                                        {index < reqNumbers.length - 1 && <span>, </span>
                                        }
                                    </React.Fragment>
                                );
                            }
                            return (
                                <React.Fragment key={index}>
                                    <span>{number}</span>
                                    {index < reqNumbers.length - 1 && <span>, </span>}
                                </React.Fragment>
                            );
                        })}
                    </div>
                );
            },
        },

    ];

    if (loading) {
        return <div className="p-4 text-gray-500">Loading PO details...</div>;
    }

    // --- JSX ---
    return (
        <div>
            {detailsList.length > 0 && (
                <div className=" px-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2">
                    <div className="flex flex-col">
                        <FormField
                            label="PO No"
                            id="poNo"
                            variant="inline"
                            required
                            labelFontSize="text-sm"
                        >
                            <SimpleInputBox
                                disabled
                                value={detailsList[0].purchaseOrderNo || ""}
                                type="text"
                            />
                        </FormField>
                    </div>
                    <div className="flex flex-col">
                        <FormField
                            label="Supplier Name"
                            id="s"
                            variant="inline"
                            required
                            labelFontSize="text-sm"
                        >
                            <SimpleInputBox
                                disabled
                                value={detailsList[0].supplierName || ""}
                                type="text"
                            />
                        </FormField>
                    </div>
                </div>
            )}

            <div className="px-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                <FormField id="table_error" error={validationErrors?.details}>
                    <div></div>
                </FormField>
            </div>

            {/* --- Details Table Section --- */}
            <div className="px-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                {detailsList && (
                    <CustomDataTable
                        columns={columns}
                        data={detailsList}
                        loading={loading}
                    />
                )}
            </div>

            {/* History Modal */}
            <ConfirmDialog

                open={modalConfirmation.open}
                title={modalConfirmation.title}
                message={modalConfirmation.message}
                cancelText="Close"
                onConfirm={handleConfirm}
                onCancel={handleCancel}

            />
            <Modal
                title="Purchase History"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                widthClass="max-w-full"
                heightClass="h-auto"
            >
                <PurchaseHistory itemId={selectedItemId || 0} />
            </Modal>
        </div>

    );
}
