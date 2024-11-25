"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Switch,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { IoAdd } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import client from "@/utils/client";
import toast from "react-hot-toast";

interface EditCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  checker: any;
}

const operationOptions = [
  { label: "Add", value: "add" },
  { label: "Subtract", value: "sub" },
  { label: "None", value: "none" },
];

const EditCheckerModal = ({
  isOpen,
  onClose,
  checker,
}: EditCheckerModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    schedule: true,
    comparison_val: "",
    intersections: [
      {
        op: "add" as const,
        intersection_json: {},
        dimensions: JSON.stringify([{ key: "", value: "" }]),
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (checker) {
      const formattedIntersections = checker.intersections.map(
        (intersection) => ({
          op: intersection.op,
          intersection_json: intersection.intersection_json,
          dimensions: JSON.stringify(
            Object.entries(intersection.intersection_json).map(
              ([key, value]) => ({
                key,
                value,
              })
            )
          ),
        })
      );

      setFormData({
        name: checker.name,
        schedule: checker.schedule,
        comparison_val: checker.comparison_val.toString(),
        intersections: formattedIntersections,
      });
    }
  }, [checker]);

  const addIntersection = () => {
    setFormData({
      ...formData,
      intersections: [
        ...formData.intersections,
        {
          op: "add",
          intersection_json: {},
          dimensions: JSON.stringify([{ key: "", value: "" }]),
        },
      ],
    });
  };

  const removeIntersection = (index: number) => {
    if (formData.intersections.length === 1) return;
    const newIntersections = formData.intersections.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, intersections: newIntersections });
  };

  const addDimension = (intersectionIndex: number) => {
    const newIntersections = [...formData.intersections];
    const dimensions = JSON.parse(
      newIntersections[intersectionIndex].dimensions
    );
    dimensions.push({ key: "", value: "" });
    newIntersections[intersectionIndex].dimensions = JSON.stringify(dimensions);
    setFormData({ ...formData, intersections: newIntersections });
  };

  const removeDimension = (
    intersectionIndex: number,
    dimensionIndex: number
  ) => {
    const newIntersections = [...formData.intersections];
    const dimensions = JSON.parse(
      newIntersections[intersectionIndex].dimensions
    );
    if (dimensions.length === 1) return;

    const newDimensions = dimensions.filter((_, i) => i !== dimensionIndex);
    newIntersections[intersectionIndex].dimensions =
      JSON.stringify(newDimensions);
    setFormData({ ...formData, intersections: newIntersections });
  };

  const updateIntersection = (
    intersectionIndex: number,
    field: string,
    value: any,
    dimensionIndex?: number
  ) => {
    const newIntersections = [...formData.intersections];
    if (field === "op") {
      newIntersections[intersectionIndex].op = value;
    } else {
      const dimensions = JSON.parse(
        newIntersections[intersectionIndex].dimensions
      );
      dimensions[dimensionIndex][field] = value;
      newIntersections[intersectionIndex].dimensions =
        JSON.stringify(dimensions);

      const formattedJson = {};
      dimensions.forEach((dim) => {
        if (dim.key && dim.value) {
          formattedJson[dim.key] = dim.value;
        }
      });
      newIntersections[intersectionIndex].intersection_json = formattedJson;
    }
    setFormData({ ...formData, intersections: newIntersections });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        comparison_val: Number(formData.comparison_val),
        intersections: formData.intersections.map((intersection) => ({
          op: intersection.op,
          intersection_json: intersection.intersection_json,
        })),
      };

      await client.put(`/v2/api/newchecker/${checker.id}/`, payload);
      toast.success("Checker updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating checker:", error);
      toast.error("Failed to update checker");
    } finally {
      setIsLoading(false);
    }
  };

  if (!checker) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>Edit Checker</ModalHeader>
        <ModalBody className="overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6 pb-6">
            <Input
              label="Checker Name"
              placeholder="Enter checker name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              isRequired
            />

            <Input
              label="Comparison Value"
              type="number"
              placeholder="Enter comparison value"
              value={formData.comparison_val}
              onChange={(e) =>
                setFormData({ ...formData, comparison_val: e.target.value })
              }
              isRequired
            />

            <div className="flex items-center gap-2">
              <Switch
                isSelected={formData.schedule}
                onValueChange={(value) =>
                  setFormData({ ...formData, schedule: value })
                }
              />
              <span>Schedule Enabled</span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Intersections</h3>
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  onClick={addIntersection}
                  startContent={<IoAdd className="h-4 w-4" />}
                >
                  Add Intersection
                </Button>
              </div>

              {formData.intersections.map((intersection, intersectionIndex) => (
                <div
                  key={intersectionIndex}
                  className="space-y-4 p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Select
                        label="Operation"
                        placeholder="Select operation"
                        selectedKeys={[intersection.op]}
                        onChange={(e) =>
                          updateIntersection(
                            intersectionIndex,
                            "op",
                            e.target.value
                          )
                        }
                        isRequired
                      >
                        {operationOptions.map((op) => (
                          <SelectItem key={op.value} value={op.value}>
                            {op.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      onClick={() => removeIntersection(intersectionIndex)}
                      disabled={formData.intersections.length === 1}
                      className="mb-2"
                    >
                      <FaTrash className="h-4 w-4" />
                    </Button>
                  </div>

                  {JSON.parse(intersection.dimensions).map(
                    (dimension, dimensionIndex) => (
                      <div
                        key={dimensionIndex}
                        className="grid grid-cols-9 gap-4"
                      >
                        <div className="col-span-4">
                          <Input
                            label="Dimension Key"
                            placeholder="Enter key"
                            value={dimension.key}
                            onChange={(e) =>
                              updateIntersection(
                                intersectionIndex,
                                "key",
                                e.target.value,
                                dimensionIndex
                              )
                            }
                            isRequired
                          />
                        </div>
                        <div className="col-span-4">
                          <Input
                            label="Value"
                            placeholder="Enter value"
                            value={dimension.value}
                            onChange={(e) =>
                              updateIntersection(
                                intersectionIndex,
                                "value",
                                e.target.value,
                                dimensionIndex
                              )
                            }
                            isRequired
                          />
                        </div>
                        <div className="col-span-1 flex items-end justify-center">
                          <Button
                            isIconOnly
                            color="danger"
                            variant="light"
                            onClick={() =>
                              removeDimension(intersectionIndex, dimensionIndex)
                            }
                            disabled={
                              JSON.parse(intersection.dimensions).length === 1
                            }
                          >
                            <FaTrash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  )}

                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    onClick={() => addDimension(intersectionIndex)}
                    startContent={<IoAdd className="h-4 w-4" />}
                  >
                    Add Dimension
                  </Button>
                </div>
              ))}
            </div>

            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              className="w-full"
            >
              Update Checker
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditCheckerModal;
