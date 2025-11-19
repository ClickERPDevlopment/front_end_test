import { AppDispatch, RootState } from "@/app/store";
import Button from "@/components/form/Button";
import PageHeader from "@/components/layout/PageHeader";
import Panel from "@/components/layout/Panel";
import { faBackward, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import SelectDropdown from "@/components/form/SelectDropdown";
import { FormField } from "@/components/form/FormField";
import Checkbox from "@/components/form/Checkbox";
import { addMachine, clearMachineState, setMachineToStitchMap } from "../../reduxSlices/machine.Slice";
import { IMachines } from "../machinesSetup/machine.interface";
import { boolean } from "zod";

const MachinesStitchForm = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [pageTitle, setPageTitle] = useState<string>("");

    const {
        machines,
        validationErrors,
        stitchTypes,
        machineStitches,
    } = useSelector((state: RootState) => state.machine);

    useEffect(() => {
        document.title = "Machine to Stitch Mapping";
        setPageTitle("Machine to Stitch Mapping");

        return () => {
            document.title = "";
            dispatch(clearMachineState());
        };
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!machineStitches) return;

        const payload = {
            ...machineStitches.machine,
            stitchTypeIds: machineStitches.stitchTypes.map((s) => s.id),
        };

        dispatch(addMachine(payload));
    };

    const handleMachineSelect = (value: string, ITEM: IMachines | undefined) => {

        if (ITEM) {
            dispatch(
                setMachineToStitchMap({
                    machine: ITEM,
                    stitchTypes: [],
                })
            );
        }
    };

    // const handleStitchToggle = (id: number, checked: boolean) => {
    //     if (!machineStitches) return;

    //     const currentStitches = machineStitches.stitchTypes || [];
    //     const updatedStitches = checked
    //         ? [...currentStitches, stitchTypes.find((s) => s.id === id)!]
    //         : currentStitches.filter((s) => s.id !== id);

    //     dispatch(
    //         setMachineToStitchMap({
    //             machine: machineStitches.machine,
    //             stitchTypes: updatedStitches,
    //         })
    //     );
    // };

    const handleStitchToggle = (id: number, checked: boolean) => {
        if (!machineStitches) return;

        const selectedStitch = stitchTypes.find((s) => s.id === id);
        const updatedStitches = checked && selectedStitch ? [selectedStitch] : [];

        dispatch(
            setMachineToStitchMap({
                machine: machineStitches.machine,
                stitchTypes: updatedStitches,
            })
        );
    };


    return (
        <Panel
            header={<PageHeader title={pageTitle} />}
            footer={
                <div className="flex items-center justify-between p-2 border-b border-gray-200">
                    <Button
                        onClick={handleSubmit}
                        size="sm"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        <FontAwesomeIcon icon={faSave} /> Save Change
                    </Button>

                    <Button
                        onClick={() => navigate(-1)}
                        size="sm"
                        variant="outlined"
                        className="px-4 py-2 float-end bg-white text-black rounded hover:bg-gray-200"
                    >
                        <FontAwesomeIcon icon={faBackward} /> Back
                    </Button>
                </div>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                <FormField
                    label="Machine Code"
                    id="machineCode"
                    variant="block"
                    error={validationErrors?.type}
                >
                    <SelectDropdown
                        options={machines}
                        value={machineStitches?.machine.id.toString() || ""}
                        onChange={(value, item) => handleMachineSelect(value, item)}
                        isSameKeyValue={false}
                        valueKey="id"
                        labelKey="code"
                        placeholder="-- Select Machine Code --"
                        variant="bordered"
                        className="w-full"
                    />
                </FormField>

                <FormField
                    label="Machine Name"
                    id="machineName"
                    variant="block"
                    error={validationErrors?.name}
                >
                    <SelectDropdown
                        options={machines}
                        value={machineStitches?.machine.id.toString() || ""}
                        onChange={(value, ITEM) => handleMachineSelect(value, ITEM)}
                        isSameKeyValue={false}
                        valueKey="id"
                        labelKey="name"
                        placeholder="-- Select Machine Name --"
                        variant="bordered"
                        className="w-full"
                    />
                </FormField>
            </div>

            <div className="grid grid-cols-2 pt-2">
                <FormField
                    label="Stitch Type"
                    id="stitchType"
                    variant="block"
                    className="gap-3"
                    error={validationErrors?.type}
                >
                    <div className="grid grid-cols-3 gap-3">
                        {stitchTypes.map((stitch) => (
                            <Checkbox
                                key={stitch.id}
                                id={`stitch-${stitch.id}`}
                                label={stitch.name}
                                checked={
                                    machineStitches?.stitchTypes.some((s) => s.id === stitch.id) ||
                                    false
                                }
                                onChange={(checked) => handleStitchToggle(stitch.id, checked)}
                                size="small"
                                shape="square"
                                color="primary"
                            />
                        ))}
                    </div>
                </FormField>
            </div>
        </Panel >
    );
};

export default MachinesStitchForm;
