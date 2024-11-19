"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import CreateJob from "../Oracle/Actions/AddNestedJob";

interface JobCard {
  id: number;
  title: string;
  name: string;
  status: boolean;
  sharedWGroups: boolean;
  user?: number;
  groups?: any[];
  rules: Array<{
    rule: number;
    index: number;
    continue_if_failed: boolean;
    name?: string;
    params: Array<{
      name: string;
      value: string;
    }>;
  }>;
}

export default function App({
  job,
  onUpdate,
}: {
  job: JobCard;
  onUpdate: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = () => {
    onUpdate();
    onClose();
  };

  return (
    <>
      <Card className="max-w-[400px] bg-gradient-to-tl w-full from-gray-600 via-slate-800 to-slate-500 text-white">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between items-center">
              <p className="text-lg font-semibold">{job.title}</p>
              <Button
                isIconOnly
                className="bg-transparent"
                size="sm"
                onClick={onOpen}
              >
                <FaRegEdit className="text-white" size={20} />
              </Button>
            </div>
            <p className="text-small text-gray-100">
              Shared: {job.sharedWGroups ? "Yes" : "No"}
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Status: {job.status ? "Active" : "Inactive"}</p>
        </CardBody>
        <Divider />
      </Card>

      <Modal size="4xl" isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          <ModalHeader>Edit Job</ModalHeader>
          <ModalBody>
            <CreateJob
              onOpenRuleModal={() => {}}
              initialData={{
                id: job.id,
                name: job.title,
                is_active: job.status,
                shared_w_groups: job.sharedWGroups,
                type: 3,
                rules: (job.rules || []).map((rule) => ({
                  rule: rule.rule,
                  id: rule.rule,
                  name: rule.name || "",
                  index: rule.index,
                  continue_if_failed: rule.continue_if_failed,
                  params: rule.params.map((param) => ({
                    name: param.name,
                    value: param.value,
                  })),
                })),
                user: job.user || 0,
                groups: job.groups || [],
              }}
              isEditing={true}
              onSuccess={handleClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
