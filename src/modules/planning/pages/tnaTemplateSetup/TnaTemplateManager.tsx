import React, { useCallback, useEffect, useState } from 'react';
import { ITnaTemplateTask } from './tnaTemplate.interface';
import { TnaTemplateForm } from './TnaTemplateForm';
import { AppDispatch, RootState } from '../../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setDropdownData } from '../../../../app/dropdownSlice';
import { fetchAllTnaTaskGroups } from '../../reduxSlices/tnaTaskGroupSlice';
import { Column } from '../../../../components/data-display/CustomDataTable';
import { DropdownButton } from '../../../../components/form/DropdownButton';
import { MoreVertical } from 'react-feather';
import { bulkSaveTnaTemplateTaskToIndexDB, clearTnaTemplateState, deleteTnaTemplateTask, fetchAllTnaTemplate, setTnaTaskFieldByIndex } from '../../reduxSlices/tnaTemplateSlice';
import { SortableCustomDataTable } from '@/components/data-display/SortableCustomDataTable';
import Panel from '@/components/layout/Panel';
import PageHeader from '@/components/layout/PageHeader';
import { getAllPlanningWorkingTeam } from '../../reduxSlices/planningWorkingTeam.Slice';
import { fetchAllTnaTaskTypes } from '../../reduxSlices/tnaTaskSlice';
import { useTheme } from '@/hooks/useTheme';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtils';
import { ActionButtons, ActionType } from '@/components/layout/ActionButtons';
import { useDashboardActions } from '@/layouts/DashboardLayout';

const TnaTemplateManager: React.FC = () => {
    // --- ACTION BUTTON IN TOP NAVBAR  ---
    const { setActions } = useDashboardActions();
    const [isEditMode, setIsEditMode] = useState(false);

    const dispatch: AppDispatch = useDispatch();
    const { tnaTaskGroups } = useSelector((state: RootState) => state.tnaTaskGroup);
    const { planWorkingTeams } = useSelector((state: RootState) => state.tnaTeam);
    const { tnaTemplateTasks, tnaTemplate, loading, message, error } = useSelector((state: RootState) => state.tnaTemplate);

    const [tasks, setTasks] = useState<ITnaTemplateTask[]>([]);
    const [editRowIndex, setEditRowIndex] = useState<number>(-1);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const { company } = useTheme();


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
        [dispatch, tnaTemplateTasks]
    );

    useEffect(() => {
        //debugger
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearTnaTemplateState());
        }

    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearTnaTemplateState());
        }

    }, [message]);

    useEffect(() => {
        document.title = "TNA Template Setup";
        dispatch(getAllPlanningWorkingTeam())
        dispatch(fetchAllTnaTaskGroups())
        dispatch(fetchAllTnaTaskTypes({ companyId: company?.companyId || 0 }));
        dispatch(fetchAllTnaTemplate({ companyId: company?.companyId || 0 }))

        // Optionally return a cleanup function if needed
        return () => {
            // Reset title or do other cleanup if needed
            document.title = "";
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            setDropdownData({
                name: 'tnaTaskTypes',
                data: tnaTemplateTasks,
                labelKey: 'taskName',
                valueKey: 'id',
            })
        );
        setTasks(tnaTemplateTasks)
    }, [tnaTemplateTasks]);

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

    const handleDeleteRow = (id: number) => {
        dispatch(deleteTnaTemplateTask(id))
    };

    const handleEditRow = (index: number) => {
        dispatch(setTnaTaskFieldByIndex({ index }))
    };

    const detailsColumns: Column<ITnaTemplateTask>[] = [
        {
            key: "actions",
            header: "",
            width: "w-[40px]",
            align: "center",
            render: (_item, index) => (
                <DropdownButton
                    icon={<MoreVertical size={16} />}
                    size="sm"
                    className="bg-transparent border-none"
                    label=""
                >
                    <ul className="text-sm">
                        <li
                            onClick={() => handleEditRow(index)}
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Edit
                        </li>
                        <li
                            onClick={() => handleDeleteRow(_item.id)}
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Delete
                        </li>
                    </ul>
                </DropdownButton>
            ),
        },
        { key: 'taskGroupName', header: 'Group Name', align: 'left', width: 'w-[100px]' },
        { key: 'taskName', header: 'Task Name', align: 'left' },
        { key: 'offsetTime', header: 'O.T', align: 'left', width: 'w-[40px]' },
        { key: 'leadTime', header: 'L.T', align: 'left', width: 'w-[40px]' },
        { key: 'durationType', header: 'D.P', align: 'left', width: 'w-[40px]' },
        { key: 'dependOn', header: 'Depend On', align: 'left' },
    ];

    const handleSortedData = (sortedData: ITnaTemplateTask[]) => {

        dispatch(bulkSaveTnaTemplateTaskToIndexDB([...sortedData]));
    };


    return (
        <>

            <Panel
                className='h-[calc(100vh-100px)]'
            >
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    <div className="col-span-1 md:col-span-2 mt-4">
                        <TnaTemplateForm />
                    </div>
                    <div className="col-span-1 md:col-span-4">
                        <SortableCustomDataTable
                            columns={detailsColumns}
                            data={tasks}
                            sortable
                            loading={loading}
                            onSort={handleSortedData}
                            fixedHeight="h-[calc(100vh-120px)]"
                        />
                    </div>
                </div>

            </Panel>

        </>
    );
};

export default TnaTemplateManager;
