import React, { useCallback, useEffect, useState } from 'react';
import { ITnaDetails } from './tna.interface';
import { TnaForm } from './TnaForm';
import { AppDispatch, RootState } from '../../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setDropdownData } from '../../../../app/dropdownSlice';
import { fetchAllTnaTaskGroups } from '../../reduxSlices/tnaTaskGroupSlice';
import { Column, CustomDataTable } from '../../../../components/data-display/CustomDataTable';
import { clearTnaTemplateState, deleteTnaTemplateTask, fetchAllTnaTemplate, setTnaTaskFieldByIndex } from '../../reduxSlices/tnaTemplateSlice';
import Panel from '@/components/layout/Panel';
import PageHeader from '@/components/layout/PageHeader';
import { getAllPlanningWorkingTeam } from '../../reduxSlices/planningWorkingTeam.Slice';
import { fetchAllTnaTaskTypes } from '../../reduxSlices/tnaTaskSlice';
import { useTheme } from '@/hooks/useTheme';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtils';
import CustomDatePicker from '@/components/form/CustomDatePicker';
import { formatDate } from '@/utils/dateUtil';
import { fetchAllCompanies } from '@/modules/configurations/reduxSlices/companySlice';
import dummyData from './dummy.json'
import { DurationType } from '@/types/global';
import { setTnaDateChange, setTnaDetails } from '../../reduxSlices/tnaSlice';
import { useDashboardActions } from '@/layouts/DashboardLayout';
import { ActionButtons, ActionType } from '@/components/layout/ActionButtons';
import Checkbox from '@/components/form/Checkbox';



const TnaManager: React.FC = () => {
    
    // --- ACTION BUTTON IN TOP NAVBAR  ---
    const { setActions } = useDashboardActions();
    const [isEditMode, setIsEditMode] = useState(false);

    const dispatch: AppDispatch = useDispatch();
    const { tnaTaskGroups } = useSelector((state: RootState) => state.tnaTaskGroup);
    const { planWorkingTeams } = useSelector((state: RootState) => state.tnaTeam);
    const { tnaList, tna, loading, message, error, tnaTaskList } = useSelector((state: RootState) => state.tna);

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
        [dispatch, tna]
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
        // setLocalTnaTasks(tnaTaskList);  
    }, [tnaTaskList]);

    useEffect(() => {
        document.title = "TNA Setup";
        // dispatch(getAllPlanningWorkingTeam())
        // dispatch(fetchAllTnaTaskGroups())
        // dispatch(fetchAllTnaTaskTypes({ companyId: company?.companyId || 0 }));
        dispatch(fetchAllTnaTemplate({ companyId: company?.companyId || 0 }))
        // dispatch(fetchAllCompanies())
        // dispatch(setTnaDetails({ data: tnaTaskList2 }))
        // Optionally return a cleanup function if needed
        return () => {
            // Reset title or do other cleanup if needed
            document.title = "";
        };
    }, [dispatch]);

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

    const handleChange = (field: keyof ITnaDetails, value: any) => {

    }

    const detailsColumns: Column<ITnaDetails>[] = [
        { key: 'taskName', header: 'Task Name', align: 'left', width: 'w-[200px]', },
        {
            key: 'presetDate', header: 'Preset Date', align: 'left', width: 'w-[60px]',
            render: (_item, index) => (
                <>{_item.p_date_db_real ? formatDate(new Date(_item.p_date_db_real).toLocaleDateString(), "dd-MMM-yyyy") : ""}</>
            ),
        },
        {
            key: 'changingDate', header: 'Changing Date', align: 'left', width: 'w-[60px]', paddingNone: true,
            render: (_item, index) => (
                <CustomDatePicker colored
                    onChange={(date) => changeDate(index, date ?? null)}
                    selected={_item.p_date_db_real ? new Date(_item.p_date_db_real) : null}
                    dateFormat='dd-MMM-yyyy'
                />
            ),
        },
        { key: 'isDependentChangeBy', header: '', align: 'left', width: 'w-[20px]',
            render: (_item, index) => (
                <Checkbox size='small'
                    checked
                    onChange={(val) => console.log()}
                />
            ),
         },
    ];


    const changeDate = (index: number, newDate: Date | null) => {
        dispatch(setTnaDateChange({ newDate: formatDate(newDate?.toLocaleDateString() || "", "db_format"), index }))
    };

    return (
        <>

            <Panel
                className='h-[calc(100vh-100px)]'
            >
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    <div className="col-span-1 md:col-span-2 mt-4">
                        <TnaForm />
                    </div>

                    <div className="col-span-1 md:col-span-4 mt-4 h-[calc(100vh-100px)]">

                        <CustomDataTable
                            columns={detailsColumns}
                            data={tnaTaskList}
                            loading={loading}
                            fixedHeight="h-full"
                        />
                    </div>
                </div>

            </Panel>

        </>
    );
};

export default TnaManager;
