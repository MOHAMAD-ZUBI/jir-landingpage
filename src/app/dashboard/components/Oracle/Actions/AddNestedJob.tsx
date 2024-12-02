"use client";

import { useEffect, useState } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Select,
  SelectItem,
} from "@nextui-org/react";
import client from "@/utils/client";
import toast, { Toaster } from "react-hot-toast";
import { Job, Rule } from "../../../../../../types";
import { useWorkspace } from "@/context/WorkspaceContext";

export default function CreateJob({
  onOpenRuleModal,
  initialData,
  isEditing = false,
  onSuccess,
  onClose,
}: {
  onOpenRuleModal: () => void;
  initialData?: Job;
  isEditing?: boolean;
  onSuccess?: () => void;
  onClose?: () => void;
}) {
  const [formData, setFormData] = useState<Job>(
    initialData || {
      name: "",
      id: 0,
      is_active: true,
      shared_w_groups: false,
      type: 1,
      user: 0,
      groups: [],
      rules: [
        {
          rule: 0,
          id: 0,
          name: "",
          index: 0,
          continue_if_failed: false,
          params: [{ name: "", value: "" }],
        },
      ],
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [Rules, setRules] = useState<Rule[]>([]);
  const { currentWorkspace } = useWorkspace();

  console.log({ formData });

  const fetchRules = async () => {
    const { data } = await client.get(
      `/v2/api/platforms/${currentWorkspace?.id}/rules/`
    );
    setRules(data);
  };

  useEffect(() => {
    fetchRules();
  }, []);

  console.log({ Rules });

  const handleAddRule = () => {
    setFormData((prev) => ({
      ...prev,
      rules: [
        ...prev.rules,
        {
          rule: 0,
          id: 0,
          name: "",
          index: prev.rules.length,
          continue_if_failed: false,
          params: [{ name: "", value: "" }],
        },
      ],
    }));
  };

  const handleAddParam = (ruleIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      rules: prev.rules.map((rule, idx) =>
        idx === ruleIndex
          ? { ...rule, params: [...rule.params, { name: "", value: "" }] }
          : rule
      ),
    }));
  };

  const handleDeleteParam = (ruleIndex: number, paramIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      rules: prev.rules.map((rule, idx) =>
        idx === ruleIndex
          ? {
              ...rule,
              params: rule.params.filter((_, pIdx) => pIdx !== paramIndex),
            }
          : rule
      ),
    }));
  };

  const handleRuleChange = (ruleIndex: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      rules: prev.rules.map((rule, idx) =>
        idx === ruleIndex ? { ...rule, [field]: value } : rule
      ),
    }));
  };

  const handleParamChange = (
    ruleIndex: number,
    paramIndex: number,
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      rules: prev.rules.map((rule, rIdx) =>
        rIdx === ruleIndex
          ? {
              ...rule,
              params: rule.params.map((param, pIdx) =>
                pIdx === paramIndex ? { ...param, [field]: value } : param
              ),
            }
          : rule
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const updatedFormData = {
      ...formData,
      shared_w_groups: formData.shared_w_groups || false,
    };

    const hasEmptyParams = updatedFormData.rules.some(
      (rule) =>
        rule.params.length === 0 ||
        rule.params.some((param) => !param.name.trim() || !param.value.trim())
    );

    if (hasEmptyParams) {
      setError(
        "Each rule must have at least one parameter with both name and value"
      );
      toast.error(
        "Each rule must have at least one parameter with both name and value"
      );
      setLoading(false);
      return;
    }

    try {
      if (isEditing) {
        await client.put(
          `/v2/api/platforms/${currentWorkspace?.id}/shortcuts/${initialData?.id}/`,
          updatedFormData
        );
      } else {
        await client.post(
          `/v2/api/platforms/${currentWorkspace?.id}/shortcuts/`,
          updatedFormData
        );
      }

      toast.success(
        isEditing ? "Job updated successfully!" : "Job created successfully!"
      );

      // Log to verify function calls
      console.log("Refreshing jobs...");
      if (onSuccess) {
        await onSuccess();
      }

      console.log("Closing modal...");
      if (onClose) {
        onClose();
      }
    } catch (err: any) {
      toast.error(
        isEditing ? "Failed to update job." : "Failed to create job."
      );
      setError(err.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRule = (ruleIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      rules: prev.rules
        .filter((_, idx) => idx !== ruleIndex)
        .map((rule, idx) => ({
          ...rule,
          index: idx, // Update indices after deletion
        })),
    }));
  };

  const handleCreateRule = () => {
    onOpenRuleModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Toaster position="top-right" />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="space-y-4">
        <Input
          label="Job Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <Checkbox
          isSelected={formData.shared_w_groups}
          onValueChange={(checked) =>
            setFormData({ ...formData, shared_w_groups: checked })
          }
        >
          Share with Groups
        </Checkbox>

        {formData.rules?.map((rule, ruleIndex) => (
          <Card key={ruleIndex} className="p-2">
            <CardBody className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-row gap-4 w-full items-center">
                  <Select
                    label="Rule"
                    selectedKeys={[rule.rule.toString()]}
                    onChange={(e) =>
                      handleRuleChange(
                        ruleIndex,
                        "rule",
                        parseInt(e.target.value)
                      )
                    }
                    className="flex-1"
                    defaultSelectedKeys={[rule.rule.toString()]}
                  >
                    {Rules?.map((rule) => (
                      <SelectItem key={rule.id} value={rule.id.toString()}>
                        {rule.name}
                      </SelectItem>
                    ))}
                  </Select>

                  <Button
                    color="danger"
                    variant="light"
                    isIconOnly
                    onClick={() => handleDeleteRule(ruleIndex)}
                    className="min-w-unit-10"
                    disabled={formData.rules.length === 1}
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </Button>
                </div>

                <div className="flex flex-row gap-4 w-full items-center">
                  <Checkbox
                    isSelected={!!rule.continue_if_failed}
                    onValueChange={(checked) =>
                      handleRuleChange(ruleIndex, "continue_if_failed", checked)
                    }
                  >
                    Continue if failed
                  </Checkbox>

                  <Button
                    color="primary"
                    variant="flat"
                    onClick={() => handleCreateRule()}
                    type="button"
                  >
                    New Rule
                  </Button>
                </div>
              </div>

              {rule.params?.map((param, paramIndex) => (
                <div key={paramIndex} className="flex gap-4">
                  <Input
                    label="Parameter Name"
                    value={param.name}
                    onChange={(e) =>
                      handleParamChange(
                        ruleIndex,
                        paramIndex,
                        "name",
                        e.target.value
                      )
                    }
                    className="flex-1"
                    isRequired={paramIndex === 0}
                  />
                  <Input
                    label="Parameter Value"
                    value={param.value}
                    onChange={(e) =>
                      handleParamChange(
                        ruleIndex,
                        paramIndex,
                        "value",
                        e.target.value
                      )
                    }
                    className="flex-1"
                    isRequired={paramIndex === 0}
                  />
                  <Button
                    color="danger"
                    className="flex items-center justify-center text-center"
                    variant="light"
                    isIconOnly
                    onClick={() => handleDeleteParam(ruleIndex, paramIndex)}
                    disabled={paramIndex === 0 && rule.params.length === 1}
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
              ))}

              <Button
                color="primary"
                variant="flat"
                onClick={() => handleAddParam(ruleIndex)}
                type="button"
              >
                Add Parameter.
              </Button>
            </CardBody>
          </Card>
        ))}

        <Button
          color="primary"
          variant="flat"
          onClick={handleAddRule}
          type="button"
          className="w-full"
        >
          Add Rule
        </Button>

        <Button
          color="primary"
          type="submit"
          isLoading={loading}
          className="w-full"
        >
          {isEditing ? "Update Job" : "Create Job"}
        </Button>
      </div>
    </form>
  );
}
