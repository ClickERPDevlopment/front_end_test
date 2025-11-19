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
import { clearMaterialGroupMessages, getPagedMaterialGroups, removeMaterialGroup } from "../../reduxSlices/materialgroup.Slice";
import { IMaterialGroup } from "./materialgroup.interface";


const MaterialGroupList = () => {

    const dispatch: AppDispatch = useDispatch();
    const { materialGroups, paginationObject, error, message, loading } = useSelector((state: RootState) => state.materialGroup);
    const { rowsPerPage, layout } = useTheme();
    const [openDropdownId, setOpenDropdownId] = useState<string>("");
    const webRoutes = getRoutes(layout as RouteLayout);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearMaterialGroupMessages());
        }

    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearMaterialGroupMessages());
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
        document.title = "Material Group List";

        // dispatch(getPagedMaterialGroups({ perPage: Number(rowsPerPage) }));

        return () => {
            document.title = "";
        };
    }, [dispatch]);

    const handleDelete = async (id: number, closeDropdown: () => void) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            const resultAction = await dispatch(removeMaterialGroup(id));
            if (removeMaterialGroup.fulfilled.match(resultAction)) {
                // Delete success, now refetch
                dispatch(getPagedMaterialGroups({ perPage: Number(rowsPerPage) }));
                closeDropdown();
                setOpenDropdownId("");
            } else {
                // Optional: show error
                console.error("Failed to delete:", resultAction.payload);
            }
        }
    };

    const detailsColumns: Column<IMaterialGroup>[] = useMemo(() => [
        {
            key: "actions",
            header: "Action",
            width: "w-[10px]",
            align: "center",
            render: (_item: IMaterialGroup, index: number) => {
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
                                        to={`${webRoutes.MATERIALGROUP_SAVE}/${_item.id}`}
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
    ], [openDropdownId, handleToggle]);

    useEffect(() => {
        console.log("detailsColumns changed");
    }, [detailsColumns]);


    return (
        <Panel
            header={
                <PageHeader
                    title="Material Group List"
                    buttonLabel="New Material Group"
                    buttonHref={webRoutes.MATERIALGROUP_SAVE}
                />
            }
        >
            {/* Bottom MaterialGroup: Full-width Table */}
            <div className="grid grid-cols-1 ">
                <div className="space-y-4 col-span-1">
                    <CustomDataTable
                        columns={detailsColumns}
                        data={materialGroups}
                        columnsButton
                        loading={loading}
                        perPageDropdown
                        onPageChange={(page) => dispatch(getPagedMaterialGroups({ page, perPage: Number(rowsPerPage) }))}
                        paginationObject={paginationObject}
                        onPerPageChange={(perPage) => dispatch(getPagedMaterialGroups({ page: 1, perPage }))}
                    />
                </div>
            </div>
        </Panel>
    );
};

export default MaterialGroupList;
