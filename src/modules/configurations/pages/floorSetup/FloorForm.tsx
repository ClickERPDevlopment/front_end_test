import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import Button from "@/components/form/Button";
import Checkbox from "@/components/form/Checkbox";
import { FormField } from "@/components/form/FormField";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import { ActionButtons, ActionType } from "@/components/layout/ActionButtons";
import { useTheme } from "@/hooks/useTheme";
import { useDashboardActions } from "@/layouts/DashboardLayout";
import { MODAL_KEYS, } from "@/types/global";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addFloor, clearFloorMessages, clearFloorState, editFloor, getFloor, setFloorValidationErrors, updateFloorField } from "../../reduxSlices/floorSlice";
import { floorSchema, FloorValidationErrors, IFloor } from "./floor.interface";

const FloorForm = () => {
    const { id } = useParams();
    const [isEditMode, setIsEditMode] = useState(false);
    const { setActions } = useDashboardActions();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { floor, error, message, validationErrors } = useSelector((state: RootState) => state.floor);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { rowsPerPage, layout, company } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);
    // --- Action Button Handlers --- 
    const handleAction = useCallback(
        //debugger
        (action: ActionType) => {
            // switch (action) {
            //     case "save":
            //         dispatch(addInventorySale({ ...saleInfo, id: 0, factoryID: company?.companyId || 0 }));
            //         break;
            //     case "update":
            //         dispatch(addInventorySale({ ...saleInfo, id: Number(id), }));
            //         break;
            //     case "delete":
            //         showHotError(" Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
            //         break;
            //     case "clear":
            //         dispatch(clearInventorySaleState())
            //         break;
            //     case "preview":
            //         showHotError("Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
            //         break;
            // }
        },
        [dispatch, floor]
    );
    useEffect(() => {
        //debugger
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearFloorMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearFloorMessages());
        }
    }, [message]);

    useEffect(() => {
        document.title = "Floor Add";
        console.log("FloorForm mounted");
        setPageTitle("Floor Add");
        // dispatch(fetchAllProductionType());

        return () => {
            document.title = "";
            dispatch(clearFloorState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            document.title = "Floor Edit";
            setPageTitle("Floor Edit");
            setIsUpdateMode(true);
            dispatch(getFloor(Number(id)))
        }
    }, [id]);

    const handleChange = (key: keyof IFloor, value: string, displayValue?: string) => {
        dispatch(
            updateFloorField({
                key: key,
                value: value,
            })
        );
    };

    const handleCheckboxChange = (key: keyof IFloor, value: boolean) => {
        dispatch(
            updateFloorField({
                key: key,
                value: value,
            })
        );
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(webRoutes.CURRENCY_LIST);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parseResult = floorSchema.safeParse(floor);

        if (!parseResult.success) {
            const errors: FloorValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof IFloor;
                errors[key] = issue.message;
            }

            dispatch(setFloorValidationErrors(errors));
            return;
        }
        if (isUpdateMode) {
            dispatch(editFloor({ id: Number(id), payload: floor }));
        } else {
            dispatch(addFloor(floor));
        }

    };

    const openModal = (id: number) => {

        navigate(`/webapp/modal/${MODAL_KEYS.SECTION_ADD}`, {
            state: {
                backgroundLocation: {
                    pathname: location.pathname,
                    search: location.search,
                    hash: location.hash,
                }
            }, // this is key
        });
    };

    // Attach this to your <form> or a wrapper div around all FormFields
    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // stop form submission

            const form = e.currentTarget;
            const focusableElements = Array.from(
                form.querySelectorAll<HTMLElement>(
                    'input, select, textarea, [tabindex]:not([tabindex="-1"])'
                )
            ).filter(el => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));

            const index = focusableElements.indexOf(document.activeElement as HTMLElement);
            if (index > -1 && index + 1 < focusableElements.length) {
                focusableElements[index + 1].focus(); // move to next input
            }
        }
    };


    return (
        <div>
            {/* Bottom Section: Full-width Table */}
            <div className="grid grid-cols-3">
                <div className="lg:grid grid-cols-1 gap-2">
                    <form onKeyDown={handleKeyDown}>
                        <FormField
                            label="Floor Code"
                            id="FloorCode"
                            variant="block"
                            error={validationErrors?.floorCode}
                        >
                            <SimpleInputBox
                                value={floor.floorCode}
                                onChange={(val) => handleChange("floorCode", val)}
                                id="code"
                                type="text"
                                placeholder="Type Floor Code"
                                className="w-full"
                            />
                        </FormField>

                        <FormField
                            label="Floor Name"
                            id="FloorName"
                            variant="block"
                            error={validationErrors?.floorName}
                        >
                            <div className="flex gap-2">
                                <SimpleInputBox
                                    value={floor.floorName}
                                    onChange={(val) => handleChange("floorName", val)}
                                    id="name"
                                    placeholder="Type Floor Name"
                                    className="w-full"
                                />
                                <Button
                                    size="sm"
                                    variant="filled"
                                    className="cursor-pointer"
                                    onClick={() => openModal(123)}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </Button>
                            </div>
                        </FormField>

                        <FormField
                            label="Floor In Charge"
                            id="FloorInCharge"
                            variant="block"
                            error={validationErrors?.floorInchargeName}
                        >
                            <SimpleInputBox
                                value={floor.floorInchargeName}
                                onChange={(val) => handleChange("floorInchargeName", val)}
                                id="inchargeName"
                                placeholder="Type Floor In Charge"
                                className="w-full"
                            />
                        </FormField>

                        <FormField
                            label="Floor PM"
                            id="FloorPM"
                            variant="block"
                            error={validationErrors?.productionManagerName}
                        >
                            <SimpleInputBox
                                value={floor.productionManagerName}
                                onChange={(val) => handleChange("productionManagerName", val)}
                                id="productionManagerName"
                                type="text"
                                placeholder="Type Floor PM"
                                className="w-full"
                            />
                        </FormField>

                        <FormField
                            label="Remarks"
                            id="FloorPM"
                            variant="block"
                            error={validationErrors?.remarks}
                        >
                            <SimpleInputBox
                                value={floor.remarks}
                                onChange={(val) => handleChange("remarks", val)}
                                id="remarks"
                                type="text"
                                placeholder="Type Remarks"
                                className="w-full"
                            />
                        </FormField>


                        <div className="flex flex-row gap-4 mt-4">
                            <Checkbox
                                label="Is Sub Contract"
                                size="small"
                                checked={floor.isSubContract}
                                onChange={(val) => handleCheckboxChange("isSubContract", val)}
                                color="primary"
                                shape="square"
                            />
                            <Checkbox
                                label="Is Active"
                                size="small"
                                checked={floor.isActive}
                                onChange={(val) => handleCheckboxChange("isActive", val)}
                                color="primary"
                                shape="square"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FloorForm;

