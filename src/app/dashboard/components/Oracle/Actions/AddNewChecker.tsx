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
    key: string;
    value: string | number;
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
        intersection_json: {
          key: "",
          value: "",
        },
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
          intersection_json: {
            key: "",
            value: "",
          },
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

  const updateIntersection = (index: number, field: string, value: any) => {
    const newIntersections = [...formData.intersections];
    if (field === "op") {
      newIntersections[index].op = value;
    } else {
      newIntersections[index].intersection_json = {
        ...newIntersections[index].intersection_json,
        [field]: value,
      };
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
          intersection_json: {
            [intersection.intersection_json.key]: isNaN(
              Number(intersection.intersection_json.value)
            )
              ? intersection.intersection_json.value
              : Number(intersection.intersection_json.value),
          },
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
            intersection_json: {
              key: "",
              value: "",
            },
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
    <Card className="p-6 max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
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

          {formData.intersections.map((intersection, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 p-4 border rounded-lg"
            >
              <div className="col-span-3">
                <Select
                  label="Operation"
                  placeholder="Select operation"
                  selectedKeys={[intersection.op]}
                  onChange={(e) =>
                    updateIntersection(index, "op", e.target.value)
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
              <div className="col-span-4">
                <Input
                  label="Dimension Key"
                  placeholder="Enter key"
                  value={intersection.intersection_json.key}
                  onChange={(e) =>
                    updateIntersection(index, "key", e.target.value)
                  }
                  isRequired
                />
              </div>
              <div className="col-span-4">
                <Input
                  label="Value"
                  placeholder="Enter value"
                  value={intersection.intersection_json.value}
                  onChange={(e) =>
                    updateIntersection(index, "value", e.target.value)
                  }
                  isRequired
                />
              </div>
              <div className="col-span-1 flex items-end justify-center">
                <Button
                  isIconOnly
                  color="danger"
                  variant="light"
                  onClick={() => removeIntersection(index)}
                  disabled={formData.intersections.length === 1}
                >
                  <FaTrash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button
          type="submit"
          color="primary"
          isLoading={isLoading}
          isDisabled={isLoading || !formData.name || !formData.comparison_val}
          className="w-full"
        >
          Create Checkers
        </Button>
      </form>
    </Card>
  );
};

export default AddNewChecker;
