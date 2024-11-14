"use client";
import React from "react";
import AddNestedJob from "./AddNestedJob";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Divider,
} from "@nextui-org/react";
import { HiMiniQueueList } from "react-icons/hi2";

import AddNewChecker from "./AddNewChecker";
import WidgetCarousel from "./WidgetCarousel";
import AutomatedJobs, { AutomatedJob } from "./AutomatedJobs";
import ActionsSection from "./ActionsSection";

type Props = {};

const OracleDashboard = (props: Props) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = React.useState<
    "job" | "checker" | "rule" | null
  >(null);

  const checkers = [
    {
      name: "Checker 1",
      comparison_val: 990283823,
      real_val: 990283823,
      intersections: [],
    },
    {
      name: "Checker 2",
      comparison_val: 990283823,
      real_val: 990283823,
      intersections: [],
    },
  ];

  const automatedJobs: AutomatedJob[] = [
    {
      name: "Job 1",
      description: "Job 1 Description",
      createdAt: "11/14/2024 12:00 PM",
    },
    {
      name: "Job 2",
      description: "Job 2 Description",
      createdAt: "11/14/2024 12:00 PM",
    },
    {
      name: "Job 3",
      description: "Job 3 Description",
      createdAt: "11/14/2024 12:00 PM",
    },
  ];
  const handleOpenModal = (type: "job" | "checker" | "rule") => {
    setModalType(type);
    onOpen();
  };

  const getModalTitle = () => {
    switch (modalType) {
      case "job":
        return "Add Job";
      case "checker":
        return "Add Checker";
      case "rule":
        return "Add Rule";
      default:
        return "";
    }
  };

  const getModalContent = () => {
    switch (modalType) {
      case "job":
        return <AddNestedJob />;
      case "checker":
        return <AddNewChecker />;
      case "rule":
        return <div>Rule Form Coming Soon</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid gap-6">
        {/* Header Section */}
        <div className="bg-content1 rounded-lg p-4 shadow-sm">
          <h1 className="text-2xl font-semibold mb-2">Oracle Dashboard</h1>
          <p className="text-default-500">
            Monitor and manage your automated tasks
          </p>
        </div>

        {/* Widgets Section */}
        <div className="bg-content1 rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Status Overview</h2>
          <WidgetCarousel checkers={checkers} />
        </div>

        {/* Actions Section */}
        <div className="bg-content1 rounded-lg p-4 shadow-sm">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <HiMiniQueueList /> <span>Actions</span>
          </h2>
          <p className="text-sm text-gray-500">
            Add a job, checker or rule to get started
          </p>
          <ActionsSection onOpenModal={handleOpenModal} />
        </div>

        {/* Jobs Section */}
        <div className="bg-content1 rounded-lg p-4 shadow-sm">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <HiMiniQueueList /> <span>Automated Jobs</span>
          </h2>
          <p className="text-sm text-gray-500">
            View and manage your automated jobs
          </p>
          <AutomatedJobs automatedJobs={automatedJobs} />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {getModalTitle()}
              </ModalHeader>
              <ModalBody>{getModalContent()}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default OracleDashboard;
