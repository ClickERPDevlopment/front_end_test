import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import FeatherIcon from "@/components/FeatherIcon";
import Button from "@/components/form/Button";
import { useTheme } from "@/hooks/useTheme";
import { faFileInvoice, faFileInvoiceDollar, faPenToSquare, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PlusSquare } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { getPagedInventorySales } from "../../reduxSlices/inventorySale.slice";
import { IInventorySale } from "./inventorySale.interface";

export default function InventorySaleList() {

    const dispatch: AppDispatch = useDispatch();
 
    const { sales, paginationObject, error, message, loading } = useSelector(
        (state: RootState) => state.inventorySale
    );
    const [openDropdownId, setOpenDropdownId] = useState<string>("");
    useEffect(() => {
        dispatch(getPagedInventorySales({ page: 1, perPage: Number(rowsPerPage), searchCriteria: { factoryId: company?.companyId || 0 } }));
    }, [dispatch]);

    const { rowsPerPage, layout, company } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);
    const reportRoutes = getRoutes("report" as RouteLayout);


    const onPageChange = useCallback((page: number) => {
        debugger
        dispatch(getPagedInventorySales({ page, perPage: Number(rowsPerPage) }));
    }, [dispatch, rowsPerPage]);

    const onPerPageChange = useCallback((perPage: number) => {
        dispatch(getPagedInventorySales({ page: 1, perPage }));
    }, [dispatch]);


    // --------- DELETE BUTTON CODES START ---------
    const handleDelete = async (id: number, closeDropdown: () => void) => {
        // if (window.confirm("Are you sure you want to delete this department?")) {
        //     const resultAction = await dispatch(removeMaterialGroup(id));
        //     if (removeMaterialGroup.fulfilled.match(resultAction)) {
        //         // Delete success, now refetch
        //         dispatch(getPagedMaterialGroups({ perPage: Number(rowsPerPage) }));
        //         closeDropdown();
        //         setOpenDropdownId("");
        //     } else {
        //         // Optional: show error
        //         console.error("Failed to delete:", resultAction.payload);
        //     }
        // }
    };
    // --------- DELETE BUTTON CODES END ------------

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
                    const dropdownId = `dropdown-${_item.id || index}`;
                    return (
                        <>
                            <Button
                                href={`${webRoutes.INVENTORY_SALE_CREATE}/${_item.id}`}
                                variant="flat"
                                size="sm"
                                className="p-1 bg-amber-300 mr-1"
                            >
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>

                             <Button
                                targetBlank
                                href={`${reportRoutes.INVENTORY_SALE_BILL_REPORT}?id=${_item.id}`}
                                variant="flat"
                                size="sm"
                                className="p-1 bg-amber-300 mr-1"
                            >
                                <FontAwesomeIcon icon={faFileInvoiceDollar} />
                            </Button>

                             <Button
                                targetBlank
                                href={`${reportRoutes.INVENTORY_SALE_CHALLAN_REPORT}?id=${_item.id}`}
                                variant="flat"
                                size="sm"
                                className="p-1 bg-amber-300"
                            >
                                <FontAwesomeIcon icon={faFileInvoice} />
                            </Button>
                        </>
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
                        buttons={<><Button to={webRoutes.INVENTORY_SALE_CREATE || "#"} size="sm" ><FeatherIcon icon={PlusSquare} /> New Inventory Sale</Button></>}
                    />
                </div>
            </div>
        </>
    );
}
