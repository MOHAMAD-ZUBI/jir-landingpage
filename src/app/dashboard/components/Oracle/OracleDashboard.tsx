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
} from "@nextui-org/react";

type Props = {};

const OracleDashboard = (props: Props) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = React.useState<
    "job" | "checker" | "rule" | null
  >(null);

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
        return <div>Checker Form Coming Soon</div>;
      case "rule":
        return <div>Rule Form Coming Soon</div>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-4">
        <Button color="primary" onPress={() => handleOpenModal("job")}>
          Add Job
        </Button>
        <Button color="primary" onPress={() => handleOpenModal("checker")}>
          Add Checker
        </Button>
        <Button color="primary" onPress={() => handleOpenModal("rule")}>
          Add Rule
        </Button>
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
