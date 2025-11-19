import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import FeatherIcon from "@/components/FeatherIcon";
import Button from "@/components/form/Button";
import CustomDatePicker from "@/components/form/CustomDatePicker";
import { FormField } from "@/components/form/FormField";
import SelectDropdown from "@/components/form/SelectDropdown";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import { useTheme } from "@/hooks/useTheme";
import { useHotToast } from "@/utils/hotToast.util";
import { showSuccessToast } from "@/utils/toastUtils";
import { faFilePdf, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PlusSquare } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { clearGatePassMessages, getPagedGatePass } from "../../reduxSlices/gatePassSlice";
import { IGatePassMaster } from "./gatePass.interface";

export default function GatePassList() {
    const dispatch: AppDispatch = useDispatch();
    const { gatePassList, paginationObject, error, message, loading } = useSelector(
        (state: RootState) => state.gatePass
    );
    const { companies } = useSelector((state: RootState) => state.company);
    const { rowsPerPage, layout, company } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [gatePassNO, setGatePassNO] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [companyId, setCompany] = useState<string>("");
    const { showHotError, showHotSuccess } = useHotToast();


    // Fetch initial list
    useEffect(() => {
        dispatch(getPagedGatePass({
            page: 1,
            perPage: Number(rowsPerPage),
            searchCriteria: {
                FactoryId: companyId ? Number(companyId) : undefined,
                FromDate: fromDate ? fromDate.toISOString().split("T")[0] : undefined,
                ToDate: toDate ? toDate.toISOString().split("T")[0] : undefined,
                RefNo: gatePassNO || undefined,
                CreatedBy: createdBy || undefined,
            },
        }));
    }, [dispatch, rowsPerPage, fromDate, toDate, gatePassNO, createdBy, companyId]);

    // Handle toast notifications
    useEffect(() => {
        if (error) {
            showHotError("Failed to load data", { bgColor: "#FF0000", textColor: "#ffffff", width: "250px", icon: "⚠️", position: "bottom-right" });
            dispatch(clearGatePassMessages());
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearGatePassMessages());
        }
    }, [message, dispatch]);

    // Pagination handlers
    const onPageChange = useCallback((page: number) => {
        dispatch(getPagedGatePass({ page, perPage: Number(rowsPerPage) }));
    }, [dispatch, rowsPerPage]);

    const onPerPageChange = useCallback((perPage: number) => {
        dispatch(getPagedGatePass({ page: 1, perPage }));
    }, [dispatch]);


    const detailsColumns: Column<IGatePassMaster>[] = useMemo(
        () => [
            {
                key: "passDate",
                header: "Date",
                align: "left",
                width: "w-[150px]",
            },
            {
                key: "username",
                header: "Created By",
                align: "left",
                width: "w-[180px]",
            },
            {
                key: "refNo",
                header: "Ref. No.",
                align: "left",
                width: "w-[150px]",
            },
            {
                key: "itemType",
                header: "Type",
                align: "left",
                width: "w-[150px]",
            },
            {
                key: "supplierName",
                header: "Org/Supplier",
                align: "left",
                width: "w-[220px]",
            },
            {
                key: "isApproved",
                header: "Status",
                align: "left",
                width: "w-[150px]",
                render: (_item: IGatePassMaster) => (
                    <div className="light">
                        <div className="default">
                            <span
                                className={
                                    _item.isApproved === "Approved"
                                        ? "status-approve font-bold"
                                        : _item.isApproved === "Rejected"
                                            ? "status-rejected font-bold"
                                            : "status-pending font-bold"
                                }
                            >
                                {_item.isApproved}
                            </span>
                        </div>
                    </div>

                ),
            },
            {
                key: "approveUserName",
                header: "Aprv By",
                align: "left",
                width: "w-[180px]",
            },
            {
                key: "editAction",
                header: "Action",
                align: "center",
                width: "w-[100px]",
                render: (_item: IGatePassMaster) => (
                    <Button
                        href={`${webRoutes.GATE_PASS_SAVE}/${_item.id}`}
                        variant="flat"
                        size="sm"
                        className="p-1 faPenToSquare bg-transparent"
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                ),
            },
            {
                key: "reportAction",
                header: "Report",
                align: "center",
                width: "w-[100px]",
                render: (_item: IGatePassMaster) => (
                    <Button
                        href={`${webRoutes.GATE_PASS_SAVE}/${_item.id}`}
                        variant="flat"
                        size="sm"
                        className="p-1 faFilePdf bg-transparent"
                    >
                        <FontAwesomeIcon icon={faFilePdf} />
                    </Button>
                ),
            },
        ],
        []
    );


    return (<div className="p-2 bg-white rounded-md shadow-md">
        {/* --- Filter Section --- */}
        <div className="px-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-1">

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

            {/* CREATED BY FILTER */}
            <FormField
                label="Created By"
                id="createdBy"
                variant="inline"
            >
                <SimpleInputBox
                    value={createdBy}
                    onChange={setCreatedBy}
                    placeholder="Enter Created By"
                />
            </FormField>

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

            {/* GATE PASS NO FILTER */}
            <FormField
                label="GP No"
                id="gatePassNo"
                variant="inline"
            >
                <SimpleInputBox
                    value={gatePassNO}
                    onChange={setGatePassNO}
                    placeholder="Enter Gate Pass No"
                />
            </FormField>
        </div>

        {/* --- Table Section --- */}
        <div className="px-1 mt-2 grid grid-cols-1">
            <CustomDataTable
                columns={detailsColumns}
                data={gatePassList}
                columnsButton
                loading={loading}
                perPageDropdown
                haveBreadcrumb
                onPageChange={onPageChange}
                paginationObject={paginationObject}
                onPerPageChange={onPerPageChange}
                buttons={
                    <Button
                        to={webRoutes.GATE_PASS_SAVE || "#"}
                        size="sm"
                    >
                        <FeatherIcon icon={PlusSquare} /> New Gate Pass
                    </Button>
                }
            />
        </div>
    </div>


    );
}
