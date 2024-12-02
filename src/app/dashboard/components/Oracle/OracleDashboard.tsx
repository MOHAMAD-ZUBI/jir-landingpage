"use client";
import React, { useEffect } from "react";
import AddNestedJob from "./Actions/AddNestedJob";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Divider,
  Switch,
  Tooltip,
} from "@nextui-org/react";
import { HiMiniQueueList } from "react-icons/hi2";
import { TbStatusChange } from "react-icons/tb";
import AddNewChecker from "./Actions/AddNewChecker";
import WidgetCarousel from "./WidgetCarousel";
import AutomatedJobs, { AutomatedJob } from "./AutomatedJobs";
import ActionsSection from "./ActionsSection";
import { MdOutlinePendingActions } from "react-icons/md";
import { SiEventstore } from "react-icons/si";
import AddRule from "./Actions/AddRule";
import { FaRegFileAlt } from "react-icons/fa";
import { useWorkspace, Workspace } from "@/context/WorkspaceContext";
import { useEnvironment } from "@/context/EnvironmentContext";
import Logs from "./Logs";

type Props = {};

const OracleDashboard = (props: Props) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { environment, setEnvironment } = useEnvironment();
  const { currentWorkspace } = useWorkspace();

  console.log({ currentWorkspace });
  const [modalType, setModalType] = React.useState<
    "job" | "checker" | "rule" | null
  >(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const workspaceKey = `workspace-${currentWorkspace.id}-${environment}`;

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
        return <AddNestedJob onOpenRuleModal={() => handleOpenModal("rule")} />;
      case "checker":
        return <AddNewChecker />;
      case "rule":
        return <AddRule />;
      default:
        return null;
    }
  };

  console.log({ useWorkspace });
  console.log({ environment });

  return (
    <div className="w-full max-w-[1500px] mx-auto">
      <div className="flex flex-col gap-6 w-full">
        {/* Header Section */}
        <div className="bg-content1 space-y-4 rounded-lg p-4 shadow-sm w-full">
          <div className="flex flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl max-md:text-lg font-semibold md:font-bold flex items-center gap-2">
                <HiMiniQueueList />{" "}
                <span>Oracle Dashboard - {currentWorkspace.email}</span>
              </h2>
              <p className="text-sm max-md:text-xs text-gray-500">
                Monitor and manage your automated tasks
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Tooltip
                content="Provide a test URL in workspace settings to enable testing environment"
                isDisabled={!!currentWorkspace.url_2}
              >
                <div>
                  <Switch
                    isSelected={
                      currentWorkspace.url_2 ? environment === 1 : true
                    }
                    onValueChange={(isSelected) => {
                      if (currentWorkspace.url_2) {
                        setEnvironment(isSelected ? 1 : 0);
                      }
                    }}
                    isDisabled={!currentWorkspace.url_2}
                  />
                </div>
              </Tooltip>
              <p className="text-sm max-md:text-xs text-gray-500">
                Live Environment
              </p>
            </div>
          </div>
          <div className="bg-content2/50 rounded-xl p-6 shadow-md w-full border border-content3/20 hover:border-content3/40 transition-colors">
            <h2 className="text-2xl max-md:text-xl font-semibold flex items-center gap-3 mb-3">
              <SiEventstore className="text-primary" />
              <span>Quick Actions</span>
            </h2>
            <p className="text-sm text-default-500 mb-4">
              Add a job, checker or rule to get started
            </p>
            <div className="mt-2">
              <ActionsSection onOpenModal={handleOpenModal} />
            </div>
          </div>
        </div>
        {/* Widgets Section */}
        <div className="bg-content1 rounded-lg p-4 shadow-sm w-full">
          <h2 className="text-2xl max-md:text-xl font-semibold md:font-bold flex items-center gap-2">
            <TbStatusChange /> <span>Checker Status</span>
          </h2>
          <WidgetCarousel key={`widgets-${workspaceKey}`} />
        </div>

        {/* Actions Section
        <div className="bg-content1 rounded-lg p-4 shadow-sm w-full">
          <h2 className="text-2xl max-md:text-xl font-semibold md:font-bold flex items-center gap-2">
            <SiEventstore /> <span>Actions</span>
          </h2>
          <p className="text-sm text-gray-500">
            Add a job, checker or rule to get started
          </p>
          <ActionsSection onOpenModal={handleOpenModal} />
        </div> */}

        {/* Jobs Section */}
        <div className="bg-content1 rounded-lg p-4  shadow-sm w-full">
          <h2 className="text-2xl max-md:text-xl font-semibold md:font-bold flex items-center gap-2">
            <MdOutlinePendingActions /> <span>Automated Jobs</span>
          </h2>
          <p className="text-sm text-gray-500">
            View and manage your automated jobs
          </p>
          <AutomatedJobs key={`jobs-${workspaceKey}`} />
        </div>

        {/* Logs Section */}

        <Logs key={`logs-${workspaceKey}`} />
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
