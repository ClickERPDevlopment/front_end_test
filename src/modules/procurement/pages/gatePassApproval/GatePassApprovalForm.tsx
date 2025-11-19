import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import { FormField } from "@/components/form/FormField";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import { ActionButtons, ActionType } from "@/components/layout/ActionButtons";
import { useTheme } from "@/hooks/useTheme";
import { useDashboardActions } from "@/layouts/DashboardLayout";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGatePassApproval, getPagedGatePass, getPagedGatePassApproval } from "../../reduxSlices/gatePassSlice";
import { IGatePassDetail } from "../gatePass/gatePass.interface";


interface IGatePassApprovalFields {
    gatePassNo: string;
    gatePassDate: string;
    proposedBy: string;
    type: string;
    orgType: string;
    remarks: string;
    fromCompany: string;
    supplierName: string;
}



export default function GatePassApprovalForm() {


    const dispatch: AppDispatch = useDispatch();
    const { gatePass, gatePassList, paginationObject, error, loading, message } = useSelector((state: RootState) => state.gatePass);
    const [isEditMode, setIsEditMode] = useState(false);
    const { setActions } = useDashboardActions();
    const { layout, rowsPerPage } = useTheme();
    const [rows, setRows] = useState<IGatePassDetail[]>([]);
    const { id } = useParams();
    const webRoutes = getRoutes(layout as RouteLayout);


    const [gatePassFieldObject, setGatePassFieldObject] = useState<IGatePassApprovalFields>({
        gatePassNo: "",
        gatePassDate: "",
        proposedBy: "",
        type: "",
        orgType: "",
        remarks: "",
        fromCompany: "",
        supplierName: "",
    })


    const onPageChange = useCallback((page: number) => {
        dispatch(getPagedGatePassApproval({ page, perPage: Number(rowsPerPage) }));
    }, [dispatch, rowsPerPage]);

    useEffect(() => {
        if (id) {
            dispatch(getGatePassApproval(Number(id)));
        }
    }, [id, dispatch]);

    const handleApprove = (checked: boolean) => {
        // dispatch(updateGatePassApprovalField({ key: "isApproved", value: checked }));
        // if (checked) {
        //     dispatch(updateGatePassApprovalField({ key: "isReject", value: false }));
        // }
    };

    const handleReject = (checked: boolean) => {
        // dispatch(updateGatePassApprovalField({ key: "isReject", value: checked }));
        // if (checked) {
        //     dispatch(updateGatePassApprovalField({ key: "isApproved", value: false }));
        // }
    };



    // --- Action Button Handlers --- 
    const handleAction = useCallback(
        //debugger
        (action: ActionType) => {
            // switch (action) {
            //     case "save":
            //         break;
            //     case "update":
            //         break;
            //     case "delete":
            //         break;
            //     case "clear":
            //         break;
            //     case "preview":
            //         break;
            // }
        },
        [dispatch]
    );
    useEffect(() => {
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);


    const detailsColumns: Column<IGatePassDetail>[] = useMemo(() => [
        {
            key: "itemName",
            header: "Item Name",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "uomName", // changed from 'uom'
            header: "Uom",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "noOfPkt", // changed from 'pkt'
            header: "Pkt",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "buyerName",
            header: "Buyer",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "styleNo", // changed from 'styleId'
            header: "Style No",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "colorName",
            header: "Color Name",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "sizeName", // changed from 'size'
            header: "Size Name",
            align: "left",
            width: "w-[300px]",
        },
    ], []);


    useEffect(() => {
        console.log("detailsColumns changed");
    }, [detailsColumns]);

    return (
        <div className="px-1 grid grid-cols-1">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">

                <FormField
                    label="Gate Pass No"
                    id="gatePassNo"
                    variant="inline"
                >
                    <SimpleInputBox
                        value={gatePass?.master?.refNo ?? ""}
                        onChange={() => { }}
                        placeholder=""
                    />
                </FormField>

                <FormField
                    label="Gate Pass Date"
                    id="createdDate"
                    variant="inline"
                >
                    <SimpleInputBox
                        value={gatePass?.master?.passDate ?? ""}
                        onChange={() => { }}
                        placeholder=""
                    />
                </FormField>

                <FormField
                    label="Proposed By"
                    id="proposedBy"
                    variant="inline"
                >
                    <SimpleInputBox
                        value={gatePass?.master.username ?? ""}
                        onChange={() => { }}
                        placeholder=""
                    />
                </FormField>

                <FormField
                    label="Type"
                    id="gatePassType"
                    variant="inline"
                >
                    <SimpleInputBox
                        value={gatePass?.master.gatePassType ?? ""}
                        onChange={() => { }}
                        placeholder=""
                    />
                </FormField>

                <FormField
                    label="Org. Type"
                    id="organizationType"
                    variant="inline"
                >
                    <SimpleInputBox
                        // value={gatePass?.master?. ?? ""}
                        value={""}
                        onChange={() => { }}
                        placeholder=""
                    />
                </FormField>

                <FormField
                    label="Remarks"
                    id="Remarks"
                    variant="inline"
                >
                    <SimpleInputBox
                        value={gatePass?.master?.remarks ?? ""}
                        onChange={() => { }}
                        placeholder=""
                    />
                </FormField>

                <FormField
                    label="From Company"
                    id="companyName"
                    variant="inline"
                >
                    <SimpleInputBox
                        value={gatePass?.master?.factoryId ?? ""}
                        onChange={() => { }}
                        placeholder=""
                    />
                </FormField>

                <FormField
                    label="Supplier/Org. Name"
                    id="orgSupplierName"
                    variant="inline"
                >
                    <SimpleInputBox
                        value={gatePass?.master?.supplierName ?? ""}
                        onChange={() => { }}
                        placeholder=""
                    />
                </FormField>

            </div>

            <div className="flex gap-2 mt-2">
                {/* 
                <Checkbox
                    checked={gatePass?.master?.isApproved === true}
                    onChange={(checked) => handleApprove(checked)}
                    label="Approve"
                    size="small"
                />
                <Checkbox
                    checked={gatePass?.master?.isReject === true}
                    onChange={(checked) => handleReject(checked)}
                    size="small"
                    label="Reject"
                /> */}
            </div>

            <div className="mt-2 grid grid-cols-1">
                <CustomDataTable
                    columns={detailsColumns}
                    data={rows}
                    loading={loading}
                    perPageDropdown
                    onPageChange={onPageChange}
                    onPerPageChange={(perPage) => dispatch(getPagedGatePass({ page: 1, perPage }))}
                    paginationObject={paginationObject}
                />
            </div>
        </div>
    );
} 