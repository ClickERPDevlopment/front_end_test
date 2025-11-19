import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import Button from "@/components/form/Button";
import { useTheme } from "@/hooks/useTheme";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPagedInventorySales } from "../../reduxSlices/inventorySale.slice";
import { IInventorySale } from "./inventorySale.interface";

export default function InventorySaleApproval() {

    const dispatch: AppDispatch = useDispatch();
    const { rowsPerPage, layout, company } = useTheme();
    const { sales, paginationObject, error, message, loading } = useSelector(
        (state: RootState) => state.inventorySale
    );
    const [openDropdownId, setOpenDropdownId] = useState<string>("");
    useEffect(() => {
        dispatch(getPagedInventorySales({ page: 1, perPage: Number(rowsPerPage), searchCriteria: {factoryId: company?.companyId||0} }));
    }, [dispatch]);

    const onPageChange = useCallback((page: number) => {
        debugger
        dispatch(getPagedInventorySales({ page, perPage: Number(rowsPerPage) }));
    }, [dispatch, rowsPerPage]);
    
    const webRoutes = useMemo(() => {
        if (layout && layout.trim() !== "") {
            return getRoutes(layout as RouteLayout);
        }
        return null;
    }, [layout]);

    const onPerPageChange = useCallback((perPage: number) => {
        dispatch(getPagedInventorySales({ page: 1, perPage }));
    }, [dispatch]);

    const handleToggle = useCallback((id: string) => {
        console.log(
            "handleToggle called with:",
            id,
            "current openDropdownId:",
            openDropdownId
        );
        setOpenDropdownId((prev) => {
            const newId = prev === id ? "" : id;
            console.log("Setting new openDropdownId:", newId);
            return newId;
        });
    }, []);

    const detailsColumns: Column<IInventorySale>[] = useMemo(
        () => [
            {
                key: "saleNo",
                header: "Sale No",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "saleDate",
                header: "Sale Date",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "customerName",
                header: "Customer",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "actions",
                header: "Action",
                width: "w-[10px]",
                align: "center",
                render: (_item: IInventorySale, index: number) => {
                    const href =
                        webRoutes?.INVENTORY_SALE_APPROVE && _item.id
                            ? `${webRoutes.INVENTORY_SALE_APPROVE}/${_item.id}`
                            : "#";

                    return (
                        <Button
                            href={href}
                            variant="flat"
                            size="sm"
                            className={`p-1 transition-colors duration-200 rounded-md ${
                                _item.isApproved === 1
                                    ? "bg-green-100 text-green-700 hover:bg-green-200 cursor-default"
                                    : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                            }`}
                        >
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                className={`${
                                    _item.isApproved === 1
                                        ? "text-green-600"
                                        : "text-amber-600"
                                }`}
                            />
                        </Button>
                    );
                },
            },
        ],

        [openDropdownId, handleToggle]
    );

    return (
        <>
            
            {/* Bottom MaterialGroup: Full-width Table */}
            <div className="grid grid-cols-1 ">
                <div className="space-y-4 col-span-1">
                    <CustomDataTable
                        columns={detailsColumns}
                        data={sales}
                        columnsButton
                        loading={loading}
                        perPageDropdown
                        haveBreadcrumb
                        onPageChange={onPageChange}
                        paginationObject={paginationObject}
                        onPerPageChange={onPerPageChange}

                    />
                </div>
            </div>
        </>
    );
}
