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
import { FaRegEdit, FaPlay } from "react-icons/fa";
import CreateJob from "../Oracle/Actions/AddNestedJob";
import client from "@/utils/client";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineReplay } from "react-icons/md";
import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    onUpdate();
    onClose();
  };

  const handleTriggerJob = async () => {
    setIsLoading(true);
    try {
      await client.post(
        "/v2/api/run_shortcut/",
        { id: Number(job.id) },
        { headers: { LIVE: 0 } }
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
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                job.status ? "bg-green-400" : "bg-red-400"
              }`}
            ></span>
            <p className="text-gray-300">
              {job.status ? "Active" : "Inactive"}
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
    </>
  );
}
