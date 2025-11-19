import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import Button from "@/components/form/Button";
import CustomDatePicker from "@/components/form/CustomDatePicker";
import { FormField } from "@/components/form/FormField";
import SelectDropdown from "@/components/form/SelectDropdown";
import PageHeader from "@/components/layout/PageHeader";
import Panel from "@/components/layout/Panel";
import { useTheme } from "@/hooks/useTheme";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { faBackward, faSave, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearFilter, clearPlanningCalendarMessages, clearPlanningCalendarState, filterPlanningCalendarByDate, getPlanningCalendar, setPlanningCalendarValidationErrors, updatePlanningCalendarField, updatePlanningCalendarRow } from "../../reduxSlices/planningCalendar.Slice";
import PlanningCalendarTable from "./components/PlanningCalendarTable";
import { IPlanningCalendar, planningCalendarSchema, PlanningCalendarValidationErrors } from "./planningCalendar.interface";
const PlanningCalendarForm = () => {

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { planningCalendar, boards, error, message, validationErrors } = useSelector((state: RootState) => state.planningCalendar);
    const { companies } = useSelector((state: RootState) => state.company);
    const { rowsPerPage, layout, company,setCompany } = useTheme();
    const { sections } = useSelector((state: RootState) => state.section);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
    const webRoutes = getRoutes(layout as RouteLayout);
    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearPlanningCalendarMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearPlanningCalendarMessages());
        }
    }, [message]);

    useEffect(() => {
        document.title = "Planning Calendar Setup";
        console.log("Planning Calendar Mounted");
        setPageTitle("Planning Calendar");
        // dispatch(fetchAllProductionType());

        return () => {
            document.title = "";
            dispatch(clearPlanningCalendarState());

        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            document.title = "Planning Working Team Edit";
            setPageTitle("Planning Working Team Edit");
            setIsUpdateMode(true);
            dispatch(getPlanningCalendar(Number(id)))
        }
    }, [id]);

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(webRoutes.PLANNING_WORKING_CALENDAR);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parseResult = planningCalendarSchema.safeParse(planningCalendar);
        if (!parseResult.success) {
            const errors: PlanningCalendarValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof IPlanningCalendar;
                errors[key] = issue.message;
            }
            dispatch(setPlanningCalendarValidationErrors(errors));
            return;
        }

        // if (isUpdateMode) {
        //     dispatch(editPurchaseRequisition({ id: Number(id), payload: planningCalendar }));
        // } else {
        //     dispatch(addPurchaseRequisition(planningCalendar));
        // }
    };

    const handleChange = (key: keyof IPlanningCalendar, value: string, displayValue?: string) => {
        dispatch(
            updatePlanningCalendarField({
                key: key,
                value: value,
            })
        );
    };

    // for updating a single row from table
    const handleChangeRows = (index: number, key: keyof IPlanningCalendar, value: string) => {
        dispatch(updatePlanningCalendarRow({ index, key, value }));
    };




    const [selectedDate, setSelectedDate] = useState<Date | null>(null);


    const handleFromDateChange = (date: Date | null) => {
        dispatch(updatePlanningCalendarField({
            key: "fromDate",
            value: date ? date.toISOString().split("T")[0] : ""
        }));
    };

    const handleToDateChange = (date: Date | null) => {
        dispatch(updatePlanningCalendarField({
            key: "toDate",
            value: date ? date.toISOString().split("T")[0] : ""
        }));
    };

    const handleSearch = () => {
        if (planningCalendar.fromDate && planningCalendar.toDate) {
            dispatch(
                filterPlanningCalendarByDate({
                    from: planningCalendar.fromDate,
                    to: planningCalendar.toDate,
                })
            );
        } else {
            dispatch(clearFilter());
        }
    };


    return (
        <>
            <Panel
                header={
                    <PageHeader
                        title={pageTitle}
                    />
                }
                footer={
                    <div className="flex items-center justify-between p-2 border-b border-gray-200">
                        <Button
                            onClick={handleSubmit}
                            size="sm"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            <FontAwesomeIcon icon={faSave} /> Save Change
                        </Button>
                        <Button
                            onClick={handleBack}
                            size="sm"
                            variant="outlined"
                            className="px-4 py-2 float-end bg-white text-black rounded hover:bg-gray-200">
                            <FontAwesomeIcon icon={faBackward} /> Back
                        </Button>
                    </div>
                }
            >
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid grid-cols-3 gap-2">
                        <FormField
                            label="Factory"
                            id="factory"
                            variant="block"
                            error={validationErrors?.factory}
                        >
                            <SelectDropdown
                                options={companies}
                                value={company?.id.toString() || ""}
                                isSameKeyValue={false}
                                labelKey="name"
                                valueKey="companyId"
                                onChange={(_, item) => setCompany(item ?? null)}
                                className="h-8 text-sm w-full bg-white dark:bg-gray-800"
                            />
                        </FormField>
                        <FormField
                            label="Section"
                            id="section"
                            variant="block"
                            error={validationErrors?.section}
                        >
                            {/* <SelectDropdown
                                options={sections}
                                value={section?.id.toString() || ""}
                                isSameKeyValue={false}
                                labelKey="name"
                                valueKey="id"
                                onChange={(_, item) => setSection(item ?? null)}
                                className="h-8 text-sm w-full bg-white dark:bg-gray-800"
                            /> */}
                            <></>
                        </FormField>
                        <FormField
                            label="Board"
                            id="board"
                            variant="block"
                            error={validationErrors?.board}
                        >
                            <SelectDropdown
                                options={boards ?? []}
                                value={planningCalendar.boardId.toString() || ""}
                                isSameKeyValue={false}
                                labelKey="name"
                                valueKey="id"
                                onChange={(val, item) => handleChange("boardId", val || "")}
                                className="h-8 text-sm w-full bg-white dark:bg-gray-800"
                            />
                        </FormField>
                        <FormField
                            label="From"
                            id="fromDate"
                            variant="block"
                            error={validationErrors?.fromDate}
                        >
                            <CustomDatePicker
                                selected={planningCalendar.fromDate ? new Date(planningCalendar.fromDate) : null}
                                onChange={handleFromDateChange}
                                className="border border-gray-300"
                            />
                        </FormField>
                        <FormField
                            label="To"
                            id="toDate"
                            variant="block"
                            error={validationErrors?.toDate}
                        >
                            <CustomDatePicker
                                selected={planningCalendar.toDate ? new Date(planningCalendar.toDate) : null}
                                onChange={handleToDateChange}
                                className="border border-gray-300"
                            />
                        </FormField>
                        <div>
                            <Button
                                size="sm"
                                variant="outlined"
                                className="mt-5 bg-white text-black rounded hover:bg-gray-200"
                                onClick={handleSearch}
                            >
                                <FontAwesomeIcon icon={faSearch} /> Search
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <PlanningCalendarTable />
                </div>
            </Panel >
        </>
    );
};

export default PlanningCalendarForm;
