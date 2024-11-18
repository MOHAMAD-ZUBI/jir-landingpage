"use client";
import React, { useEffect, useState } from "react";
import client from "@/utils/client";
import { Input, Textarea, Button } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { Rule } from "../../../../../../types";

type Props = {
  onSuccess?: () => void;
};

const AddRule = ({ onSuccess }: Props) => {
  const [Rules, setRules] = useState<Rule[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    rule: "",
    type: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ruleTypes = [
    { name: "", id: 1 },
    {
      name: "Group",
      id: 2,
    },
    {
      name: "User",
      id: 3,
    },
    {
      name: "Role",
      id: 4,
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await client.post("/v2/api/rules/", formData);
      setFormData({ name: "", rule: "", type: 1 });
      onSuccess?.();
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 1500)), // Simulate API call
        {
          loading: "Creating rule...",
          success: "Rule created successfully!",
          error: "Failed to create rule.",
        }
      );
    } catch (err) {
      setError("Failed to create rule. Please try again.");
      toast.error("Failed to create rule. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 flex flex-col items-center w-full "
    >
      <Toaster position="top-right" />
      <Input
        id="name"
        name="name"
        label="Name"
        isRequired
        value={formData.name}
        onChange={handleChange}
        className="flex-1"
      />

      <Textarea
        id="rule"
        name="rule"
        label="Rule"
        value={formData.rule}
        onChange={handleChange}
        isRequired
        minRows={4}
        classNames={{
          label: "text-sm font-medium text-gray-700",
        }}
      />

      {error && <div className="text-danger text-sm">{error}</div>}

      <Button
        type="submit"
        isLoading={loading}
        isDisabled={loading || !formData.name || !formData.rule}
        color="primary"
        className="w-full"
      >
        {loading ? "Creating..." : "Create Rule"}
      </Button>
    </form>
  );
};

export default AddRule;
