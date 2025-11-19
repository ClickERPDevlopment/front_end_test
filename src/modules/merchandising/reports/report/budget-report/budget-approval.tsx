import React, { useEffect, useState } from 'react'
import BudgetReport from './budget-report-index'
import { BudgetReportResponseType } from './budget-report-type';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '@/api/axiosInstance';
import { toTitleCase } from '../../../../../utils/caseFormat';
import Button from '@/components/form/Button';
import useApiUrl from '@/hooks/use-ApiUrl';
import axios from 'axios';
import ConfirmDialog from '@/components/feedback-interaction/ConfirmDialog';

export default function BudgetApproval() {
    const [data, setData] = useState<BudgetReportResponseType>();
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    // const budgetId = searchParams.get("id");
    const [approvalInfo, setApprovalInfo] = useState<boolean | null>(null);
    const budgetId = data?.Report?.[0]?.BUDGET_ID;
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmType, setConfirmType] = useState<"approve" | "unapprove" | null>(null);


    useEffect(() => {
        if (!budgetId) return;

        const fetchApprovalInfo = async () => {
            try {
                const res = await axiosInstance.get(
                    `/gmt-budget-approval/by-budget-id?budgetId=${budgetId}`
                );

                /** Convert API status: "1" -> true, "0" -> false */
                setApprovalInfo(res.data?.status === "1");

            } catch (error) {
                console.error("fetchApprovalInfo error:", error);
            }
        };

        fetchApprovalInfo();
    }, [budgetId]);





    const handleApproveUnapprove = async (type: "approve" | "unapprove") => {
        try {
            setIsLoading(true);

            const masterPayload = {
                bn_no: data?.Report[0]?.BUDGET_NO || "",
                bn_id: data?.Report[0]?.BUDGET_ID || 0,
                total_qty: data?.Report.reduce((acc, item) => acc + (item.QTY || 0), 0),
                budget_for: data?.Report[0]?.ITEM || "",
                total_fob_value: data?.FOB || 0,
                buying_commission: data?.Report.reduce((acc, item) => acc + (item.BUYEING_COMMI || 0), 0),
                style_no: data?.Report[0]?.STYLENO || "",
                item_type: data?.Report[0]?.DS || "",
                po_or_job_no: data?.Report[0]?.PONO || "",
                status: type === "approve" ? "1" : "0"
            };

            const detailsDataPayload = data?.Report.map((item) => ({
                particulars: item.COST_NAME || "",
                mtl: item.MTL || "",
                uom: item.UOM || "",
                qty: item.QTY || 0,
                unit_price: item.COSTING_PRICE || 0,
                costing_total: item.COSTING_TOTAL_VALUE || 0,
                budget_total: item.BUDGET_TOTAL_VALUE || 0
            }));

            debugger


            await axiosInstance.post("/gmt-budget-approval", {
                master: masterPayload,
                detailsData: detailsDataPayload
            });

            // alert(`${toTitleCase(type)} successfully!`);
            // Update status after posting
            setApprovalInfo(type === "approve");

        } catch (error) {
            console.error(error);
            alert(`${toTitleCase(type)} failed!`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCallback = (data: BudgetReportResponseType) => {
        console.log('data FROM PARETNT', data)
        setData(data);
    }

    const handleConfirm = () => {
        if (confirmType)
            handleApproveUnapprove(confirmType);
        setConfirmOpen(false);
    };

    const handleCancel = () => {
        setConfirmOpen(false);
    };




    return (
        <div>
            <div className="flex justify-end pr-15 pt-2 gap-2">
                <Button
                    variant="flat"
                    size="sm"
                    disabled={approvalInfo === true}
                    // className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                    className={`px-4 py-2 text-white cursor-pointer 
                    ${approvalInfo === true
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                    // onClick={() => { handleApproveUnapprove("approve") }}
                    onClick={() => {
                        setConfirmType("approve");
                        setConfirmOpen(true);
                    }}
                >
                    Approve
                </Button>

                <Button
                    variant="flat"
                    size="sm"
                    disabled={approvalInfo === false}
                    // className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                    className={`px-4 py-2 text-white cursor-pointer 
                    ${approvalInfo === false
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                    // onClick={() => handleApproveUnapprove("unapprove")}
                    onClick={() => {
                        setConfirmType("unapprove");
                        setConfirmOpen(true);
                    }}

                >
                    Unapprove
                </Button>
            </div>

            <BudgetReport budgetApprovalCallback={(data) => handleCallback(data)} />

            <ConfirmDialog
                open={confirmOpen}
                title={confirmType === "approve" ? "Approve Budget" : "Unapprove Budget"}
                message={
                    confirmType === "approve"
                        ? "Are you sure you want to approve this budget?"
                        : "Are you sure you want to unapprove this budget?"
                }
                confirmText="Yes"
                cancelText="Cancel"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />

        </div>
    )
}
