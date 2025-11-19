import React, { useEffect, useState } from 'react';
import { ITnaDetails } from './tna.interface';
import { FormField } from '../../../../components/form/FormField';
import SimpleInputBox from '../../../../components/form/SimpleInputBox';
import DropdownAutoSuggest from '../../../../components/form/DropdownAutoSuggest';
import Button from '../../../../components/form/Button';
import SmartForm from '../../../../components/form/SmartForm';
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setTnaDetails, updateTnaTaskField } from '../../reduxSlices/tnaSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEraser, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/hooks/useTheme';
import { setDropdownData } from '@/app/dropdownSlice';
import { fetchTnaTemplateDetail } from '../../reduxSlices/tnaTemplateSlice';
import Modal from '@/components/feedback-interaction/Modal';
import SearchForm from './SearchForm';
import { ITnaTemplateTask } from '../tnaTemplateSetup/tnaTemplate.interface';
import { formatDate } from '@/utils/dateUtil';


interface LeadTimeResult {
    id: number;
    taskName: string;
    leadTime: number;
}

export const TnaForm: React.FC = () => {
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
    const { tnaList, tnaTaskList, tna } = useSelector((state: RootState) => state.tna);
    const { planningWorkingTeamList } = useSelector((state: RootState) => state.planningWorkingTeam);
    const { tnaTaskGroups } = useSelector((state: RootState) => state.tnaTaskGroup);
    const { company } = useTheme();
    const [selectedTemplate, setTemplate] = useState<{ id: number; name: string; code?: string } | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        dispatch(
            setDropdownData({
                name: 'tnaTemplates',
                data: tnaTemplates,
                labelKey: 'name',
                valueKey: 'id',
            })
        );
    }, [tnaTemplates]);

    useEffect(() => {
        console.log("->>", tnaTemplateTasks);
        fillDateByTemplate(tnaTemplateTasks, tna.poShipDate)
    }, [tnaTemplateTasks])

    useEffect(() => {
        if (selectedTemplate) {
            dispatch(fetchTnaTemplateDetail({ id: String(selectedTemplate.id) }))
        }
    }, [selectedTemplate])

    const handleChange = (key: keyof ITnaDetails, value: string, displayVal?: string) => {
        dispatch(
            updateTnaTaskField({
                key,
                value,
                displayVal
            })
        );
    };

    const validations: { condition: boolean; message: string }[] = [
        { condition: tnaTemplateTasks.length === 0 && tnaTemplateTask.leadTime === 0, message: "Please set lead time" },
        { condition: tnaTemplateTask.taskName === "", message: "Please set task name" },
        { condition: tnaTemplateTasks.length > 2 && tnaTemplateTask.durationType === "", message: "Please set duration type" },
        { condition: tnaTemplateTasks.length > 2 && tnaTemplateTask.offsetTime === 0, message: "Please set offset time" },
        { condition: tnaTemplateTask.teamId === 0, message: "Please set team" },
        { condition: tnaTemplateTask.taskGroupId === 0, message: "Please set task group" },
    ];


    const handleUpdateTask = () => {
        // Find the existing task
        const existingTask = tnaTaskList.find(t => t.id === tnaTemplateTask.id);
        if (!existingTask) return; // No match, nothing to update

        // Merge changes into existing task
        const mergedTask: ITnaDetails = {
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
            p_date_db_prev: formatDate(existingTask.p_date_db_prev || "", "db_format"),
            presetDate: formatDate(existingTask.presetDate || "", "db_format"),
            changingDate: formatDate(existingTask.changingDate || "", "db_format"),
        };

        // Recalculate lead times for this task AND all dependents
        const leadTimeResults = calculateLeadTimesFromTask(
            tnaTaskList.map(t => (t.id === mergedTask.id ? mergedTask : t)),
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
        // dispatch(bulkSaveTnaTemplateTaskToIndexDB(finalTasks));
        // dispatch(clearTnaTemplateState());
    };

    function calculateLeadTimesFromTask(
        taskList: ITnaDetails[],
        startTaskId: number,
        newTask: ITnaDetails
    ): LeadTimeResult[] {
        const leadTimeMap: Record<number, number> = {};

        // Calculate lead time for a single task by looking up dependency lead time
        const calculate = (taskId: number, startTaskId2: number, newTask: ITnaDetails): number => {
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

        const dfs = (taskId: number, startTaskId3: number, newTask: ITnaDetails) => {
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
        // if (templateName === "") {
        //     showErrorToast("Please Set Template Name");
        //     return;
        // }

        // await dispatch(bulkTemplateTaskSaveToDB({ companyId: company?.companyid || 0, tasks: tnaTemplateTasks, templateName }));
    }

    const handleClear = () => {
        // setTemplate(null);
        // dispatch(clearTnaData())
    }

    // clone date with offset
    const addDays = (date: Date, days: number): Date => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    };

    const calculateTaskDates = (
        tasks: ITnaTemplateTask[],
        deliveryDate: string,
        minSwStartDt?: string,
        maxSwEndDt?: string
    ): ITnaTemplateTask[] => {
        const result: Record<number, ITnaTemplateTask> = {};
        const pending: number[] = [];

        let baseDate = new Date(deliveryDate);

        // Loop through tasks from last to first
        for (let i = tasks.length - 1; i >= 0; i--) {
            const t = { ...tasks[i] };

            // If it's the very last task, assign delivery date
            if (i === tasks.length - 1) {
                t.p_date_db_real = formatDate(baseDate.toLocaleDateString() || "", 'db_format');
                result[t.id] = t;
                continue;
            }

            // If it's the very first task, subtract duration
            if (i === 0) {
                t.p_date_db_real = formatDate(addDays(baseDate, -t.leadTime).toLocaleDateString() || "", "db_format");
                result[t.id] = t;
                continue;
            }

            // Special cases for sewing start/end
            if (minSwStartDt && t.taskType === "Sewing Start") {
                t.p_date_db_real = formatDate(new Date(minSwStartDt).toLocaleDateString() || "", 'db_format');
                result[t.id] = t;
                continue;
            }
            if (maxSwEndDt && t.taskType === "Sewing End") {
                t.p_date_db_real = formatDate(new Date(maxSwEndDt).toLocaleDateString() || "", 'db_format');
                result[t.id] = t;
                continue;
            }

            // Handle dependency-based offsets
            const taskId = Number(t.dependentTaskBackId) + Number(t.dependentTaskFrontId);
            if (result[taskId]?.p_date_db_real) {
                const depDate = result[taskId].p_date_db_real!;
                t.p_date_db_real =
                    t.durationType === "Backward(+)"
                        ? formatDate(addDays(new Date(depDate), -t.offsetTime).toLocaleDateString() || "", 'db_format')
                        : formatDate(addDays(new Date(depDate), t.offsetTime).toLocaleDateString() || "", "db_format");

                result[t.id] = t;
            } else {
                // Mark as pending (dependency not ready yet)
                pending.push(t.id);
                result[t.id] = t;
            }
        }

        // Second pass: resolve pending tasks
        pending.forEach((id) => {
            const t = result[id];
            const taskId = Number(t.dependentTaskBackId) + Number(t.dependentTaskFrontId);
            const depDate = result[taskId]?.p_date_db_real;

            if (depDate) {
                t.p_date_db_real =
                    t.durationType === "Backward(+)"
                        ? formatDate(addDays(new Date(depDate), -t.offsetTime).toLocaleDateString() || "", 'db_format')
                        : formatDate(addDays(new Date(depDate), t.offsetTime).toLocaleDateString() || "", "db_format");
                result[t.id] = t;
            }
        });

        return Object.values(result);
    }

    const fillDateByTemplate = (
        tasks: ITnaTemplateTask[],
        deliveryDate: string
    ) => {
        // 1. Set ship date (same as delivery date initially)
        const shipDate = new Date(deliveryDate);
        // debugger
        // 2. First calculate offset dates
        const calculatedTasks = calculateTaskDates(tasks, deliveryDate, tna.sewingStart, tna.sewingEnd);

        let minSwStartDate: string | undefined;
        let maxSwEndDate: string | undefined;

        // 3. Add formatted fields to each task
        const updatedTasks = calculatedTasks.map((t) => {
            const curvDate = t.p_date_db_real ? new Date(t.p_date_db_real) : null;

            return {
                ...t,
                p_date_db_real: curvDate ? formatDate(curvDate.toLocaleDateString() || "", "db_format") : null,
                p_date: curvDate ? formatDate(curvDate.toLocaleDateString() || "", "db_format") : "",
                p_date_db: curvDate ? formatDate(curvDate.toLocaleDateString() || "", "db_format") : "",
                p_date_db_prev: curvDate || null,
                cur_date: curvDate ? formatDate(curvDate.toLocaleDateString() || "", "db_format") : "",
                durationdifferent: t.leadTime,
            };
        });

        // 4. Extract Sewing Start & End pretty dates
        updatedTasks.forEach((t) => {
            if (t.taskName === "Sewing Start" && t.p_date_db_real) {
                minSwStartDate = t.p_date_db_real;
            }
            if (t.taskName === "Sewing End" && t.p_date_db_real) {
                maxSwEndDate = t.p_date_db_real;
            }
        });

        let tnaDetails = convertTemplateToDetails(updatedTasks, tna.id);

        dispatch(setTnaDetails({ data: tnaDetails }))
    }

    function convertTemplateToDetails(
        templates: ITnaTemplateTask[],
        masterId: number
    ): ITnaDetails[] {
        return templates.map(t => ({
            ...t,
            effectDate: new Date().toISOString(),
            masterId,
            isDone: "N",
            isEffectOther: "N",
            isApplicable: "Y",
            isFabricsStart: "N",
            isFabricsEnd: "N",
            durationdifferent: t.durationDifferent,
            p_date_db_prev: formatDate(t.p_date_db_prev?.toLocaleDateString() || "", "db_format"),
            presetDate: formatDate(t.presetDate?.toLocaleDateString() || "", "db_format"),
            changingDate: formatDate(t.changingDate?.toLocaleDateString() || "", "db_format"),
        })).sort((a, b) => a.sortBy - b.sortBy);;
    }


    return (
        <div>
            <div className="grid ">

                <FormField
                    label="Job No"
                    id="taskName" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <div className='flex w-full gap-2'>
                        <SimpleInputBox disabled
                            value={tna.jobNumber.toString()}
                            onChange={(val) => console.log()}
                            type="text"
                            className=" "
                        />
                        <div className=''>
                            <Button
                                variant='filled'
                                onClick={() => setIsModalOpen(true)}
                                size='sm'>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </div>
                    </div>
                </FormField>

                <FormField
                    label="Buyer"
                    id="taskName" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox disabled
                        value={tna.buyerName.toString()}
                        onChange={(val) => console.log()}
                        type="text"
                        className=" "
                    />
                </FormField>

                <FormField
                    label="Style No."
                    id="taskName" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox disabled
                        value={tna.styleNo.toString()}
                        onChange={(val) => console.log()}
                        type="text"
                        className=" "
                    />
                </FormField>

                <FormField
                    label="PO NO"
                    id="taskName" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox disabled
                        value={tna.pono.toString()}
                        onChange={(val) => console.log()}
                        type="text"
                        className=" "
                    />
                </FormField>

                <FormField
                    label="Req Grey Fabric"
                    id="taskName" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox disabled
                        value={tna.reqGreyFabric.toString()}
                        onChange={(val) => console.log()}
                        type="text"
                        className=" "
                    />
                </FormField>

                <FormField
                    label="PO QTY"
                    id="taskName" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox disabled
                        value={tna.poQty.toString()}
                        onChange={(val) => console.log()}
                        type="text"
                        className=" "
                    />
                </FormField>

                <FormField
                    label="PO Rcv. Dt"
                    id="taskName" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox disabled
                        value={tna.poRcvDate.toString()}
                        onChange={(val) => console.log()}
                        type="text"
                        className=" "
                    />
                </FormField>

                <FormField
                    label="Ship Dt"
                    id="taskName" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox disabled
                        value={tna.poShipDate.toString()}
                        onChange={(val) => console.log()}
                        type="text"
                        className=" "
                    />
                </FormField>

                <FormField
                    label="SW Start"
                    id="taskName" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox disabled
                        value={tna.sewingStart.toString()}
                        onChange={(val) => console.log()}
                        type="text"
                        className=" "
                    />
                </FormField>

                <FormField
                    label="SW End"
                    id="taskName" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox disabled
                        value={tna.sewingEnd.toString()}
                        onChange={() => console.log()}
                        type="text"
                        className=" "
                    />
                </FormField>

                <FormField
                    label="Lead Time"
                    id="taskName" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox disabled
                        value={String(tna.leadTime.toString())}
                        onChange={(val) => console.log()}
                        type="text"
                        className=" "
                    />
                </FormField>

                <FormField
                    label="Item Type"
                    id="taskName" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox disabled
                        value={tna.itemType.toString()}
                        onChange={(val) => console.log()}
                        type="text"
                        className=" "
                    />
                </FormField>

                <FormField
                    label="Embellishment"
                    id="taskName" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox disabled
                        value={tna.embellishmentType.toString()}
                        onChange={(val) => console.log()}
                        type="text"
                        className=" "
                    />
                </FormField>

                <FormField
                    label="Fabric Source"
                    id="taskName" variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]">
                    <SimpleInputBox disabled
                        value={tna.fabricSource.toString()}
                        onChange={(val) => console.log()}
                        type="text"
                        className=" "
                    />
                </FormField>

                <FormField
                    label="Template"
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

            </div>

            <div className='flex gap-3 float-end '>
                {
                    tnaTaskList.length > 0 &&
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

                    </>

                }
                <Button onClick={handleClear} variant='outlined'
                    size="sm" className='bg-amber-50 text-black' >
                    <FontAwesomeIcon icon={faEraser} /> Clear
                </Button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                widthClass="max-w-4xl"
                title="Search for TNA"
                heightClass="max-h-screen"
            >
                <SearchForm />
            </Modal>
        </div>
    );
};
