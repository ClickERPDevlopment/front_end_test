import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import { DropdownMenu } from "@/components/form/DropdownMenu";
import PageHeader from "@/components/layout/PageHeader";
import Panel from "@/components/layout/Panel";
import { useTheme } from "@/hooks/useTheme";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MoreVertical } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearBuyerMessages, getPagedBuyers, removeBuyer } from "../../reduxSlices/buyer.Slice";
import { IBuyer } from "./buyerSetup.interface";



const BuyerList = () => {

    const dispatch: AppDispatch = useDispatch();
    const { buyers, paginationObject, error, message, loading } = useSelector((state: RootState) => state.buyer);
    const { rowsPerPage, layout } = useTheme();
    const [openDropdownId, setOpenDropdownId] = useState<string>("");
    const webRoutes = getRoutes(layout as RouteLayout);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearBuyerMessages());
        }

    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearBuyerMessages());
        }

    }, [message]);

    const handleToggle = useCallback((id: string) => {
        console.log("handleToggle called with:", id, "current openDropdownId:", openDropdownId);
        setOpenDropdownId(prev => {
            const newId = prev === id ? "" : id;
            console.log("Setting new openDropdownId:", newId);
            return newId;
        });
    }, []);

    useEffect(() => {
        console.log("Dropdown changed to:", openDropdownId);
    }, [openDropdownId]);

    useEffect(() => {
        document.title = "Buyer List";
        // dispatch(getPagedCurrencies({ perPage: Number(rowsPerPage) }));
        // dispatch(getAllBuyersFromJson());
        return () => {
            document.title = "Buyer List";
        };
    }, [dispatch]);

    const handleDelete = async (id: number, closeDropdown: () => void) => {
        if (window.confirm("Are you sure you want to delete this buyer?")) {
            const resultAction = await dispatch(removeBuyer(id));
            if (removeBuyer.fulfilled.match(resultAction)) {
                // Delete success, now refetch
                dispatch(getPagedBuyers({ perPage: Number(rowsPerPage) }));
                closeDropdown();
                setOpenDropdownId("");
            } else {
                // Optional: show error
                console.error("Failed to delete:", resultAction.payload);
            }
        }
    };


    // need to work here, country name need to be added
    // added now pending for review
    const detailsColumns: Column<IBuyer>[] = useMemo(() => [
        {
            key: "actions",
            header: "Action",
            width: "w-[10px]",
            align: "center",
            render: (_item: IBuyer, index: number) => {
                const dropdownId = `dropdown-${_item.id}`;
                return (
                    <DropdownMenu
                        trigger={<MoreVertical size={16} />}
                        onClose={() => setOpenDropdownId("")} // optional, if you're tracking open IDs
                    >
                        {({ closeDropdown }: { closeDropdown: () => void }) => (
                            <ul className="text-sm">
                                <li className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    <Link
                                        to={`${webRoutes.BUYER_SAVE}/${_item.id}`}
                                        className="block px-4 py-2 w-full"
                                        onClick={closeDropdown}
                                    >
                                        Edit
                                    </Link>
                                </li>
                                <li className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    <button
                                        onClick={() => {
                                            handleDelete(_item.id, closeDropdown);
                                        }}
                                        className="block px-4 py-2 w-full cursor-pointer text-center"
                                    >
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        )}
                    </DropdownMenu>
                );
            },
        },
        {
            key: "id",
            header: "id",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "countryId",
            header: "countryId",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "countryName",
            header: "countryName",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "mainBuyerId",
            header: "mainBuyerId",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "buyerName",
            header: "buyerName",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "displayName",
            header: "displayName",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "buyerCode",
            header: "buyerCode",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "email",
            header: "email",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "buyingCommission",
            header: "buyingCommission",
            align: "left",
            width: "w-[300px]",
        }
    ], [openDropdownId, handleToggle]);

    useEffect(() => {
        console.log("detailsColumns changed");
    }, [detailsColumns]);


    return (
        <Panel
            header={
                <PageHeader
                    title="Buyer List"
                    buttonLabel="New Buyer"
                    buttonHref={webRoutes.BUYER_SAVE}
                />

            }

        >
            <div className="space-y-4 col-span-1">
                <CustomDataTable
                    columns={detailsColumns}
                    data={buyers}
                    columnsButton
                    loading={loading}
                    perPageDropdown
                    onPageChange={(page) => dispatch(getPagedBuyers({ page, perPage: Number(rowsPerPage) }))}
                    paginationObject={paginationObject}
                    onPerPageChange={(perPage) => dispatch(getPagedBuyers({ page: 1, perPage }))}
                />
            </div>
        </Panel>
    );
};

export default BuyerList;
