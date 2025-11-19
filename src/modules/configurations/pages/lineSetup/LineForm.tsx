import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import Button from "@/components/form/Button";
import Checkbox from "@/components/form/Checkbox";
import { FormField } from "@/components/form/FormField";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import PageHeader from "@/components/layout/PageHeader";
import Panel from "@/components/layout/Panel";
import { useTheme } from "@/hooks/useTheme";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { faBackward, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addLine, clearLineMessages, clearLineState, editLine, getLine, setLineValidationErrors, updateLineField } from "../../reduxSlices/lineSlice";
import { ILine, LineSchema, LineValidationErrors } from "./line.interface";



const LineForm = () => {

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { line, error, message, validationErrors } = useSelector((state: RootState) => state.line);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>("");

        
    const { rowsPerPage, layout, company } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearLineMessages());
        }

    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearLineMessages());
        }

    }, [message]);

    useEffect(() => {
        document.title = "Line Entry";
        console.log("LineForm mounted");
        setPageTitle("Line Entry");
        // dispatch(fetchAllProductionType());
        return () => {
            document.title = "";
            dispatch(clearLineState());

        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            document.title = "Line Edit";
            setPageTitle("Line Edit");
            setIsUpdateMode(true);
            dispatch(getLine(Number(id)))
        }
    }, [id]);

    const handleChange = (key: keyof ILine, value: string, displayValue?: string) => {
        dispatch(
            updateLineField({
                key: key,
                value: value,
            })
        );
    };

    const handleCheckboxChange = (key: keyof ILine, value: boolean) => {
        dispatch(
            updateLineField({
                key: key,
                value: value,
            })
        );
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(webRoutes.LINE_LIST);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parseResult = LineSchema.safeParse(line);
        if (!parseResult.success) {
            const errors: LineValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof ILine;
                errors[key] = issue.message;
            }

            dispatch(setLineValidationErrors(errors));
            return;
        }
        if (isUpdateMode) {
            dispatch(editLine({ id: Number(id), payload: line }));
        } else {
            dispatch(addLine(line));
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
                {/* Bottom Section: Full-width Table */}
                <div className="grid grid-cols-1">
                    <div className="grid grid-cols-1 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-xl xl:max-w-xl gap-4">

                        <FormField
                            label="Floor Name"
                            id="FloorName"
                            variant="block"
                            error={validationErrors?.floorName}
                        >
                            <SimpleInputBox
                                value={line.lineName}
                                onChange={(val) => handleChange("floorName", val)}
                                id="code"
                                type="text"
                                placeholder="Type Floor Name"
                                className="w-full"
                            />
                        </FormField>

                        <FormField
                            label="Code/Sort by"
                            id="Code"
                            variant="block"
                            error={validationErrors?.lineCode}
                        >
                            <SimpleInputBox
                                value={line.lineCode}
                                onChange={(val) => handleChange("lineCode", val)}
                                id="code"
                                placeholder="Type Line Code"
                                className="w-full"
                            />
                        </FormField>

                        <FormField
                            label="Line Name"
                            id="LineName"
                            variant="block"
                            error={validationErrors?.lineName}
                        >
                            <SimpleInputBox
                                value={line.lineName}
                                onChange={(val) => handleChange("lineName", val)}
                                id="lineName"
                                placeholder="Type Line Name"
                                className="w-full"
                            />
                        </FormField>

                        <FormField
                            label="Line Chief/Supervisor"
                            id="LineChiefSupervisor"
                            variant="block"
                            error={validationErrors?.chiefSupervisor}
                        >
                            <SimpleInputBox
                                value={line.chiefSupervisor}
                                onChange={(val) => handleChange("chiefSupervisor", val)}
                                id="chiefSupervisor"
                                type="text"
                                placeholder="Type Chief/Supervisor Name"
                                className="w-full"
                            />
                        </FormField>

                        <FormField
                            label="Best For"
                            id="BestFor"
                            variant="block"
                            error={validationErrors?.bestFor}
                        >
                            <SimpleInputBox
                                value={line.bestFor}
                                onChange={(val) => handleChange("bestFor", val)}
                                id="bestFor"
                                type="text"
                                placeholder="Type Best For"
                                className="w-full"
                            />
                        </FormField>

                        <FormField
                            label="Remarks"
                            id="LinePM"
                            variant="block"
                            error={validationErrors?.remarks}
                        >
                            <SimpleInputBox
                                value={line.remarks}
                                onChange={(val) => handleChange("remarks", val)}
                                id="remarks"
                                type="text"
                                placeholder="Type Remarks"
                                className="w-full"
                            />
                        </FormField>

                        <FormField
                            label="Group Name"
                            id="GroupName"
                            variant="block"
                            error={validationErrors?.groupName}
                        >
                            <SimpleInputBox
                                value={line.groupName}
                                onChange={(val) => handleChange("groupName", val)}
                                id="groupName"
                                type="text"
                                placeholder="Type Group Name"
                                className="w-full"
                            />
                        </FormField>
                        <div className="flex flex-row gap-4 mt-4">
                            <Checkbox
                                label="Is Active"
                                checked={line.isActive}
                                onChange={(val) => handleCheckboxChange("isActive", val)}
                                color="primary"
                                shape="square"
                            />
                        </div>
                    </div>
                </div>
            </Panel>
        </>
    );
};

export default LineForm;
