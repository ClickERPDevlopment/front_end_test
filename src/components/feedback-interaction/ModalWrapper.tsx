import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faExpand, faCompress } from "@fortawesome/free-solid-svg-icons";
import FloorForm from "@/modules/configurations/pages/floorSetup/FloorForm";
import SectionForm from "@/modules/configurations/pages/sectionSetup/SectionForm";
import LineForm from "@/modules/configurations/pages/lineSetup/LineForm";
import { MODAL_KEYS, MODAL_TYPE_KEY } from "@/types/global";
import UomForm from "@/modules/inventory/pages/uomSetup/UomForm";
import MaterialGroupForm from "@/modules/inventory/pages/materialGroupSetup/MaterialGroupForm";
import IEMachineForm from "@/modules/iE/pages/machinesSetup/MachinesSetupForm";

const sizeClassMap: Record<string, string> = {
    sm: "w-[400px]",
    md: "w-[600px]",
    lg: "w-[800px]",
};

const modalComponents: Record<MODAL_TYPE_KEY, React.FC<{ id?: string }>> = {
    [MODAL_KEYS.FLOOR_ADD]: FloorForm,
    [MODAL_KEYS.SECTION_ADD]: SectionForm,
    [MODAL_KEYS.LINE_ADD]: LineForm,
    [MODAL_KEYS.UOM_ADD]: UomForm,
    [MODAL_KEYS.IE_MACHINES_ADD]: IEMachineForm,
    [MODAL_KEYS.MATERIALGROUP_ADD]: MaterialGroupForm,
};

export default function ModalWrapper() {
    const { type, action, id } = useParams();
    const navigate = useNavigate();
    const [size, setSize] = useState<"sm" | "md" | "lg">("md");

    const key = `${type}/${action}`;
    const ModalComponent = modalComponents[key as MODAL_TYPE_KEY];

    const closeModal = () => {
        navigate(-1); // or custom background location
    };

    const toggleSize = () => {
        setSize((prev) =>
            prev === "sm" ? "md" : prev === "md" ? "lg" : "sm"
        );
    };

    if (!ModalComponent) return null;

    return (
        <div className="default fixed inset-0 z-50 flex items-center justify-center transition-all">
            <div
                className={`relative bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-10 rounded-2xl shadow-lg transition-all duration-300 ${sizeClassMap[size]}`}
            >
                {/* Close Button */}
                <button
                    className="absolute top-2 right-2 p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 cursor-pointer"
                    onClick={closeModal}
                    title="Close"
                >
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>

                {/* Size Toggle Button */}
                <button
                    className="absolute top-2 left-2 p-2 text-gray-600 dark:text-gray-300 cursor-pointer"
                    onClick={toggleSize}
                    title="Toggle Size"
                >
                    <FontAwesomeIcon icon={size === "lg" ? faCompress : faExpand} />
                </button>

                {/* Render Dynamic Modal Content */}
                <ModalComponent id={id} />
            </div>
        </div>
    );
}
