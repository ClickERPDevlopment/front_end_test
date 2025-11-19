import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { CustomDataTable, Column } from "@/components/data-display/CustomDataTable";
import { ICalendarDay, IPlanningCalendar } from "../planningCalendar.interface";
import Checkbox from "@/components/form/Checkbox";
import { updateCalendarDayInfo, updatePlanningCalendarList } from "@/modules/planning/reduxSlices/planningCalendar.Slice";
import { FormField } from "@/components/form/FormField";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import Button from "@/components/form/Button";
import { formatDate } from "@/utils/dateUtil";

export default function PlanningCalendarTable() {

    const dispatch: AppDispatch = useDispatch();
    const { planningCalendarList, paginationObject, selectedIndex, filteredPlanningCalendar } = useSelector((state: RootState) => state.planningCalendar);

    useEffect(() => {
        console.log(planningCalendarList)
    }, [planningCalendarList])

    // this displays the mp, eff, wh for that day in the input fields beside table upon checking
    const handleCheckChange = (value: boolean, index: number) => {
        // console.log(checked, index)
        dispatch(
            updatePlanningCalendarList({
                key: "isSelected",
                value,
                index
            })
        )
    }

    // this modifies the value that is inserted in fields
    const handleInputChange = (key: keyof ICalendarDay, value: number, index: number) => {
        console.log(key, value, index)
        dispatch(
            updateCalendarDayInfo({
                key,
                value,
                index
            })
        )
    }

    const columns: Column<IPlanningCalendar>[] = [
        {
            key: "actions", header: "Action",
            render: (row, idx) => (
                <Checkbox
                    label=""
                    size="small"
                    checked={row.isSelected}
                    onChange={(val) => handleCheckChange(val, idx)}
                    color="primary"
                    shape="square"
                />
            ),
        },
        // table structure
        { key: "year", header: "Year" },
        { key: "month", header: "Month" },
        { key: "sunday", header: "Sunday" },
        { key: "monday", header: "Monday" },
        { key: "tuesday", header: "Tuesday" },
        { key: "wednesday", header: "Wednesday" },
        { key: "thursday", header: "Thursday" },
        { key: "friday", header: "Friday" },
        { key: "saturday", header: "Saturday" },
    ];


    return (
        <div className="grid grid-cols-5 gap-5">
            <div className="col-span-3">
                <CustomDataTable<IPlanningCalendar>
                    columns={columns}
                    data={filteredPlanningCalendar}
                />
            </div>
            <div className="col-span-2">
                {
                    // checks if a valid row (selectedIndex) is selected in the filteredPlanningCalendar list.
                    // If valid, it proceeds to show that week’s weekData
                    // Loops through weekData (an array of objects representing each day).
                    // Each dayData contains: date, workingHour, manpower ,efficiency
                    selectedIndex > -1 && filteredPlanningCalendar[selectedIndex] && filteredPlanningCalendar[selectedIndex].weekData.map((dayData, index) => {
                        return (
                            <>
                                {
                                    index === 0 &&
                                    <div className="grid grid-cols-7 gap-1">
                                        <span>Day</span>
                                        <span>W.H</span>
                                        <span>MP</span>
                                        <span>Effi%</span>
                                        <span className="col-span-3"></span>
                                    </div>
                                }
                                <div className="grid grid-cols-7 gap-1" key={`day_${index}`}>
                                    <span className="font-bold mt-2">{formatDate(dayData.date, "day_only")}</span>
                                    <FormField
                                        label=""
                                        id=""
                                        variant="block"
                                    >
                                        <SimpleInputBox
                                            type="number"
                                            value={dayData.workingHour}
                                            onChange={(value) => { handleInputChange('workingHour', Number(value), index) }}
                                            id="wh"
                                            placeholder=""
                                            className="w-full"
                                        ></SimpleInputBox>
                                    </FormField>
                                    <FormField
                                        label=""
                                        id=""
                                        variant="block"
                                    >
                                        <SimpleInputBox
                                            type="number"
                                            value={dayData.manpower}
                                            onChange={(value) => { handleInputChange('manpower', Number(value), index) }}
                                            id="mp"
                                            placeholder=""
                                            className="w-full"
                                        ></SimpleInputBox>
                                    </FormField>
                                    <FormField
                                        label=""
                                        id=""
                                        variant="block"
                                    >
                                        <SimpleInputBox
                                            type="number"
                                            value={dayData.efficiency}
                                            onChange={(value) => { handleInputChange('efficiency', Number(value), index) }}
                                            id="eff"
                                            placeholder=""
                                            className="w-full"
                                        ></SimpleInputBox>
                                    </FormField>
                                    <div className="col-span-3">
                                        <div className="flex gap-1">
                                            <div>
                                                <Button
                                                    size="sm"
                                                    className="bg-green-400"
                                                >
                                                    Holiday
                                                </Button>
                                            </div>
                                            <div>
                                                <Button
                                                    size="sm"
                                                    className="bg-yellow-300"
                                                >
                                                    Weekend
                                                </Button>
                                            </div>
                                            <div>
                                                <Button
                                                    size="sm"
                                                    className="bg-black"
                                                >
                                                    Normal
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div >
    );
}
