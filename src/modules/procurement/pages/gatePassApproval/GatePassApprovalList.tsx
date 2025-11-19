import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import { Column, CustomDataTable } from '@/components/data-display/CustomDataTable';
import Button from "@/components/form/Button";
import CustomDatePicker from "@/components/form/CustomDatePicker";
import { FormField } from "@/components/form/FormField";
import SelectDropdown from "@/components/form/SelectDropdown";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import { useTheme } from "@/hooks/useTheme";
import { useHotToast } from "@/utils/hotToast.util";
import { showSuccessToast } from "@/utils/toastUtils";
import { faBan, faCheckCircle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearGatePassMessages, getPagedGatePassApproval } from "../../reduxSlices/gatePassSlice";
import { IGatePassApproval } from "../gatePass/gatePass.interface";




export default function GatePassApprovalList() {



    const dispatch: AppDispatch = useDispatch();
    const { companies } = useSelector((state: RootState) => state.company);
    const { gatePassApprovalList, loading, paginationObject, error, message } = useSelector((state: RootState) => state.gatePass);

    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [createdBy, setCreatedBy] = useState("");
    const [companyId, setCompany] = useState<string>("");
    const [gatePassNo, setGatePassNo] = useState("");
    const { layout, rowsPerPage } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);
    const { showHotError, showHotSuccess } = useHotToast();

    useEffect(() => {
        dispatch(getPagedGatePassApproval({
            page: 1,
            perPage: Number(rowsPerPage),
            searchCriteria: {
                companyId: companyId ? Number(companyId) : undefined,
                fromDate: fromDate ? fromDate.toISOString().split("T")[0] : undefined,
                ToDate: toDate ? toDate.toISOString().split("T")[0] : undefined,
                gatePassNo: gatePassNo || undefined,
                createdBy: createdBy || undefined,
            },
        }));
    }, [dispatch, rowsPerPage, fromDate, toDate, gatePassNo, createdBy, companyId]);

    useEffect(() => {
        if (error) {
            showHotError("Failed to load data", { bgColor: "#FF0000", textColor: "#ffffff", width: "250px", icon: "⚠️" });
            dispatch(clearGatePassMessages());
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearGatePassMessages());
        }
    }, [message, dispatch]);

    const onPageChange = useCallback((page: number) => {
        dispatch(getPagedGatePassApproval({ page, perPage: Number(rowsPerPage) }));
    }, [dispatch, rowsPerPage])

    const onPerPageChange = useCallback((perPage: number) => {
        dispatch(getPagedGatePassApproval({ page: 1, perPage }));
    }, [dispatch]);


    const detailsColumns: Column<IGatePassApproval>[] = useMemo(
        () => [
            {
                key: "id",
                header: "Id",
                align: "left",
                width: "w-[150px]"
            },
            {
                key: "gatePassNo",
                header: "Gate Pass No",
                align: "left",
                width: "w-[150px]"
            },
            {
                key: "proposedBy",
                header: "Proposed By",
                align: "left",
                width: "w-[150px]"
            },
            {
                key: "companyName",
                header: "Company Name",
                align: "left",
                width: "w-[150px]"
            },
            {
                key: "gatePassType",
                header: "Gate Pass Type",
                align: "left",
                width: "w-[150px]"
            },
            {
                key: "orgSupplierName",
                header: "Org/Supplier Name",
                align: "left",
                width: "w-[150px]"
            },
            {
                key: "type",
                header: "Type",
                align: "left",
                width: "w-[150px]"
            },
            {
                key: "createdDate",
                header: "Created Date",
                align: "left",
                width: "w-[150px]"
            },
            {
                key: "status",
                header: "Status",
                align: "left",
                width: "w-[150px]",
                render: (_item: IGatePassApproval) => (
                    <div className="flex gap-2">
                        <Button
                            // href={href}
                            variant="flat"
                            size="sm"
                            className={`p-1 transition-colors duration-200 rounded-md 
                                ${_item.status === 0
                                    ? "bg-red-100 text-red-900 hover:bg-red-200"
                                    : _item.status === 1
                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                        : _item.status === 2
                                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                            : ""
                                }
                            `}
                        >
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                className={`
                                    ${_item.status === 0
                                        ? "text-red-600"
                                        : _item.status === 1
                                            ? "text-green-600"
                                            : _item.status === 2
                                                ? "text-yellow-600"
                                                : ""
                                    }`}
                            />
                        </Button>
                    </div>
                ),
            },
            {
                key: "authorizedDate",
                header: "Authorized Date",
                align: "left",
                width: "w-[150px]"
            },
            {
                key: "actions",
                header: "Action",
                align: "center",
                width: "w-[100px]",
                render: (_item: IGatePassApproval) => (
                    <div className="flex gap-2">
                        <Button
                            href={`${webRoutes.GATE_PASS_APPROVAL_FORM}/${_item.id}`}
                            variant="flat"
                            size="sm"
                            className="p-1 bg-green-400"
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                        </Button>
                        <Button
                            // href={`${webRoutes.GATE_PASS_SAVE}/${_item.id}`}
                            variant="flat"
                            size="sm"
                            className="p-1 bg-red-400"
                        >
                            <FontAwesomeIcon icon={faBan} />
                        </Button>
                    </div>
                ),
            },
        ],
        []
    );



    return (
        <div className="grid grid-cols-1">

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
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
                        value={gatePassNo}
                        onChange={setGatePassNo}
                        placeholder="Enter Gate Pass No"
                    />
                </FormField>
            </div>


            {/* --- Table Section --- */}
            < div className="px-1 mt-2">
                <CustomDataTable
                    columns={detailsColumns}
                    data={gatePassApprovalList}
                    columnsButton
                    loading={loading}
                    perPageDropdown
                    haveBreadcrumb
                    onPageChange={onPageChange}
                    paginationObject={paginationObject}
                    onPerPageChange={onPerPageChange}
                />
            </div >
        </div>
    );
}