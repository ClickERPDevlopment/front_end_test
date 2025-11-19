import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import { DropdownMenu } from "@/components/form/DropdownMenu";
import PageHeader from "@/components/layout/PageHeader";
import Panel from "@/components/layout/Panel";
import { useTheme } from "@/hooks/useTheme";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, MoreVertical } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { clearMaterialSubGroupMessages, getPagedMaterialSubGroups, removeMaterialSubGroup } from "../../reduxSlices/materialsubgroupSlice";
import { IMaterialSubGroup } from "./materialsubgroup.interface";


const MaterialSubGroupList = () => {

    const dispatch: AppDispatch = useDispatch();
    const { materialSubGroups, paginationObject, error, message, loading } = useSelector((state: RootState) => state.materialSubGroup);
    const { rowsPerPage, layout } = useTheme();
    const [openDropdownId, setOpenDropdownId] = useState<string>("");
    const webRoutes = getRoutes(layout as RouteLayout);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearMaterialSubGroupMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearMaterialSubGroupMessages());
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
        document.title = "Material Sub Group List";
        // dispatch(getPagedMaterialSubGroups({ perPage: Number(rowsPerPage) }));
        return () => {
            document.title = "";
        };
    }, [dispatch]);

    const handleDelete = async (id: number, closeDropdown: () => void) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            const resultAction = await dispatch(removeMaterialSubGroup(id));
            if (removeMaterialSubGroup.fulfilled.match(resultAction)) {
                // Delete success, now refetch
                dispatch(getPagedMaterialSubGroups({ perPage: Number(rowsPerPage) }));
                closeDropdown();
                setOpenDropdownId("");
            } else {
                // Optional: show error
                console.error("Failed to delete:", resultAction.payload);
            }
        }
    };

    const detailsColumns: Column<IMaterialSubGroup>[] = useMemo(() => [
        {
            key: "actions",
            header: "Action",
            width: "w-[10px]",
            align: "center",
            render: (_item: IMaterialSubGroup, index: number) => {
                const dropdownId = `dropdown-${_item.id || index}`;
                return (
                    <DropdownMenu
                        trigger={<MoreVertical size={16} />}
                        onClose={() => setOpenDropdownId("")} // optional, if you're tracking open IDs
                    >
                        {({ closeDropdown }: { closeDropdown: () => void }) => (
                            <ul className="text-sm">
                                <li className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    <Link
                                        to={`${webRoutes.MATERIAL_SUBGROUP_SAVE}/${_item.id}`}
                                        className="block px-4 py-2 w-full"
                                        onClick={closeDropdown}
                                    >
                                        Edit
                                    </Link>
                                </li>
                                <li className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    <button
                                        onClick={() => {
                                            handleDelete(_item.id || 0, closeDropdown);
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
            header: "Type",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "code",
            header: "Code",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "name",
            header: "Name",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "remarks",
            header: "Remarks",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "category",
            header: "Category",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "uom",
            header: "Uom",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "materialSubGroupLedgers",
            header: "Material Group Ledgers",
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
                    title="Material Sub Group List"
                    buttonLabel="New Material Sub Group"
                    buttonHref={webRoutes.MATERIAL_SUBGROUP_SAVE}
                />
            }
        >
            {/* Bottom MaterialSubGroup: Full-width Table */}
            <div className="grid grid-cols-1 ">
                <div className="space-y-4 col-span-1">
                    <CustomDataTable
                        columns={detailsColumns}
                        data={materialSubGroups}
                        columnsButton
                        loading={loading}
                        perPageDropdown
                        onPageChange={(page) => dispatch(getPagedMaterialSubGroups({ page, perPage: Number(rowsPerPage) }))}
                        paginationObject={paginationObject}
                        onPerPageChange={(perPage) => dispatch(getPagedMaterialSubGroups({ page: 1, perPage }))}
                    />
                </div>
            </div>
        </Panel>
    );
};

export default MaterialSubGroupList;
