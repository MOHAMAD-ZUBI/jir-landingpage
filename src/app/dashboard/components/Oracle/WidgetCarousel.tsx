"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import client from "@/utils/client";
import { Button } from "@nextui-org/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditCheckerModal from "./EditCheckerModal";
import { useWorkspace } from "@/context/WorkspaceContext";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { toast } from "react-hot-toast";

interface Checker {
  id: number;
  name: string;
  matched: boolean;
  expected: number;
  actual: number;
  schedule: boolean;
  details: string;
  intersections?: {
    op: "add" | "sub" | "none";
    intersection_json: Record<string, string>;
  }[];
  shared_w_groups?: boolean;
  groups?: any[];
}

const WidgetCarousel = () => {
  const [checkers, setCheckers] = useState<Checker[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);
  const [selectedChecker, setSelectedChecker] = useState<Checker | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [checkerToDelete, setCheckerToDelete] = useState<Checker | null>(null);
  const { currentWorkspace } = useWorkspace();

  const fetchCheckers = async () => {
    try {
      // try {
      //   await client.post(
      //     `/v2/api/platforms/${currentWorkspace?.id}/force_checker/`
      //   );
      // } catch (error) {
      //   console.error("Failed to post to /v2/api/force_checker:", error);
      // }

      const { data } = await client.get(
        `/v2/api/platforms/${currentWorkspace?.id}/checked/`
      );
      const validatedData = data.map((checker: Checker) => ({
        ...checker,
        actual: checker.actual ?? 0,
        expected: checker.expected ?? 0,
      }));
      setCheckers(validatedData);
    } catch (error) {
      console.error("Error fetching checkers:", error);
    }
  };

  useEffect(() => {
    fetchCheckers();
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const handleEditClick = async (checkerId: number) => {
    try {
      const { data } = await client.get(
        `/v2/api/platforms/${currentWorkspace?.id}/newchecker/${checkerId}`
      );
      setSelectedChecker(data);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error("Error fetching checker details:", error);
    }
  };

  const handleDeleteClick = (checker: Checker) => {
    setCheckerToDelete(checker);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteChecker = async () => {
    if (!checkerToDelete) return;
    try {
      await client.delete(
        `/v2/api/platforms/${currentWorkspace?.id}/newchecker/${checkerToDelete.id}/`
      );
      toast.success("Checker deleted successfully!");
      setIsDeleteModalOpen(false);
      fetchCheckers(); // Refresh the list after deletion
    } catch (error) {
      toast.error("Failed to delete checker");
      console.error("Error deleting checker:", error);
    }
  };

  const handleForceCheck = async () => {
    const forceCheck = async () => {
      try {
        await client.post(
          `/v2/api/platforms/${currentWorkspace?.id}/force_checker/`
        );
      } catch (error) {
        console.error("Failed to post to /v2/api/force_checker:", error);
      }
    };

    toast.promise(forceCheck(), {
      loading: "Checking...",
      success: "Checkers updated successfully!",
      error: "Failed to update checkers.",
    });
  };

  return (
    <div className="relative">
      {/* Header section with title and force check button */}
      <div className="flex items-center justify-between mb-6">
        <div className="mb-6 text-sm max-md:text-xs text-gray-500">
          <p>Monitor and manage your checkers.</p>
        </div>
        <Button
          size="md"
          variant="bordered"
          onClick={handleForceCheck}
          className="bg-blue-500 text-white hover:bg-blue-500/80 transition-colors"
        >
          Force Check
        </Button>
      </div>

      {/* Carousel container with responsive alignment */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex md:justify-start justify-center">
          {checkers?.map((checker, index) => (
            <div
              key={checker.id}
              className={`flex-shrink-0 md:mx-6 mx-auto relative overflow-hidden ${
                checker.matched ? "bg-green-500" : "bg-red-500"
              } rounded-lg md:max-w-xl max-w-sm w-full shadow-lg`}
            >
              <svg
                className="absolute bottom-0 left-0 mb-8"
                viewBox="0 0 375 283"
                fill="none"
                style={{ transform: "scale(1.5)", opacity: "0.1" }}
              >
                <rect
                  x="159.52"
                  y="175"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 159.52 175)"
                  fill="white"
                />
                <rect
                  y="107.48"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 0 107.48)"
                  fill="white"
                />
              </svg>
              <div className="relative pt-10 px-10 flex items-center justify-center">
                <div
                  className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                  style={{
                    background: "radial-gradient(black, transparent 60%)",
                    transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                    opacity: "0.2",
                  }}
                ></div>
              </div>
              <div className="relative text-white px-6 pb-6 mt-6">
                {/* Checker name and actions */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">
                    {checker.name}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="bordered"
                      onClick={() => handleEditClick(checker.id)}
                      className="text-white hover:bg-white/20 border-white/30 transition-colors"
                    >
                      <FaEdit className="w-4 h-4" />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="bordered"
                      onClick={() => handleDeleteClick(checker)}
                      className="text-white hover:bg-red-500/20 border-red-500/30 transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Values display */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 rounded-lg p-4">
                    <span className="block text-sm text-white/70 mb-1">
                      Actual
                    </span>
                    <span className="text-lg font-bold text-white">
                      ${(checker.actual ?? 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <span className="block text-sm text-white/70 mb-1">
                      Expected
                    </span>
                    <span className="text-lg font-bold text-white">
                      ${(checker.expected ?? 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Status badge */}
                <div className="flex justify-end">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      checker.matched
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {checker.matched ? "Matched" : "Not Matched"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-opacity ${
          !canScrollPrev ? "opacity-0" : "opacity-100"
        }`}
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canScrollPrev}
      >
        <PiCaretLeftBold className="w-5 h-5" />
      </button>
      <button
        className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-opacity ${
          !canScrollNext ? "opacity-0" : "opacity-100"
        }`}
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canScrollNext}
      >
        <PiCaretRightBold className="w-5 h-5" />
      </button>

      {/* Edit Modal */}
      <EditCheckerModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedChecker(null);
          fetchCheckers(); // Refresh the list after editing
        }}
        checker={selectedChecker}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this checker? This action cannot be
            undone.
          </ModalBody>
          <ModalFooter>
            <Button
              color="default"
              variant="light"
              onPress={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button color="danger" onPress={handleDeleteChecker}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default WidgetCarousel;
