import { AppDispatch, RootState } from "@/app/store";
import { useTheme } from "@/hooks/useTheme";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDefectRejectType } from "./defectRejectType.interface";
import { DropdownMenu } from "@/components/form/DropdownMenu";
import { Link, MoreVertical } from "react-feather";
import Panel from "@/components/layout/Panel";
import PageHeader from "@/components/layout/PageHeader";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import { getRoutes, RouteLayout } from "@/app/constants";
import { clearDefectRejectTypeMessages, getPagedDefectRejectTypes, removeDefectRejectType } from "../../reduxSlices/defectRejectType.Slice";

const DefectRejectTypeList = () => {

    const dispatch: AppDispatch = useDispatch();
    const { defectRejects, paginationObject, error, message, loading } = useSelector((state: RootState) => state.defectReject);
    const { rowsPerPage, layout } = useTheme();
    const [openDropdownId, setOpenDropdownId] = useState<string>("");

    const webRoutes = getRoutes(layout as RouteLayout);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearDefectRejectTypeMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearDefectRejectTypeMessages());
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
        document.title = "Defect/Reject List";
        // dispatch(getPagedCurrencies({ perPage: Number(rowsPerPage) }));
        // dispatch(getAllMachineSetupFromJson());
        return () => {
            document.title = "";
        };
    }, [dispatch]);

    const handleDelete = async (id: number, closeDropdown: () => void) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            const resultAction = await dispatch(removeDefectRejectType(id));
            if (removeDefectRejectType.fulfilled.match(resultAction)) {
                // Delete success, now refetch
                // dispatch(getPagedMachineSetup({ perPage: Number(rowsPerPage) }));
                closeDropdown();
                setOpenDropdownId("");
            } else {
                // Optional: show error
                console.error("Failed to delete:", resultAction.payload);
            }
        }
    };

    const detailsColumns: Column<IDefectRejectType>[] = useMemo(() => [
        {
            key: "actions",
            header: "Action",
            width: "w-[10px]",
            align: "center",
            render: (_item: IDefectRejectType, index: number) => {
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
                                        to={`${webRoutes.DEFECT_REJECTS_SAVE}/${_item.id}`}
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
            key: "isDefect",
            header: "is Defect",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "isReject",
            header: "is Reject",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "code",
            header: "Defect/Reject Code",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "name",
            header: "Defect/Reject Name",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "type",
            header: "Defect/Reject Type",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "sortBy",
            header: "Sort By",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "penaltyPoints",
            header: "Penalty Points",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "remarks",
            header: "Remarks",
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
                    title="Defect/Reject List"
                    buttonLabel="New Defect/Reject"
                    buttonHref={webRoutes.DEFECT_REJECTS_SAVE}
                />
            }
        >
            <div className="grid grid-cols-1 ">
                <div className="space-y-4 col-span-1">
                    <CustomDataTable
                        columns={detailsColumns}
                        data={defectRejects}
                        columnsButton
                        loading={loading}
                        perPageDropdown
                        onPageChange={(page) => dispatch(getPagedDefectRejectTypes({ page, perPage: Number(rowsPerPage) }))}
                        paginationObject={paginationObject}
                        onPerPageChange={(perPage) => dispatch(getPagedDefectRejectTypes({ page: 1, perPage }))}
                    />
                </div>
            </div>
        </Panel>
    );
};

export default DefectRejectTypeList;
