import React, { useEffect, useState } from 'react';
import { ITnaTemplateMaster, ITnaTemplateTask } from './tnaTemplate.interface';
import { FormField } from '../../../../components/form/FormField';
import SelectDropdown from '../../../../components/form/SelectDropdown';
import SimpleInputBox from '../../../../components/form/SimpleInputBox';
import DropdownAutoSuggest from '../../../../components/form/DropdownAutoSuggest';
import Button from '../../../../components/form/Button';
import SmartForm from '../../../../components/form/SmartForm';
import { durationTypes } from '../../../../types/global';
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import {
    bulkSaveTnaTemplateTaskToIndexDB, bulkTemplateTaskSaveToDB, clearTnaTemplateState, fetchAllTnaTemplateDetailsFromIDX,
    fetchTnaTemplateDetail,
    fetchTnaTemplateDetailsByLeadTime, saveTnaTemplateDetailToIndexDB, updateTnaTemplateTaskField
} from '../../reduxSlices/tnaTemplateSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/hooks/useTheme';
import { showErrorToast } from '@/utils/toastUtils';
import { setDropdownData } from '@/app/dropdownSlice';


interface LeadTimeResult {
    id: number;
    taskName: string;
    leadTime: number;
}

export const TnaTemplateForm: React.FC = () => {
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
    const { tnaTemplate, tnaTemplateTask, tnaTemplates,
        tnaTemplateTasks, isUpdateMode, templateName } = useSelector((state: RootState) => state.tnaTemplate);
    const { planningWorkingTeamList } = useSelector((state: RootState) => state.planningWorkingTeam);
    const { tnaTaskGroups } = useSelector((state: RootState) => state.tnaTaskGroup);
    const { company } = useTheme();
    const [selectedTemplate, setTemplate] = useState<{ id: number; name: string; code?: string } | null>(null);


    useEffect(() => {
        dispatch(
            setDropdownData({
                name: 'tnaTemplates',
                data: tnaTemplates,
                labelKey: 'name',
                valueKey: 'id',
            })
        );
    }, [tnaTemplates])

    useEffect(() => {
        if (selectedTemplate) {
            dispatch(fetchTnaTemplateDetail({ id: String(selectedTemplate.id) }))
        }
    }, [selectedTemplate])

    const handleChange = (key: keyof ITnaTemplateTask, value: string, displayVal?: string) => {
        dispatch(
            updateTnaTemplateTaskField({
                key,
                value,
                displayVal
            })
        );
    };

    const handleKeydown = (key: keyof ITnaTemplateTask, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            dispatch(
                fetchTnaTemplateDetailsByLeadTime({ leadTime: tnaTemplateTask.leadTime, companyId: Number(company?.companyId) })
            );
        }
    }

    const validations: { condition: boolean; message: string }[] = [
        { condition: tnaTemplateTasks.length === 0 && tnaTemplateTask.leadTime === 0, message: "Please set lead time" },
        { condition: tnaTemplateTask.taskName === "", message: "Please set task name" },
        { condition: tnaTemplateTasks.length > 2 && tnaTemplateTask.durationType === "", message: "Please set duration type" },
        { condition: tnaTemplateTasks.length > 2 && tnaTemplateTask.offsetTime === 0, message: "Please set offset time" },
        { condition: tnaTemplateTask.teamId === 0, message: "Please set team" },
        { condition: tnaTemplateTask.taskGroupId === 0, message: "Please set task group" },
    ];

    const handleAddTask = async () => {
        for (const v of validations) {
            if (v.condition) {
                showErrorToast(v.message);
                return; // stop at first error
            }
        }

        // Calculate new ID based on max existing ID
        const maxId = tnaTemplateTasks.length > 0 ? Math.max(...tnaTemplateTasks.map(t => t.id)) : 0;
        const newTaskId = maxId + 1;

        // Create new task with assigned ID
        const newTask: ITnaTemplateTask = {
            ...tnaTemplateTask,
            id: newTaskId,
            sortBy: tnaTemplateTasks.length + 1, // Increment sortBy based on current tasks
            isSwStart: tnaTemplateTask.taskType === "1" ? "1" : "0",
            isYarnStart: tnaTemplateTask.taskType === "7" ? "1" : "0",
            isKnittingStart: tnaTemplateTask.taskType === "5" ? "1" : "0",
            isDyeingStart: tnaTemplateTask.taskType === "3" ? "1" : "0",
            isYarnEnd: tnaTemplateTask.taskType === "8" ? "1" : "0",
            isKnittingEnd: tnaTemplateTask.taskType === "6" ? "1" : "0",
            isDyeingEnd: tnaTemplateTask.taskType === "4" ? "1" : "0",
            isSwEnd: tnaTemplateTask.taskType === "2" ? "1" : "0",
            standardDuration: tnaTemplateTasks.length === 0 ? tnaTemplateTask.leadTime : tnaTemplateTasks[0].standardDuration,
            isStart: tnaTemplateTasks.length === 0 ? "1" : "0", // First task is always a start task
            isEnd: tnaTemplateTasks.length === 1 ? "1" : "0", // First task is always an end task
            leadTime: tnaTemplateTasks.length === 0 ? tnaTemplateTask.leadTime : 0
        };

        // Calculate lead time starting from this new task
        const leadTimeResults = calculateLeadTimesFromTask([...tnaTemplateTasks, newTask], newTaskId, newTask);
        // Safely extract leadTime (default to 0 if missing)
        const newLeadTime = leadTimeResults.length > 0 ? leadTimeResults[0].leadTime : 0;
        // Combine newTask with calculated leadTime
        const taskWithLeadTime = { ...newTask, leadTime: newLeadTime };
        // Wait for the first dispatch to complete
        await dispatch(saveTnaTemplateDetailToIndexDB(taskWithLeadTime));
        // Then dispatch the next one
        await dispatch(fetchAllTnaTemplateDetailsFromIDX());
        dispatch(clearTnaTemplateState());
    };

    const handleUpdateTask = () => {
        // Find the existing task
        const existingTask = tnaTemplateTasks.find(t => t.id === tnaTemplateTask.id);
        if (!existingTask) return; // No match, nothing to update

        // Merge changes into existing task
        const mergedTask: ITnaTemplateTask = {
            ...existingTask,
            ...tnaTemplateTask,
            isSwStart: tnaTemplateTask.taskType === "1" ? "1" : "0",
            isYarnStart: tnaTemplateTask.taskType === "7" ? "1" : "0",
            isKnittingStart: tnaTemplateTask.taskType === "5" ? "1" : "0",
            isDyeingStart: tnaTemplateTask.taskType === "3" ? "1" : "0",
            isYarnEnd: tnaTemplateTask.taskType === "8" ? "1" : "0",
            isKnittingEnd: tnaTemplateTask.taskType === "6" ? "1" : "0",
            isDyeingEnd: tnaTemplateTask.taskType === "4" ? "1" : "0",
            isSwEnd: tnaTemplateTask.taskType === "2" ? "1" : "0",
        };

        // Recalculate lead times for this task AND all dependents
        const leadTimeResults = calculateLeadTimesFromTask(
            tnaTemplateTasks.map(t => (t.id === mergedTask.id ? mergedTask : t)),
            mergedTask.id,
            mergedTask
        );

        // Create an updated tasks list by applying new leadTimes
        const updatedTasks = tnaTemplateTasks.map(task => {
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
        dispatch(bulkSaveTnaTemplateTaskToIndexDB(finalTasks));
        dispatch(clearTnaTemplateState());
    };

    function calculateLeadTimesFromTask(
        taskList: ITnaTemplateTask[],
        startTaskId: number,
        newTask: ITnaTemplateTask
    ): LeadTimeResult[] {
        const leadTimeMap: Record<number, number> = {};

        // Calculate lead time for a single task by looking up dependency lead time
        const calculate = (taskId: number, startTaskId2: number, newTask: ITnaTemplateTask): number => {
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

        const dfs = (taskId: number, startTaskId3: number, newTask: ITnaTemplateTask) => {
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
        if (templateName === "") {
            showErrorToast("Please Set Template Name");
            return;
        }

        await dispatch(bulkTemplateTaskSaveToDB({ companyId: company?.companyId || 0, tasks: tnaTemplateTasks, templateName }));
    }

    const handleClear = () => {
        setTemplate(null);
        dispatch(clearTnaTemplateState())
    }

    return (
        <SmartForm >
            <div className="grid ">
                <FormField
                    label="Lead Time"
                    id="leadTime" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox
                        value={tnaTemplateTask.leadTime.toString()}
                        onChange={(val) => handleChange("leadTime", val)}
                        onKeyDown={(val) => handleKeydown("leadTime", val)}
                        type="number"
                        className=" "
                    />
                </FormField>

                <FormField
                    label="Search Template"
                    id="setectedTemplate"
                    variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]"
                >
                    <DropdownAutoSuggest
                        className="h-8"
                        name="tnaTemplates"
                        inputWidth={200}
                        value={selectedTemplate?.name}
                        onSelect={(val, displayVal) =>
                            setTemplate({ id: val, name: displayVal })
                        } />
                </FormField>

                <FormField
                    label="Template Name"
                    id="templateName" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox
                        value={templateName.toString()}
                        onChange={(val) => handleChange("templateName", val)}
                        type="text"
                        className=" "
                    />
                </FormField>
                <FormField
                    label="Task Name"
                    id="taskName" variant="inline"
                    required labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox
                        value={tnaTemplateTask.taskName.toString()}
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
                        disabled={tnaTemplateTasks.length < 2}
                        options={durationTypes}
                        value={tnaTemplateTask.durationType}
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
                        disabled={!(tnaTemplateTasks.length > 1 && tnaTemplateTask.durationType !== "Backward(+)")}
                        value={tnaTemplateTask.dependentTaskFront?.toString()}
                        onSelect={(val, displayVal) => handleChange('dependentTaskFrontId', val, displayVal)} />
                </FormField>
                <FormField label="Backward Task" id="style" variant="inline" required labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <DropdownAutoSuggest
                        className=""
                        name="tnaTaskTypes"
                        inputWidth={200}
                        disabled={!(tnaTemplateTasks.length > 1 && tnaTemplateTask.durationType !== "Forward(-)")}
                        value={tnaTemplateTask.dependentTaskBack?.toString()}
                        onSelect={(val, displayVal) => handleChange('dependentTaskBackId', val, displayVal)} />
                </FormField>
                <FormField
                    // ref={ref}
                    label="Offset Time"
                    id="offsetTime" variant="inline"
                    required labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox
                        value={tnaTemplateTask.offsetTime.toString()}
                        onChange={(val) => handleChange("offsetTime", val)}
                        type="number"
                        disabled={tnaTemplateTasks.length < 2}
                        className=" w-full"
                    />
                </FormField>
                <FormField
                    // ref={ref}
                    label="Responsible Team"
                    id="teamId" variant="inline"
                    required labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SelectDropdown
                        // ref={ref}
                        options={planningWorkingTeamList}
                        value={tnaTemplateTask.teamId.toString()}
                        isSameKeyValue={false}
                        labelKey='teamName'
                        valueKey='id'
                        onChange={(val) => handleChange("teamId", val)}
                        className=" w-full"
                    // onKeyDown={handleKeyDown}
                    />
                </FormField>
                <FormField
                    // ref={ref}
                    label="Task Group"
                    id="taskGroupId" variant="inline"
                    required labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SelectDropdown
                        // ref={ref}
                        options={tnaTaskGroups}
                        value={tnaTemplateTask.taskGroupId.toString()}
                        isSameKeyValue={false}
                        labelKey='name'
                        valueKey='id'
                        onChange={(val, item) => handleChange("taskGroupId", val, item?.name)}
                        className=" w-full"
                    // onKeyDown={handleKeyDown}
                    />
                </FormField>
                <FormField
                    // ref={ref}
                    label="Task Type"
                    id="taskGroupId" variant="inline"
                    required labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SelectDropdown
                        // ref={ref}
                        options={taskOptions}
                        value={tnaTemplateTask.taskType}
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
                {
                    tnaTemplateTasks.length > 0 &&
                    <Button onClick={handleSave} size="sm" >
                        <FontAwesomeIcon icon={faSave} /> Save
                    </Button>
                }

                {
                    isUpdateMode &&
                    <>
                        <Button onClick={handleUpdateTask} size="sm" >
                            <FontAwesomeIcon icon={faEdit} /> Update
                        </Button>

                        <Button onClick={handleAddTask} size="sm" >
                            <FontAwesomeIcon icon={faAdd} /> Add
                        </Button>
                    </>

                }
                <Button onClick={handleClear} variant='outlined'
                    size="sm" className='bg-amber-50 text-black' >
                    <FontAwesomeIcon icon={faEraser} /> Clear
                </Button>
            </div>
        </SmartForm>
    );
};
