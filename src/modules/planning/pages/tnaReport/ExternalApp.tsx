import Modal from "@/components/feedback-interaction/Modal";
import React, { useEffect } from "react";
import TaskDetailsData from "./TaskDetailsData";
import Breadcrumb from "@/components/layout/Breadcrumb";

const ExternalApp: React.FC = () => {
  const ExternalURL = import.meta.env.VITE_EXTERNAL_URL;
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<any>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // SECURITY: Check origin if needed
      if (event.origin !== ExternalURL) return;

      if (event.data.type === "PLANNING_TASK_PREVIEW") {
        console.log("Received from iframe:", event.data.payload);
        setSelectedTask(event.data.payload);
        setIsModalVisible(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedTask(null);
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Planning Board List", href: "/" },
    { label: "Sewing Planning Board" }, // no href = current page
  ];

  return (
    <div className="w-full h-[calc(100vh+200px)] ">

      <Breadcrumb items={breadcrumbItems} />

      <iframe
        src={`${ExternalURL}/app/planning/planning-board/1`}
        title="External App"
        className="w-full h-full border-0"
      />

      {isModalVisible && selectedTask && (
        <Modal
          isOpen={true}
          widthClass="max-w-6xl"
          heightClass="max-h-screen"
          onClose={closeModal}
          title="Task Details"
        >
          <TaskDetailsData data={selectedTask} />

        </Modal>
      )}

    </div>
  );
};

export default ExternalApp;
