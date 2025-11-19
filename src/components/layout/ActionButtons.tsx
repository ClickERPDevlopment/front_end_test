import Button from "@/components/form/Button";
import {
  faCheckCircle,
  faEraser,
  faEye,
  faFloppyDisk,
  faPenToSquare,
  faTimes,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export type ActionType = "save" | "update" | "preview" | "clear" | "delete" | "approve" | "unApprove";


interface ActionButtonsProps {
  onAction: (action: ActionType) => void;
  show?: Partial<Record<ActionType, boolean>>;
  isEditMode?: boolean;
}

const actionStyles: Record<ActionType, string> = {
  save: "bg-green-600 hover:bg-green-700 text-white",
  update: "bg-blue-600 hover:bg-blue-700 text-white",
  clear: "bg-gray-500 hover:bg-gray-600 text-white",
  preview: "bg-purple-600 hover:bg-purple-700 text-white",
  delete: "bg-red-600 hover:bg-red-700 text-white",
  approve: "bg-amber-500 hover:bg-amber-600 text-white", 
  unApprove: "bg-red-500 hover:bg-red-600 text-white", 
};

// Map icons to actions
const actionIcons: Record<ActionType, any> = {
  save: faFloppyDisk,
  update: faPenToSquare,
  clear: faEraser,
  preview: faEye,
  delete: faTrash ,
  approve: faCheckCircle, 
  unApprove: faTimes
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onAction,
  show = { save: true, update: true, clear: true, preview: true, delete: true, approve: false, unApprove: false  },
  isEditMode = false,
}) => {
return (
  <div className="flex flex-wrap justify-end gap-1">
    {Object.entries(show).map(([key, visible]) => {
      if (!visible) return null;

      const action = key as ActionType;
      const isDisabled =
        (action === "save" && isEditMode) ||
        (action === "delete" && !isEditMode) ||
        (action === "preview" && !isEditMode) ||
        (action === "update" && !isEditMode) ||
        (action === "unApprove" && !isEditMode); 
        (action === "approve" && !isEditMode); 

      return (
        <Button
          variant="outlined"
          key={action}
          size="action"
          disabled={isDisabled}
          className={`${actionStyles[action]} px-1 flex items-center gap-2`}
          onClick={() => onAction(action)}
        >
          <FontAwesomeIcon icon={actionIcons[action]} />
          {action.charAt(0).toUpperCase() + action.slice(1)}
        </Button>
      );
    })}
  </div>
);

};
