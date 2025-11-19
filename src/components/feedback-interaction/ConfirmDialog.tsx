import FocusTrap from "focus-trap-react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { createPortal } from "react-dom";

export interface IConfirmDialog {
  open: boolean;
  title?: string;
  message?: string;
}

interface IConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { scale: 0.9, opacity: 0, y: -10 },
  visible: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0.9, opacity: 0, y: 10 },
};

const ConfirmDialog: React.FC<IConfirmDialogProps> = ({
  open,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "Yes",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  return (
    createPortal(<AnimatePresence>
      {open && (
        <FocusTrap>
          <motion.div
            className="fixed inset-0 z-999 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-[90%] max-w-sm p-6 relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-labelledby="dialog-title"
              aria-describedby="dialog-desc"
            >
              <h2 id="dialog-title" className="text-lg font-semibold text-gray-800">
                {title}
              </h2>
              <p id="dialog-desc" className="text-sm text-gray-600 mt-2 mb-6">
                {message}
              </p>

              <div className="flex justify-end gap-2">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  {confirmText}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </FocusTrap>
      )}
    </AnimatePresence>, document.body)
  );
};

export default ConfirmDialog;
