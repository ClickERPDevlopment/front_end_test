import { AppDispatch, RootState } from "@/app/store";
import Button from "@/components/form/Button";
import PageHeader from "@/components/layout/PageHeader";
import Panel from "@/components/layout/Panel";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { faBackward, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getRoutes, RouteLayout } from "@/app/constants";
import Tabs from "@/components/layout/Tabs";
import { useTheme } from "@/hooks/useTheme";
import { addSection, clearSectionMessages, clearSectionState, editSection, getSection, setSectionValidationErrors, updateSectionField } from "../../reduxSlices/sectionSlice";
import AccountsDetails from "./AccountsDetails";
import ProcessInfo from "./ProcessInfo";
import { ISection, sectionSchema, SectionValidationErrors } from './section.interface';


const SectionForm = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { section, error, message, validationErrors } = useSelector((state: RootState) => state.section);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>("");

     const { rowsPerPage, layout, company } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearSectionMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearSectionMessages());
        }

    }, [message]);

    useEffect(() => {
        document.title = "Process Setup";
        console.log("SectionForm mounted");
        setPageTitle("Process Setup");
        // dispatch(fetchAllProductionType());

        return () => {
            document.title = "";
            dispatch(clearSectionState());
        };
    }, [dispatch]);

    useEffect(() => {

        if (id) {
            document.title = "Section Edit";
            setPageTitle("Section Edit");
            setIsUpdateMode(true);
            dispatch(getSection(Number(id)))
        }

    }, [id]);

    const handleChange = (key: keyof ISection, value: string, displayValue?: string) => {
        dispatch(
            updateSectionField({
                key: key,
                value: value,
            })
        );
    };

    const handleCheckboxChange = (key: keyof ISection, value: boolean) => {
        dispatch(
            updateSectionField({
                key: key,
                value: value,
            })
        );
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(webRoutes.SECTION_LIST);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parseResult = sectionSchema.safeParse(section);

        if (!parseResult.success) {
            const errors: SectionValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof ISection;
                errors[key] = issue.message;
            }
            dispatch(setSectionValidationErrors(errors));
            return;
        }
        if (isUpdateMode) {
            dispatch(editSection({ id: Number(id), payload: section }));
        } else {
            dispatch(addSection(section));
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
                <div className="grid grid-cols-1 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-xl xl:max-w-xl">
                    <Tabs
                        variant="underline"
                        tabs={[
                            {
                                label: "Process Info",
                                content: (
                                    <ProcessInfo />
                                )
                            },
                            {
                                label: "Account Details",
                                content: (
                                    <AccountsDetails />
                                )
                            }
                        ]}
                    >
                    </Tabs>
                </div>
            </Panel>
        </>
    );
};

export default SectionForm;
