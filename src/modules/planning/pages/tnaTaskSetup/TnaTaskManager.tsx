import React, { useCallback, useEffect, useState } from 'react';
import { ITnaTask } from './tnaTaskType.interface';
import { TnaTaskForm } from './TnaTaskForm';
import { AppDispatch, RootState } from '../../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setDropdownData } from '../../../../app/dropdownSlice';
import { fetchAllTnaTaskGroups } from '../../reduxSlices/tnaTaskGroupSlice';
import { Column } from '../../../../components/data-display/CustomDataTable';
import { MoreVertical } from 'react-feather';
import { bulkSaveTnaTaskTypeToIndexDB, clearTaskState, deleteTnaTaskTypesFromIDX, fetchAllTnaTaskTypes, fetchAllTnaTaskTypesFromIDX, setTnaTaskFieldByID, } from '../../reduxSlices/tnaTaskSlice';
import { SortableCustomDataTable } from '@/components/data-display/SortableCustomDataTable';
import Panel from '@/components/layout/Panel';
import PageHeader from '@/components/layout/PageHeader';
import { getAllPlanningWorkingTeam } from '../../reduxSlices/planningWorkingTeam.Slice';
import { DropdownMenu } from '@/components/form/DropdownMenu';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtils';
import IndexDBStatusIndicator from '@/components/feedback-interaction/IndexDBStatusIndicator';
import { useTheme } from '@/hooks/useTheme';
import { useDashboardActions } from '@/layouts/DashboardLayout';
import { ActionButtons, ActionType } from '@/components/layout/ActionButtons';

const TnaTaskManager: React.FC = () => {

    // --- ACTION BUTTON IN TOP NAVBAR  ---
    const { setActions } = useDashboardActions();
    const [isEditMode, setIsEditMode] = useState(false);

    const dispatch: AppDispatch = useDispatch();
    const { company, setCompany } = useTheme();
    const { tnaTaskGroups } = useSelector((state: RootState) => state.tnaTaskGroup);
    const { planWorkingTeams } = useSelector((state: RootState) => state.tnaTeam);
    const { tnaTasks, tnaTask, message, error, isIndexDBStoreUpdated } = useSelector((state: RootState) => state.tnaTask);
    const [tasks, setTasks] = useState<ITnaTask[]>([]);
    const [editRowIndex, setEditRowIndex] = useState<number>(-1);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [openDropdownId, setOpenDropdownId] = useState<string>("");

    // --- Action Button Handlers --- 
    const handleAction = useCallback(
        (action: ActionType) => {
            switch (action) {
                case "save":

                    break;

                case "update":

                    break;
                case "delete":
                    break;
                case "clear":
                    break;
                case "preview":
                    break;
            }
        },
        [dispatch, tnaTasks]
    );

    useEffect(() => {
        //debugger
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearTaskState());
        }

    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearTaskState());
        }

    }, [message]);

    useEffect(() => {
        document.title = "TNA Task Setup";
        // dispatch(fetchAllTnaTaskTypes());
        dispatch(getAllPlanningWorkingTeam())
        dispatch(fetchAllTnaTaskGroups())
        dispatch(fetchAllTnaTaskTypesFromIDX());
        // dispatch(fetchAllTnaTaskTypesFromIDX())
        // Optionally return a cleanup function if needed
        return () => {
            // Reset title or do other cleanup if needed
            document.title = "";
        };
    }, [dispatch]);

    useEffect(() => {
        if (!isIndexDBStoreUpdated) {
            dispatch(fetchAllTnaTaskTypes({ companyId: company?.companyId || 0 }));
        }

    }, [isIndexDBStoreUpdated]);

    useEffect(() => {
        dispatch(
            setDropdownData({
                name: 'tnaTaskTypes',
                data: tnaTasks,
                labelKey: 'taskName',
                valueKey: 'id',
            })
        );
        setTasks(tnaTasks)
    }, [tnaTasks]);

    useEffect(() => {
        dispatch(
            setDropdownData({
                name: 'tnaTaskGroups',
                data: tnaTaskGroups,
                labelKey: 'name',
                valueKey: 'id',
            })
        );
    }, [tnaTaskGroups]);

    useEffect(() => {
        dispatch(
            setDropdownData({
                name: 'planWorkingTeams',
                data: tnaTaskGroups,
                labelKey: 'teamName',
                valueKey: 'id',
            })
        );
    }, [planWorkingTeams]);

    const handleDeleteRow = (id: number, closeDropdown: () => void) => {
        dispatch(deleteTnaTaskTypesFromIDX({ id }))
        closeDropdown();
        setOpenDropdownId("");
    };

    const handleEditRow = (id: number, closeDropdown: () => void) => {
        dispatch(setTnaTaskFieldByID({ id }));
        closeDropdown();
        setOpenDropdownId("");
    };

    const detailsColumns: Column<ITnaTask>[] = [
        {
            key: "actions",
            header: "",
            width: 'w-[20px]',
            align: "center",
            render: (_item, index) => (
                <DropdownMenu
                    trigger={<MoreVertical size={16} />}
                    onClose={() => setOpenDropdownId("")} // optional, if you're tracking open IDs
                >
                    {({ closeDropdown }: { closeDropdown: () => void }) => (
                        <ul className="text-sm">
                            <li className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                <button
                                    onClick={() => {
                                        handleEditRow(_item.id, closeDropdown);
                                    }}
                                    className="block px-4 py-2 w-full cursor-pointer text-center"
                                >
                                    Edit
                                </button>
                            </li>
                            <li className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                <button
                                    onClick={() => {
                                        handleDeleteRow(_item.id, closeDropdown);
                                    }}
                                    className="block px-4 py-2 w-full cursor-pointer text-center"
                                >
                                    Delete
                                </button>
                            </li>
                        </ul>
                    )}
                </DropdownMenu>
            ),
        },
        { key: 'taskGroupName', header: 'Group Name', align: 'left', width: 'w-[100px]' },
        { key: 'taskName', header: 'Task Name', align: 'left' },
        { key: 'leadTime', header: 'L.T', align: 'left', width: 'w-[40px]' },
        { key: 'durationType', header: 'D.P', align: 'left', width: 'w-[100px]' },
        { key: 'dependOn', header: 'Depend On', align: 'left' },
    ];

    const handleSortedData = (sortedData: ITnaTask[]) => {
        dispatch(bulkSaveTnaTaskTypeToIndexDB([...sortedData]));
    };


    return (
        <>
            <Panel
                className='h-[calc(100vh-90px)]'
            >
                <IndexDBStatusIndicator sliceName="tnaTask" />

                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 ">
                    <div className="col-span-1 md:col-span-2 mt-4">
                        <TnaTaskForm />
                    </div>
                    <div className="col-span-1 md:col-span-4 ">
                        <SortableCustomDataTable
                            columns={detailsColumns}
                            data={tasks}
                            sortable
                            onSort={handleSortedData}
                            fixedHeight="h-[calc(100vh-120px)]"
                        />
                    </div>
                </div>
            </Panel>
        </>
    );
};

export default TnaTaskManager;
