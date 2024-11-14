"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import React from "react";
import { HiMiniQueueList } from "react-icons/hi2";

type Props = {
  onOpenModal: (type: "job" | "checker" | "rule") => void;
};

const ActionsSection = ({ onOpenModal }: Props) => {
  return (
    <div className="space-y-2">
      <div className="flex mt-2 gap-4">
        <Button color="primary" onPress={() => onOpenModal("job")}>
          Add Job
        </Button>
        <Button color="primary" onPress={() => onOpenModal("checker")}>
          Add Checker
        </Button>
        <Button color="primary" onPress={() => onOpenModal("rule")}>
          Add Rule
        </Button>
      </div>
    </div>
  );
};

export default ActionsSection;
