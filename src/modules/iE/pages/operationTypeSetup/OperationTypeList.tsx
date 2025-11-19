import { AppDispatch, RootState } from "@/app/store";
import { useTheme } from "@/hooks/useTheme";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearOperationTypeMessages, getPagedOperationTypes, removeOperationType } from "../../reduxSlices/operationTypeSlice";
import { IOperationType } from "./operationTypeSetup.interface";

import { getRoutes, RouteLayout } from "@/app/constants";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import { DropdownMenu } from "@/components/form/DropdownMenu";
import PageHeader from "@/components/layout/PageHeader";
import Panel from "@/components/layout/Panel";
import { Link, MoreVertical } from "react-feather";


const OperationTypeList = () => {
    const dispatch: AppDispatch = useDispatch();
    const { operationTypes, paginationObject, error, message, loading } = useSelector((state: RootState) => state.operationType);
    const { rowsPerPage, layout } = useTheme();
    const [openDropdownId, setOpenDropdownId] = useState<string>("");
    const webRoutes = getRoutes(layout as RouteLayout);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearOperationTypeMessages());
        }

    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearOperationTypeMessages());
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
        document.title = "Operation Type List";

        // dispatch(getPagedCurrencies({ perPage: Number(rowsPerPage) }));
        // dispatch(getAllOperationTypeFromJson());

        return () => {
            document.title = "";
        };
    }, [dispatch]);

    const handleDelete = async (id: number, closeDropdown: () => void) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            const resultAction = await dispatch(removeOperationType(id));
            if (removeOperationType.fulfilled.match(resultAction)) {
                // Delete success, now refetch
                // dispatch(getPagedOperationType({ perPage: Number(rowsPerPage) }));
                closeDropdown();
                setOpenDropdownId("");
            } else {
                // Optional: show error
                console.error("Failed to delete:", resultAction.payload);
            }
        }
    };

    const detailsColumns: Column<IOperationType>[] = useMemo(() => [
        {
            key: "actions",
            header: "Action",
            width: "w-[10px]",
            align: "center",
            render: (_item: IOperationType, index: number) => {
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
                                        to={`${webRoutes.OPERATION_SAVE}/${_item.id}`}
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
            key: "type",
            header: "type",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "remarks",
            header: "remarks",
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
                    title="Operation Type List"
                    buttonLabel="New Operation Type"
                    buttonHref={webRoutes.OPERATION_SAVE}
                />

            }

        >
            <div className="grid grid-cols-1 ">
                <div className="space-y-4 col-span-1">
                    <CustomDataTable
                        columns={detailsColumns}
                        data={operationTypes}
                        columnsButton
                        loading={loading}
                        perPageDropdown
                        onPageChange={(page) => dispatch(getPagedOperationTypes({ page, perPage: Number(rowsPerPage) }))}
                        paginationObject={paginationObject}
                        onPerPageChange={(perPage) => dispatch(getPagedOperationTypes({ page: 1, perPage }))}
                    />
                </div>

            </div>

        </Panel>
    );
};

export default OperationTypeList;
