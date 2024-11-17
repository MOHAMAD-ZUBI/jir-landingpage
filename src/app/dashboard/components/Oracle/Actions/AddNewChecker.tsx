"use client";

import React, { useState } from "react";
import {
  Input,
  Button,
  Switch,
  Card,
  Select,
  SelectItem,
} from "@nextui-org/react";
import client from "@/utils/client";
import toast, { Toaster } from "react-hot-toast";
import { IoAdd } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";

interface Intersection {
  op: "add" | "subtract" | "none";
  intersection_json: {
    [key: string]: string | number;
  };
}

const operationOptions = [
  { label: "Add", value: "add" },
  { label: "Subtract", value: "subtract" },
  { label: "None", value: "none" },
];

const AddNewChecker = () => {
  const [formData, setFormData] = useState({
    name: "",
    schedule: true,
    comparison_val: "",
    intersections: [
      {
        op: "add" as const,
        intersection_json: {},
        dimensions: [{ key: "", value: "" }],
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(false);

  const addIntersection = () => {
    setFormData({
      ...formData,
      intersections: [
        ...formData.intersections,
        {
          op: "add",
          intersection_json: {},
          dimensions: [{ key: "", value: "" }],
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
    newIntersections[intersectionIndex].dimensions.push({ key: "", value: "" });
    setFormData({ ...formData, intersections: newIntersections });
  };

  const removeDimension = (
    intersectionIndex: number,
    dimensionIndex: number
  ) => {
    const newIntersections = [...formData.intersections];
    if (newIntersections[intersectionIndex].dimensions.length === 1) return;
    newIntersections[intersectionIndex].dimensions = newIntersections[
      intersectionIndex
    ].dimensions.filter((_, i) => i !== dimensionIndex);
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
      newIntersections[intersectionIndex].dimensions[dimensionIndex!][field] =
        value;
      newIntersections[intersectionIndex].intersection_json = newIntersections[
        intersectionIndex
      ].dimensions.reduce(
        (acc, dim) => ({
          ...acc,
          [dim.key]: isNaN(Number(dim.value)) ? dim.value : Number(dim.value),
        }),
        {}
      );
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

      await client.post("/v2/api/newchecker/", payload);
      toast.success("Checker created successfully");
      // Reset form
      setFormData({
        name: "",
        schedule: true,
        comparison_val: "",
        intersections: [
          {
            op: "add",
            intersection_json: {},
            dimensions: [{ key: "", value: "" }],
          },
        ],
      });
    } catch (error) {
      console.error("Error creating checker:", error);
      toast.error("Failed to create checker");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-2xl flex flex-col h-[80vh]">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="space-y-6 flex-1 overflow-y-auto">
          <Toaster position="top-right" />
          <Input
            label="Checker Name"
            placeholder="Enter checker name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

                {intersection.dimensions.map((dimension, dimensionIndex) => (
                  <div key={dimensionIndex} className="grid grid-cols-9 gap-4">
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
                        placeholder="Enter value."
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
                        disabled={intersection.dimensions.length === 1}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                ))}

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
        </div>

        <Button
          type="submit"
          color="primary"
          isLoading={isLoading}
          isDisabled={isLoading || !formData.name || !formData.comparison_val}
          className="w-full mt-4"
        >
          Create Checker
        </Button>
      </form>
    </Card>
  );
};

export default AddNewChecker;
