import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from '@/app/store';
import { Column, CustomDataTable } from '@/components/data-display/CustomDataTable';
import { DropdownMenu } from '@/components/form/DropdownMenu';
import PageHeader from '@/components/layout/PageHeader';
import Panel from '@/components/layout/Panel';
import { useTheme } from "@/hooks/useTheme";
import { showErrorToast, showSuccessToast } from '@/utils/toastUtils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MoreVertical } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Link, } from 'react-router-dom';
import { clearPlanningWorkingTeamMessages, getPagedPlanningWorkingTeam, removePlanningWorkingTeam } from '../../reduxSlices/planningWorkingTeam.Slice';
import { IPlanningWorkingTeam } from './planningWorkingTeam.interface';
const PlanningWorkingTeamList = () => {

    const dispatch: AppDispatch = useDispatch();
    const { planningWorkingTeamList, paginationObject, error, message, loading } = useSelector((state: RootState) => state.planningWorkingTeam);
    const [openDropdownId, setOpenDropdownId] = useState<string>("");
 const { rowsPerPage, layout, company } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);
    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearPlanningWorkingTeamMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearPlanningWorkingTeamMessages());
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
        document.title = "PlanningWorkingTeam List";
        // dispatch(getPagedPlanningWorkingTeam({ perPage: Number(rowsPerPage) }));
        return () => {
            document.title = "";
        };
    }, [dispatch]);

    const handleDelete = async (id: number, closeDropdown: () => void) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            const resultAction = await dispatch(removePlanningWorkingTeam(id));
            if (removePlanningWorkingTeam.fulfilled.match(resultAction)) {
                // Delete success, now refetch
                dispatch(getPagedPlanningWorkingTeam({ perPage: Number(rowsPerPage) }));
                closeDropdown();
                setOpenDropdownId("");
            } else {
                // Optional: show error
                console.error("Failed to delete:", resultAction.payload);
            }
        }
    };

    const detailsColumns: Column<IPlanningWorkingTeam>[] = useMemo(() => [
        {
            key: "actions",
            header: "Action",
            width: "w-[10px]",
            align: "center",
            render: (_item: IPlanningWorkingTeam, index: number) => {
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
                                        to={`${webRoutes.PLANNING_WORKING_TEAM_SAVE}/${_item.id}`}
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
            header: "Id",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "userCode",
            header: "User Code",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "designation",
            header: "Designation",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "department",
            header: "Department",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "email",
            header: "Email",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "role",
            header: "Role",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "status",
            header: "Status",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "del",
            header: "Del",
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
                    title="Planning Working Team List"
                    buttonLabel="New Working Team"
                    buttonHref={webRoutes.PLANNING_WORKING_TEAM_SAVE}
                />
            }
        >
            {/* Bottom PlanningWorkingTeam: Full-width Table */}
            <div className="grid grid-cols-1 ">
                <div className="space-y-4 col-span-1">
                    <CustomDataTable
                        columns={detailsColumns}
                        data={planningWorkingTeamList}
                        columnsButton
                        loading={loading}
                        perPageDropdown
                        onPageChange={(page) => dispatch(getPagedPlanningWorkingTeam({ page, perPage: Number(rowsPerPage) }))}
                        paginationObject={paginationObject}
                        onPerPageChange={(perPage) => dispatch(getPagedPlanningWorkingTeam({ page: 1, perPage }))}
                    />
                </div>
            </div>
        </Panel>
    );
};

export default PlanningWorkingTeamList;
