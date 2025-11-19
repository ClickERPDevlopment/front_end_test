import PageHeader from '@/components/layout/PageHeader';
import Panel from '@/components/layout/Panel';
import Tabs from '@/components/layout/Tabs';
import { useTheme } from '@/hooks/useTheme';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtils';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDropdownData } from '../../../../app/dropdownSlice';
import { AppDispatch, RootState } from '../../../../app/store';
import { getAllPlanningWorkingTeam } from '../../reduxSlices/planningWorkingTeam.Slice';
import { fetchTnaCriticalPendingJobListFromIDX, fetchTnaJobList, fetchTnaMissingActualDateTaskList, fetchTnaMissingActualDateTaskListFromIDX, fetchTnaPendingJobBuyerStyleTaskList, fetchTnaPendingJobList, fetchTnaPendingJobListFromIDX, fetchTnaPendingRequestList, fetchTnaPendingRequestListFromIDX } from '../../reduxSlices/tnaSlice';
import { fetchAllTnaTaskGroups } from '../../reduxSlices/tnaTaskGroupSlice';
import { clearTaskState, fetchAllTnaTaskTypes, fetchAllTnaTaskTypesFromIDX } from '../../reduxSlices/tnaTaskSlice';
import TnaDashboardCriticalJobList from './TnaDashboardCriticalJobList';
import TnaDashboardJobList from './TnaDashboardJobList';
import TnaDashboardMissingActualDateList from './TnaDashboardMissingActualDateList';
import TnaDashboardRequestList from './TnaDashboardRequestList';

const TnaDashboard: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();
    const { company, hash } = useTheme();
    const { tnaTaskGroups } = useSelector((state: RootState) => state.tnaTaskGroup);
    const { planWorkingTeams } = useSelector((state: RootState) => state.tnaTeam);
    const { tnaTasks, tnaTask, message, error,
        isIndexDBStoreUpdated } = useSelector((state: RootState) => state.tnaTask);
    const { isTnaPendingJobSavedToIndexDB,
        isTnaMissingActualDateSavedToIndexDB,
        isTnaPendingRequestSavedToIndexDB,
        pendingJobs,
        criticalPendingJobs,
        pendingRequests,
        missingActualDateTaskList
    } = useSelector((state: RootState) => state.tna);


    useEffect(() => {
        console.log("Current hash:", hash);
        dispatch(fetchTnaPendingJobListFromIDX());
        if (hash === "#job-list") {
            if (!isTnaPendingJobSavedToIndexDB) {
                dispatch(fetchTnaJobList());
                dispatch(fetchTnaPendingJobBuyerStyleTaskList());
                dispatch(fetchTnaPendingJobList());
            } else {
                dispatch(fetchTnaPendingJobListFromIDX());
            }
        } else if (hash === "#request-list") {

            if (!isTnaPendingRequestSavedToIndexDB) {
                dispatch(fetchTnaPendingRequestList());
            } else {
                dispatch(fetchTnaPendingRequestListFromIDX());
            }
        } else if (hash === "#missing-actual-date") {
            if (!isTnaMissingActualDateSavedToIndexDB) {
                dispatch(fetchTnaMissingActualDateTaskList());
            } else {
                dispatch(fetchTnaMissingActualDateTaskListFromIDX());
            }

        } else if (hash === "#critical-job-list") {
            dispatch(fetchTnaCriticalPendingJobListFromIDX());
        }
    }, [hash]);

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
        document.title = "TNA Dashboard";
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

    return (
        <Panel
            header={<PageHeader title="TNA Dashboard" />}
        >
            <div className='w-full'>
                <Tabs
                    variant="underline"
                    tabs={[
                        {
                            label: "Job List",
                            href: "job-list",
                            count: pendingJobs.length,
                            content: (
                                <TnaDashboardJobList />
                            )
                        },
                        {
                            label: "Request List",
                            href: "request-list",
                            count: pendingRequests.length,
                            content: (
                                <TnaDashboardRequestList />
                            )
                        },
                        {
                            label: "Missing Actual Date",
                            href: "missing-actual-date",
                            count: missingActualDateTaskList.length,
                            content: (
                                <TnaDashboardMissingActualDateList />
                            )
                        },
                        {
                            label: "Critical Job List",
                            href: "critical-job-list",
                            count: criticalPendingJobs.length,
                            content: (
                                <TnaDashboardCriticalJobList />
                            )
                        },
                    ]}
                />
            </div>
        </Panel>
    );
};

export default TnaDashboard;
