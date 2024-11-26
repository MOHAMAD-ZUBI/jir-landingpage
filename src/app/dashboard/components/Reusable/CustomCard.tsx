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
  ModalFooter,
} from "@nextui-org/react";
import { FaRegEdit, FaPlay, FaTrash } from "react-icons/fa";
import CreateJob from "../Oracle/Actions/AddNestedJob";
import client from "@/utils/client";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineReplay } from "react-icons/md";
import { useState } from "react";
import { useEnvironment } from "@/context/EnvironmentContext";
import { useWorkspace } from "@/context/WorkspaceContext";

interface JobCard {
  id: number;
  title: string;
  name: string;
  status: boolean;
  sharedWGroups: boolean;
  last_status: 1 | 2 | 3;
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
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { currentWorkspace } = useWorkspace();
  const { environment } = useEnvironment();

  const handleClose = () => {
    onUpdate();
    onClose();
  };

  const handleTriggerJob = async () => {
    setIsLoading(true);
    try {
      await client.post(
        `/v2/api/platforms/${currentWorkspace?.id}/run_shortcut/`,
        { id: Number(job.id) },
        { headers: { LIVE: environment } }
      );

      await toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
        loading: "Triggering job...",
        success: "Job triggered successfully!",
        error: "Failed to trigger job.",
      });
    } catch (error) {
      toast.error("Failed to trigger job.");
      console.error("Error triggering job:", error);
      console.log("Full error:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
        payload: { id: job.id },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await client.delete(
        `/v2/api/platforms/${currentWorkspace?.id}/shortcuts/${job.id}/`,
        {
          headers: { LIVE: environment },
        }
      );

      toast.success("Job deleted successfully!");
      onDeleteClose();
      onUpdate();
    } catch (error) {
      toast.error("Failed to delete job");
      console.error("Error deleting job:", error);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <Card className="max-w-[400px] w-full hover:scale-[1.02] transition-transform duration-200 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900 text-white border border-slate-700">
        <CardHeader className="flex gap-3 pb-2">
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between items-center">
              <p className="text-xl font-bold tracking-wide">{job.title}</p>
              <div className="flex gap-2">
                <Button
                  isIconOnly
                  className="bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
                  size="sm"
                  onClick={handleTriggerJob}
                  isDisabled={isLoading}
                >
                  <MdOutlineReplay
                    className={`text-white ${isLoading ? "animate-spin" : ""}`}
                    size={20}
                  />
                </Button>
                <Button
                  isIconOnly
                  className="bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
                  size="sm"
                  onClick={onOpen}
                >
                  <FaRegEdit className="text-white" size={16} />
                </Button>
                <Button
                  isIconOnly
                  className="bg-red-700/50 hover:bg-red-600/50 transition-colors"
                  size="sm"
                  onClick={onDeleteOpen}
                >
                  <FaTrash className="text-white" size={16} />
                </Button>
              </div>
            </div>
            <p className="text-small text-gray-300 flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  job.sharedWGroups ? "bg-green-400" : "bg-yellow-400"
                }`}
              ></span>
              {job.sharedWGroups ? "Shared" : "Private"}
            </p>
            <p className="text-xs text-gray-300">
              {job.sharedWGroups
                ? "Job is shared with group"
                : "Job is not shared with group"}
            </p>
          </div>
        </CardHeader>
        <Divider className="bg-slate-700/50" />
        <CardBody className="py-3">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-400">Last Status</p>
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  job.last_status === 2
                    ? "bg-green-400"
                    : job.last_status === 1
                    ? "bg-blue-400"
                    : "bg-red-400"
                }`}
              ></span>
              <p className="text-gray-300">
                {job.last_status === 2
                  ? "Completed"
                  : job.last_status === 1
                  ? "Loading"
                  : "Failed"}
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              This is the most recent execution status
            </p>
          </div>
        </CardBody>
        <Divider className="bg-slate-700/50" />
      </Card>

      <Modal size="4xl" isOpen={isOpen} onClose={handleClose}>
        <ModalContent className="max-h-[80vh] overflow-y-auto">
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

      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this job? This action cannot be
            undone.
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={onDeleteClose}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
