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
import { clearSizeMessages, getPagedSizes, removeSize } from "../../reduxSlices/size.Slice";
import { ISize } from "./sizeSetup.interface";



const SizeList = () => {

    const dispatch: AppDispatch = useDispatch();
    const { sizes, size, paginationObject, error, message, loading } = useSelector((state: RootState) => state.size);
    const { rowsPerPage, layout } = useTheme();
    const [openDropdownId, setOpenDropdownId] = useState<string>("");
    const webRoutes = getRoutes(layout as RouteLayout);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearSizeMessages());
        }

    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearSizeMessages());
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
        document.title = "Size List";
        // dispatch(getPagedCurrencies({ perPage: Number(rowsPerPage) }));
        // dispatch(getAllSizesFromJson());
        return () => {
            document.title = "Size List";
        };
    }, [dispatch]);

    const handleDelete = async (id: number, closeDropdown: () => void) => {
        if (window.confirm("Are you sure you want to delete this size?")) {
            const resultAction = await dispatch(removeSize(id));
            if (removeSize.fulfilled.match(resultAction)) {
                // Delete success, now refetch
                dispatch(getPagedSizes({ perPage: Number(rowsPerPage) }));
                closeDropdown();
                setOpenDropdownId("");
            } else {
                // Optional: show error
                console.error("Failed to delete:", resultAction.payload);
            }
        }
    };

    const detailsColumns: Column<ISize>[] = useMemo(() => [
        {
            key: "actions",
            header: "Action",
            width: "w-[10px]",
            align: "center",
            render: (_item: ISize, index: number) => {
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
                                        to={`${webRoutes.SIZE_SAVE}/${_item.id}`}
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
            key: "sizeName",
            header: "sizeName",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "sizeName",
            header: "sizeName",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "sortingNo",
            header: "sortingNo",
            align: "left",
            width: "w-[300px]",
        },
    ], [openDropdownId, handleToggle]);

    useEffect(() => {
        console.log("detailsColumns changed");
    }, [detailsColumns]);


    return (
        <Panel
            header={
                <PageHeader
                    title="Size List"
                    buttonLabel="New Size"
                    buttonHref={webRoutes.SIZE_SAVE}
                />

            }

        >
            <div className="space-y-4 col-span-1">
                <CustomDataTable
                    columns={detailsColumns}
                    data={sizes}
                    columnsButton
                    loading={loading}
                    perPageDropdown
                    onPageChange={(page) => dispatch(getPagedSizes({ page, perPage: Number(rowsPerPage) }))}
                    paginationObject={paginationObject}
                    onPerPageChange={(perPage) => dispatch(getPagedSizes({ page: 1, perPage }))}
                />
            </div>
        </Panel>
    );
};

export default SizeList;
