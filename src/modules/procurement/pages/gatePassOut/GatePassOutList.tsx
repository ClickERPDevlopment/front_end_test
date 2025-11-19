import { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { PaginationObject } from '../../../../types/global';
import { getRoutes, RouteLayout } from "@/app/constants";
import { useTheme } from "@/hooks/useTheme";
import { useCallback, useEffect, useState } from "react";
import { FormField } from "@/components/form/FormField";
import SelectDropdown from "@/components/form/SelectDropdown";
import CustomDatePicker from "@/components/form/CustomDatePicker";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import { clearGatePassMessages, getPagedGatePassOut, updateGatePassOutField } from "../../reduxSlices/gatePassSlice";
import { IGatePassOut } from "../gatePass/gatePass.interface";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import { useMemo } from 'react';
import Button from "@/components/form/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FeatherIcon from '@/components/FeatherIcon';
import { PlusSquare } from "lucide-react";
import { useHotToast } from "@/utils/hotToast.util";
import ConfirmDialog, { IConfirmDialog } from "@/components/feedback-interaction/ConfirmDialog";
import Modal from "@/components/feedback-interaction/Modal";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";


export default function GatePassOut() {

    const dispatch: AppDispatch = useDispatch();
    const { gatePass, gatePassOutDetails, gatePassOutList, paginationObject, error, message, loading } = useSelector((state: RootState) => state.gatePass);
    const { companies } = useSelector((state: RootState) => state.company);
    const { rowsPerPage, layout } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);

    const [companyId, setCompany] = useState<string>("");
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [gatePassNo, setGatePassNo] = useState("");
    const [status, setStatus] = useState("");
    const { showHotError, showHotSuccess } = useHotToast();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const statusTypeOptions = [
        { id: '0', name: 'NOT OUT' },
        { id: '1', name: 'OUT' },
        { id: '2', name: 'ALL' },
    ]

    useEffect(() => {
        // Only set initial values once (when component first mounts)
        const today = new Date();
        const previousDay = new Date(today);
        previousDay.setDate(today.getDate() - 1);
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1);

        setFromDate(previousDay);
        setToDate(nextDay);
    }, []);

    // Fetch initial list
    useEffect(() => {
        dispatch(getPagedGatePassOut({
            page: 1,
            perPage: Number(rowsPerPage),
            searchCriteria: {
                FactoryId: companyId ? Number(companyId) : undefined,
                FromDate: fromDate ? fromDate.toISOString().split("T")[0] : undefined,
                ToDate: toDate ? toDate.toISOString().split("T")[0] : undefined,
                gatePassNo: gatePassNo || undefined,
                status: status || undefined,
            },
        }));
    }, [dispatch, rowsPerPage, fromDate, toDate, gatePassNo, companyId, status]);

    // Handle toast notifications
    useEffect(() => {
        if (error) {
            showHotError("Failed to load data", { bgColor: "#FF0000", textColor: "#ffffff", width: "250px", icon: "⚠️", position: "bottom-right" });
            dispatch(clearGatePassMessages());
        }
    }, [error, dispatch]);

    // Pagination handlers
    const onPageChange = useCallback((page: number) => {
        dispatch(getPagedGatePassOut({ page, perPage: Number(rowsPerPage) }));
    }, [dispatch, rowsPerPage]);

    const onPerPageChange = useCallback((perPage: number) => {
        dispatch(getPagedGatePassOut({ page: 1, perPage }));
    }, [dispatch]);

    // --- Approve Confirmation ---
    const handleConfirm = () => {
        // dispatch(approvePoRelease(detailsList));
        setModalConfirmation((prev) => ({ ...prev, open: false }));
    };

    const handleCancel = () => {
        setModalConfirmation((prev) => ({ ...prev, open: false }));
    };

    const [modalConfirmation, setModalConfirmation] = useState<IConfirmDialog>({
        open: false,
        title: "Confirm",
        message: "Are you sure?",
    });


    const detailsColumns: Column<IGatePassOut>[] = useMemo(
        () => [
            {
                key: "gatePassNo",
                header: "Gate Pass No",
                align: "left",
                width: "w-[150px]",
            },
            {
                key: "report",
                header: "Report",
                align: "left",
                width: "w-[150px]",
                render: (_item: IGatePassOut) => (
                    <Button
                        href={`${webRoutes.GATE_PASS_SAVE}/${_item.id}`}
                        variant="flat"
                        size="sm"
                        className="p-1 text-green-400 bg-transparent"
                    >
                        <FontAwesomeIcon icon={faFilePdf} />
                    </Button>
                ),
            },
            {
                key: "passDate",
                header: "Pass Date",
                align: "left",
                width: "w-[150px]",
            },
            {
                key: "actions",
                header: "Action",
                align: "left",
                width: "w-[150px]",
                render: (_item: IGatePassOut) => {
                    const isOut = _item.status === 1;

                    return (
                        <Button
                            variant="flat"
                            size="sm"
                            disabled={isOut} // Disable if OUT
                            className={`p-1 rounded-md text-white transition ${isOut
                                ? "bg-green-500 cursor-not-allowed opacity-70"
                                : "bg-amber-400 hover:bg-amber-500"
                                }`}
                            onClick={() => {
                                if (!isOut) {
                                    // Show confirmation modal
                                    setModalConfirmation({
                                        open: true,
                                        title: "Mark Gate Pass as Out",
                                        message: `Are you sure you want to mark Gate Pass No. ${_item.gatePassNo} as OUT?`,
                                    });
                                }
                            }}
                        >
                            {isOut ? "Done" : "Mark as Out"}
                        </Button>
                    );
                },
            }

        ],
        []
    );

    return (
        <div className="p-2 bg-white rounded-md shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                {/* COMPANY FILTER */}
                <FormField
                    label="Company"
                    id="release"
                    variant="inline"
                >
                    <SelectDropdown
                        options={companies}
                        value={companyId?.toString() || ""}
                        isSameKeyValue={false}
                        labelKey="name"
                        valueKey="companyId"
                        onChange={(val) => setCompany(val.toString())}
                        className="text-sm w-full"
                    />
                </FormField>

                {/* FROM DATE FILTER */}
                <FormField
                    label="From Date"
                    id="fromDate"
                    variant="inline"
                >
                    <CustomDatePicker
                        selected={fromDate}
                        onChange={setFromDate}
                    />
                </FormField>

                {/* TO DATE FILTER */}
                <FormField
                    label="To Date"
                    id="toDate"
                    variant="inline"
                >
                    <CustomDatePicker
                        selected={toDate}
                        onChange={setToDate}
                    />
                </FormField>

                {/* GATE PASS NO FILTER */}
                <FormField
                    label="GP No"
                    id="gatePassNo"
                    variant="inline"
                >
                    <SimpleInputBox
                        value={gatePassNo}
                        onChange={setGatePassNo}
                        placeholder="Enter Gate Pass No"
                    />
                </FormField>

                {/* STATUS FILTER */}
                <FormField
                    label="Status"
                    id="status"
                    variant="inline"
                >
                    <SelectDropdown
                        options={statusTypeOptions}
                        value={status}
                        isSameKeyValue={false}
                        valueKey="id"
                        labelKey="name"
                        variant="default"
                        className="w-full"
                        onChange={(val) => setStatus(val)}
                    />
                </FormField>
            </div>

            {/* --- Table Section --- */}
            <div className="px-1 mt-2 grid grid-cols-1">
                <CustomDataTable
                    columns={detailsColumns}
                    data={gatePassOutList}
                    columnsButton
                    loading={loading}
                    perPageDropdown
                    haveBreadcrumb
                    onPageChange={onPageChange}
                    paginationObject={paginationObject}
                    onPerPageChange={onPerPageChange}
                />
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
                title="Gate Pass Out"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                widthClass="max-w-full"
                heightClass="h-auto"
            >
                <></>
            </Modal>
        </div>
    );


}