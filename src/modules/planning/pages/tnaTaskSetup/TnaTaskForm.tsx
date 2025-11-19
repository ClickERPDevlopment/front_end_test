import React, { } from 'react';
import { ITnaTask } from './tnaTaskType.interface';
import { FormField } from '../../../../components/form/FormField';
import SelectDropdown from '../../../../components/form/SelectDropdown';
import SimpleInputBox from '../../../../components/form/SimpleInputBox';
import DropdownAutoSuggest from '../../../../components/form/DropdownAutoSuggest';
import Button from '../../../../components/form/Button';
import SmartForm from '../../../../components/form/SmartForm';
import { durationTypes } from '../../../../types/global';
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { bulkSaveTnaTaskTypeToIndexDB, bulkSaveToDB, clearTaskState, fetchAllTnaTaskTypesFromIDX, saveTnaTaskTypeToIndexDB, updateTnaTaskField } from '../../reduxSlices/tnaTaskSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { showErrorToast } from '@/utils/toastUtils';
import { useTheme } from '@/hooks/useTheme';

interface LeadTimeResult {
    id: number;
    taskName: string;
    leadTime: number;
}

export const TnaTaskForm: React.FC = () => {

    const taskOptions = [
        { value: "0", label: "" },
        { value: "1", label: "Sewing Start" },
        { value: "2", label: "Sewing End" },
        { value: "3", label: "Dyeing Start" },
        { value: "4", label: "Dyeing End" },
        { value: "5", label: "Knitting Start" },
        { value: "6", label: "Knitting End" },
        { value: "7", label: "Yarn Start" },
        { value: "8", label: "Yarn End" },
    ];
    const dispatch: AppDispatch = useDispatch();
    const { company, setCompany } = useTheme();
    const { tnaTask, tnaTasks, isUpdateMode, validationErrors } = useSelector((state: RootState) => state.tnaTask);
    const { planningWorkingTeamList } = useSelector((state: RootState) => state.planningWorkingTeam);
    const { tnaTaskGroups } = useSelector((state: RootState) => state.tnaTaskGroup);

    const handleChange = (key: keyof ITnaTask, value: string, displayVal?: string) => {
        dispatch(
            updateTnaTaskField({
                key,
                value,
                displayVal
            })
        );
    };

    const validations: { condition: boolean; message: string }[] = [
        { condition: tnaTasks.length === 0 && tnaTask.leadTime === 0, message: "Please set lead time" },
        { condition: tnaTask.taskName === "", message: "Please set task name" },
        { condition: tnaTasks.length > 2 && tnaTask.durationType === "", message: "Please set duration type" },
        { condition: tnaTasks.length > 2 && tnaTask.offsetTime === 0, message: "Please set offset time" },
        { condition: tnaTask.teamId === 0, message: "Please set team" },
        { condition: tnaTask.taskGroupId === 0, message: "Please set task group" },
    ];

    const handleAddTask = async () => {
        for (const v of validations) {
            if (v.condition) {
                showErrorToast(v.message);
                return; // stop at first error
            }
        }

        // Calculate new ID based on max existing ID
        const maxId = tnaTasks.length > 0 ? Math.max(...tnaTasks.map(t => t.id)) : 0;
        const newTaskId = maxId + 1;

        // Create new task with assigned ID
        const newTask: ITnaTask = {
            ...tnaTask,
            id: newTaskId,
            sortBy: tnaTasks.length + 1, // Increment sortBy based on current tasks
            isSwStart: tnaTask.taskType === "1" ? "1" : "0",
            isYarnStart: tnaTask.taskType === "7" ? "1" : "0",
            isKnittingStart: tnaTask.taskType === "5" ? "1" : "0",
            isDyeingStart: tnaTask.taskType === "3" ? "1" : "0",
            isYarnEnd: tnaTask.taskType === "8" ? "1" : "0",
            isKnittingEnd: tnaTask.taskType === "6" ? "1" : "0",
            isDyeingEnd: tnaTask.taskType === "4" ? "1" : "0",
            isSwEnd: tnaTask.taskType === "2" ? "1" : "0",
            standardDuration: tnaTasks.length === 0 ? tnaTask.leadTime : tnaTasks[0].standardDuration,
            isStart: tnaTasks.length === 0 ? "1" : "0", // First task is always a start task
            isEnd: tnaTasks.length === 1 ? "1" : "0", // First task is always an end task
            leadTime: tnaTasks.length === 0 ? tnaTask.leadTime : 0
        };

        // Calculate lead time starting from this new task
        const leadTimeResults = calculateLeadTimesFromTask([...tnaTasks, newTask], newTaskId, newTask);
        // Safely extract leadTime (default to 0 if missing)
        const newLeadTime = leadTimeResults.length > 0 ? leadTimeResults[0].leadTime : 0;
        // Combine newTask with calculated leadTime
        const taskWithLeadTime = { ...newTask, leadTime: newLeadTime };
        // Wait for the first dispatch to complete
        await dispatch(saveTnaTaskTypeToIndexDB(taskWithLeadTime));
        // Then dispatch the next one
        await dispatch(fetchAllTnaTaskTypesFromIDX());
        dispatch(clearTaskState());
    };

    const handleUpdateTask = () => {
        // Find the existing task
        const existingTask = tnaTasks.find(t => t.id === tnaTask.id);
        if (!existingTask) return; // No match, nothing to update

        // Merge changes into existing task
        const mergedTask: ITnaTask = {
            ...existingTask,
            ...tnaTask,
            isSwStart: tnaTask.taskType === "1" ? "1" : "0",
            isYarnStart: tnaTask.taskType === "7" ? "1" : "0",
            isKnittingStart: tnaTask.taskType === "5" ? "1" : "0",
            isDyeingStart: tnaTask.taskType === "3" ? "1" : "0",
            isYarnEnd: tnaTask.taskType === "8" ? "1" : "0",
            isKnittingEnd: tnaTask.taskType === "6" ? "1" : "0",
            isDyeingEnd: tnaTask.taskType === "4" ? "1" : "0",
            isSwEnd: tnaTask.taskType === "2" ? "1" : "0",
        };

        // Recalculate lead times for this task AND all dependents
        const leadTimeResults = calculateLeadTimesFromTask(
            tnaTasks.map(t => (t.id === mergedTask.id ? mergedTask : t)),
            mergedTask.id,
            mergedTask
        );

        // Create an updated tasks list by applying new leadTimes
        const updatedTasks = tnaTasks.map(task => {
            const result = leadTimeResults.find(r => r.id === task.id);
            if (result) {
                return {
                    ...task,
                    leadTime: result.leadTime,
                };
            }
            return task;
        });

        // Replace the updated task entry
        const finalTasks = updatedTasks.map(t =>
            t.id === mergedTask.id
                ? { ...mergedTask, leadTime: t.leadTime } // keep recalculated leadTime
                : t
        );
        dispatch(bulkSaveTnaTaskTypeToIndexDB(finalTasks));
        dispatch(clearTaskState());
    };

    function calculateLeadTimesFromTask(
        taskList: ITnaTask[],
        startTaskId: number,
        newTask: ITnaTask
    ): LeadTimeResult[] {
        const leadTimeMap: Record<number, number> = {};

        // Calculate lead time for a single task by looking up dependency lead time
        const calculate = (taskId: number, startTaskId2: number, newTask: ITnaTask): number => {
            if (leadTimeMap[taskId] !== undefined) return leadTimeMap[taskId];

            const task = taskId === startTaskId2 ? newTask : taskList.find(t => t.id === taskId);
            if (!task) return 0;

            const isForward = task.durationType === 'Forward(-)';
            const dependentId = isForward ? task.dependentTaskFrontId : task.dependentTaskBackId;

            if (dependentId === null) {
                leadTimeMap[task.id] = task.leadTime;
                return task.leadTime;
            }

            const dependencyLeadTime = calculate(dependentId, startTaskId2, newTask);
            const offset = task.offsetTime;

            const leadTime = isForward
                ? dependencyLeadTime - offset
                : dependencyLeadTime + offset;

            leadTimeMap[task.id] = Math.abs(leadTime);
            return Math.abs(leadTime);
        };

        // Recursively find tasks that depend on the current taskId
        const results: LeadTimeResult[] = [];
        const visited = new Set<number>();

        const dfs = (taskId: number, startTaskId3: number, newTask: ITnaTask) => {
            if (visited.has(taskId)) return;
            visited.add(taskId);

            // Calculate lead time for this task
            const leadTime = calculate(taskId, startTaskId3, newTask);

            const task = taskId === startTaskId3 ? newTask : taskList.find(t => t.id === taskId);
            if (task) {
                results.push({ id: task.id, taskName: task.taskName, leadTime });
            }

            // Find tasks that depend on this task (reverse dependency)
            const dependents = taskList.filter(t => {
                const isForward = t.durationType === 'Forward(-)';
                const depId = isForward ? t.dependentTaskFrontId : t.dependentTaskBackId;
                return depId === taskId;
            });

            for (const depTask of dependents) {
                dfs(depTask.id, startTaskId3, newTask);
            }
        };

        dfs(startTaskId, startTaskId, newTask);

        return results;
    }

    const handleSave = async () => {
        // Validate the current task}
        await dispatch(bulkSaveToDB({ companyId: company?.companyId || 0, tasks: tnaTasks }));
    }

    return (
        <div>
            <div className="grid ">
                <FormField
                    label="Lead Time"
                    id="leadTime" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox
                        value={tnaTask.leadTime.toString()}
                        onChange={(val) => handleChange("leadTime", val)}
                        type="number"
                        disabled={tnaTasks.length > 0}
                        className=" "
                    />
                </FormField>
                <FormField
                    label="Task Name"
                    id="taskName" variant="inline"
                    required labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox
                        value={tnaTask.taskName.toString()}
                        onChange={(val) => handleChange("taskName", val)}
                        type="text"
                        className=" w-full"
                    />
                </FormField>
                <FormField
                    label="Dependency Pattern"
                    id="floor" variant="inline"
                    required labelFontSize="text-xs"
                    labelWidth="w-[100px]"
                >
                    <SelectDropdown
                        // ref={ref}
                        disabled={tnaTasks.length < 2}
                        options={durationTypes}
                        value={tnaTask.durationType}
                        isSameKeyValue={true}
                        onChange={(val) => handleChange("durationType", val)}
                        className=" w-full"
                    // onKeyDown={handleKeyDown}
                    />
                </FormField>
                <FormField
                    label="Forward Task"
                    id="style"
                    variant="inline"
                    required
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <DropdownAutoSuggest
                        className=""
                        name="tnaTaskTypes"
                        inputWidth={200}
                        disabled={!(tnaTasks.length > 1 && tnaTask.durationType !== "Backward(+)")}
                        value={tnaTask.dependentTaskFront?.toString() || ""}
                        onSelect={(val, displayVal) => handleChange('dependentTaskFrontId', val, displayVal)} />
                </FormField>
                <FormField
                    label="Backward Task" id="style" variant="inline" required labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <DropdownAutoSuggest
                        className=""
                        name="tnaTaskTypes"
                        inputWidth={200}
                        disabled={!(tnaTasks.length > 1 && tnaTask.durationType !== "Forward(-)")}
                        value={tnaTask.dependentTaskBack?.toString() || ""}
                        onSelect={(val, displayVal) => handleChange('dependentTaskBackId', val, displayVal)} />
                </FormField>
                <FormField
                    label="Offset Time"
                    id="offsetTime" variant="inline"
                    required labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox
                        value={tnaTask.offsetTime.toString()}
                        onChange={(val) => handleChange("offsetTime", val)}
                        type="number"
                        disabled={tnaTasks.length < 2}
                        className=" w-full"
                    />
                </FormField>
                <FormField
                    label="Responsible Team"
                    id="teamId" variant="inline"
                    required labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SelectDropdown
                        // ref={ref}
                        options={planningWorkingTeamList}
                        value={tnaTask.teamId.toString()}
                        isSameKeyValue={false}
                        labelKey='teamName'
                        valueKey='id'
                        onChange={(val) => handleChange("teamId", val)}
                        className=" w-full"
                    // onKeyDown={handleKeyDown}
                    />
                </FormField>
                <FormField
                    label="Task Group"
                    id="taskGroupId" variant="inline"
                    required labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SelectDropdown
                        // ref={ref}
                        options={tnaTaskGroups}
                        value={tnaTask.taskGroupId.toString()}
                        isSameKeyValue={false}
                        labelKey='name'
                        valueKey='id'
                        onChange={(val, item) => handleChange("taskGroupId", val, item?.name)}
                        className=" w-full"
                    // onKeyDown={handleKeyDown}
                    />
                </FormField>
                <FormField
                    label="Task Type"
                    id="taskGroupId" variant="inline"
                    required labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SelectDropdown
                        // ref={ref}
                        options={taskOptions}
                        value={tnaTask.taskType}
                        isSameKeyValue={false}
                        labelKey='label'
                        valueKey='value'
                        onChange={(val) => handleChange("taskType", val)}
                        className=" w-full"
                    // onKeyDown={handleKeyDown}
                    />
                </FormField>
            </div>

            <div className='flex gap-3 float-end mt-3'>
                {/* <Button onClick={handleSave} size="sm" >
                    <FontAwesomeIcon icon={faSave} /> Save
                </Button> */}

                {
                    isUpdateMode ?
                        <Button onClick={handleUpdateTask} size="sm" >
                            <FontAwesomeIcon icon={faEdit} /> Update
                        </Button>
                        :
                        <Button onClick={handleAddTask} size="sm" >
                            <FontAwesomeIcon icon={faAdd} /> Add
                        </Button>

                }
                <Button onClick={handleAddTask} variant='outlined'
                    size="sm" className='bg-amber-50 text-black' >
                    <FontAwesomeIcon icon={faEraser} /> Clear
                </Button>
            </div>
        </div>
    );
};
