import { setDropdownData } from "@/app/dropdownSlice";
import { AppDispatch, RootState } from "@/app/store";
import DropdownAutoSuggest from "@/components/form/DropdownAutoSuggest";
import { FormField } from "@/components/form/FormField";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IBudget } from "./budget.interface";
import { getAllBuyers, GetAllConfigBuyer } from "@/modules/merchandising/reduxSlices/buyer.Slice";
import { fetchAllStyles, fetchStylesByBuyerId, GetAllConfigStyle } from "@/modules/garmentsProduction/reduxSlices/styleSlice";
import { Column, CustomDataTable } from '@/components/data-display/CustomDataTable';
import Button from '@/components/form/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useMemo } from "react";
import FeatherIcon from '@/components/FeatherIcon';
import { PlusSquare } from 'react-feather';
import { clearBudgetApprovalMessages, getPagedBudgetApprovals } from '../../reduxSlices/budget.Slice';
import { useTheme } from '@/hooks/useTheme';
import { useHotToast } from '@/utils/hotToast.util';
import { showSuccessToast } from '@/utils/toastUtils';
import { Link } from "react-router-dom";
import { getRoutes, RouteLayout } from "@/app/constants";



interface IFIlter {
    buyerId: number;
    buyerName: string;
    styleId: number;
    styleNo: string;
    poId: number;
}


export default function BudgetApprovalList() {
    const dispatch: AppDispatch = useDispatch();
    const { budget, budgetList,
        paginationObject, error, message, loading } = useSelector((state: RootState) => state.budget);

    const [filterObject, setFilterObject] = useState<IFIlter>({
        buyerId: 0,
        buyerName: "",
        styleId: 0,
        styleNo: "",
        poId: 0,

    })

    const { buyers, buyer } = useSelector((state: RootState) => state.buyer);
    const { styles, style } = useSelector((state: RootState) => state.style);
    const { rowsPerPage, layout, } = useTheme();
    const { showHotError, showHotSuccess } = useHotToast();
    const reportRoutes = getRoutes("webapp");

    // Fetch initial list
    useEffect(() => {
        dispatch(getPagedBudgetApprovals({
            page: 1,
            perPage: Number(rowsPerPage),
            searchCriteria: {
                buyerId: filterObject.buyerId,
                styleId: filterObject.styleId,
                poId: filterObject.poId,
            },
        }));
    }, [dispatch, rowsPerPage, filterObject]);

    // Handle toast notifications
    useEffect(() => {
        if (error) {
            //showHotError("Failed to load data", { bgColor: "#FF0000", textColor: "#ffffff", width: "250px", icon: "⚠️", position: "bottom-right" });
            dispatch(clearBudgetApprovalMessages());
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearBudgetApprovalMessages());
        }
    }, [message, dispatch]);

    useEffect(() => {
        dispatch(getPagedBudgetApprovals({ page: 1, perPage: Number(rowsPerPage), searchCriteria: { buyerId: buyer?.id || 0, styleId: style?.id || 0 } }));
    }, [dispatch]);


    useEffect(() => {
        dispatch(GetAllConfigBuyer());
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(GetAllConfigStyle());
    // }, [dispatch]);

    useEffect(() => {
        // Fetch styles whenever a buyer is selected
        if (filterObject.buyerId && filterObject.buyerId > 0) {
            dispatch(fetchStylesByBuyerId(filterObject.buyerId));
            // Reset previously selected style
            setFilterObject(prev => ({ ...prev, styleId: 0, styleNo: "" }));
        }
    }, [filterObject.buyerId, dispatch]);



    useEffect(() => {
        dispatch(
            setDropdownData({
                data: buyers,
                name: "BuyerListDropdown",
                labelKey: "NAME",
                valueKey: "Id",
            })
        );
    }, [buyers]);


    useEffect(() => {
        dispatch(
            setDropdownData({
                data: styles,
                name: "StyleListDropdown",
                labelKey: "Styleno",
                valueKey: "Id",
            })
        );
    }, [styles]);

    const onPageChange = useCallback((page: number) => {
        dispatch(getPagedBudgetApprovals({ page, perPage: Number(rowsPerPage), searchCriteria: { buyerId: filterObject.buyerId, styleId: filterObject.styleId, poId: filterObject.poId } }));
    }, [dispatch, rowsPerPage]);

    const onPerPageChange = useCallback((perPage: number) => {
        dispatch(getPagedBudgetApprovals({ page: 1, perPage, searchCriteria: { buyerId: filterObject.buyerId, styleId: filterObject.styleId, poId: filterObject.poId } }));
    }, [dispatch]);



    const detailsColumns: Column<IBudget>[] = useMemo(
        () => [
            {
                key: "buyer",
                header: "Buyer",
                align: "left",
                width: "w-[150px]",
            },
            {
                key: "style",
                header: "Style",
                align: "left",
                width: "w-[180px]",
            },
            {
                key: "po",
                header: "PO",
                align: "left",
                width: "w-[150px]",
            },
            {
                key: "budgetDate",
                header: "Date",
                align: "left",
                width: "w-[150px]",
            },
            {
                key: "costingNo",
                header: "Costing No",
                align: "left",
                width: "w-[220px]",
            },
            {
                key: "totalFob",
                header: "Total FOB",
                align: "left",
                width: "w-[180px]",
            },
            {
                key: "buyingCommission",
                header: "Buying Commission(%)",
                align: "left",
                width: "w-[180px]",
            },
            {
                key: "balanceValue",
                header: "Balance Value(%)",
                align: "left",
                width: "w-[180px]",
            },
            {
                key: "approvedBy",
                header: "Approved By",
                align: "left",
                width: "w-[180px]",
            },
            {
                key: "status",
                header: "Status",
                align: "left",
                width: "w-[180px]",
                render: (
                    row
                ) =>
                    <div>
                        {row.status == "0" && row.approvedBy == null ? "Pending" : (row.status == "1" ? "Approved" : "Unapproved")}
                    </div>
            },
            {
                key: "actions",
                header: "Action",
                align: "center",
                width: "w-[100px]",
                render: (_item: IBudget) => {
                    const reportUrl = `${reportRoutes.MANAGEMENT_BUDGET_REPORT}?id=${_item.budgetId}`;
                    debugger
                    return (
                        <Link
                            to={reportUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-blue-600 bg-transparent"
                        >
                            <FontAwesomeIcon icon={faEye} />
                        </Link>
                    );
                },
            },
        ],
        []
    );

    const handleFilterSet = (key: keyof IFIlter, val: number, dispa: string) => {
        setFilterObject(prev => {
            if (key === "buyerId") {
                return { ...prev, buyerId: val, buyerName: dispa }
            } else if (key === "styleId") {
                return { ...prev, styleId: val, styleNo: dispa }
            }
            return prev
        })
    }

    return (
        <div className="p-2">
            <div className="grid grid-cols-1">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                    {/* Buyers Filter */}
                    <FormField
                        label="Buyer"
                        id="buyerName"
                        variant="inline"
                    >
                        <DropdownAutoSuggest
                            name="BuyerListDropdown"
                            value={filterObject.buyerName.toString()}
                            onSelect={(val, dis) => handleFilterSet('buyerId', Number(val), String(dis))}
                            className="w-full"
                        />
                    </FormField>

                    {/* Styles Filter */}
                    <FormField
                        label="Style No."
                        id="styleName"
                        variant="inline"
                    >
                        <DropdownAutoSuggest
                            name="StyleListDropdown"
                            value={filterObject.styleNo.toString()}
                            onSelect={(val, dis) => handleFilterSet('styleId', Number(val), String(dis))}
                            className="w-full"
                        />
                    </FormField>
                </div>

                <div className="px-1 mt-2 grid grid-cols-1">
                    <CustomDataTable
                        columns={detailsColumns}
                        data={budgetList}
                        columnsButton
                        loading={loading}
                        perPageDropdown
                        haveBreadcrumb
                        paginationObject={paginationObject}
                        onPageChange={onPageChange}
                        onPerPageChange={onPerPageChange}
                    />
                </div>
            </div>
        </div>
    )
}