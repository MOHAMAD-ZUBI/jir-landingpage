"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import TıtleHeading from "../components/Reusable/TıtleHeading";
import client from "@/utils/client";

// Add workspace type enum
enum WorkspaceType {
  ORACLE_PBCS = 1,
  ODOO = 2,
  GTM_AGENT = 3,
}

interface WorkspaceTypeOption {
  id: WorkspaceType;
  label: string;
  description: string;
}

const workspaceTypes: WorkspaceTypeOption[] = [
  {
    id: WorkspaceType.ORACLE_PBCS,
    label: "Oracle PBCS",
    description: "Oracle Planning and Budgeting Cloud Service",
  },
  {
    id: WorkspaceType.ODOO,
    label: "Odoo",
    description: "Odoo ERP Integration",
  },
  {
    id: WorkspaceType.GTM_AGENT,
    label: "GTM Agent",
    description: "Go-to-Market Agent Integration",
  },
];

interface PlatformCredential {
  id?: number;
  email: string;
  url_1?: string;
  url_2?: string;
  password?: string;
  database?: string;
  serverUrl?: string;
  apiKey?: string;
  platform: WorkspaceType;
}

const CredentialsPage = () => {
  // State for existing credentials
  const [hyperionCredentials, setHyperionCredentials] = useState<
    PlatformCredential[]
  >([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedWorkspaceType, setSelectedWorkspaceType] =
    useState<WorkspaceType | null>(null);
  const [newCredential, setNewCredential] = useState({
    // Oracle PBCS fields
    email: "",
    password: "",
    url_1: "",
    url_2: "",
    // Odoo fields
    database: "",
    serverUrl: "",
    // GTM Agent fields
    apiKey: "",
  });

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Add new state for editing
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    email: "",
    url_1: "",
    url_2: "",
    password: "", // Optional for updates
  });

  // Fetch existing credentials on mount
  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const { data } = await client.get("/v2/api/platforms/");
        const hyperionCreds = data.filter(
          (cred: PlatformCredential) =>
            cred.platform === WorkspaceType.ORACLE_PBCS
        );
        setHyperionCredentials(hyperionCreds);
        console.log("Fetched credentials:", hyperionCreds);
      } catch (error) {
        console.error("Error fetching credentials:", error);
        toast.error("Failed to load credentials");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCredentials();
  }, []);

  // Handle input changes
  const handleChange = (field: keyof typeof newCredential, value: string) => {
    setNewCredential((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add validation function for each workspace type
  const isFormValid = () => {
    if (!selectedWorkspaceType) return false;

    switch (selectedWorkspaceType) {
      case WorkspaceType.ORACLE_PBCS:
        return !!(
          newCredential.email &&
          newCredential.password &&
          newCredential.url_1
        );

      case WorkspaceType.ODOO:
        return !!(
          newCredential.email &&
          newCredential.password &&
          newCredential.database &&
          newCredential.serverUrl
        );

      case WorkspaceType.GTM_AGENT:
        return !!newCredential.apiKey;

      default:
        return false;
    }
  };

  // Update the handleAddNew function with better error handling
  const handleAddNew = async () => {
    if (!selectedWorkspaceType) {
      toast.error("Please select a workspace type.");
      return;
    }

    if (!isFormValid()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      let payload: any = { platform: selectedWorkspaceType };

      switch (selectedWorkspaceType) {
        case WorkspaceType.ORACLE_PBCS:
          payload = {
            email: newCredential.email,
            password: newCredential.password,
            platform: WorkspaceType.ORACLE_PBCS,
            url_1: newCredential.url_1,
            url_2: newCredential.url_2,
          };
          break;
        case WorkspaceType.ODOO:
          payload = {
            email: newCredential.email,
            password: newCredential.password,
            platform: WorkspaceType.ODOO,
            database: newCredential.database,
            server_url: newCredential.serverUrl,
          };
          break;
        case WorkspaceType.GTM_AGENT:
          payload = {
            platform: WorkspaceType.GTM_AGENT,
            api_key: newCredential.apiKey,
          };
          break;
        default:
          throw new Error("Invalid workspace type");
      }

      const { data } = await client.post("/v2/api/platforms/", payload);
      setHyperionCredentials((prev) => [...prev, data]);
      setIsAddingNew(false);
      setSelectedWorkspaceType(null);
      setNewCredential({
        email: "",
        password: "",
        url_1: "",
        url_2: "",
        database: "",
        serverUrl: "",
        apiKey: "",
      });
      toast.success("New workspace added successfully!");
    } catch (error: any) {
      console.error("Error adding workspace:", error);

      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 400) {
          toast.error(error.response.data.message || "Invalid input data");
        } else if (error.response.status === 401) {
          toast.error("Authentication failed. Please log in again.");
        } else if (error.response.status === 403) {
          toast.error("You don't have permission to perform this action.");
        } else {
          toast.error("Server error. Please try again later.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("Network error. Please check your connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Handle updating existing credential
  const handleUpdate = async (id: number) => {
    try {
      // Only include fields that have been modified
      const updatedFields: any = {};
      if (editForm.email) updatedFields.email = editForm.email;
      if (editForm.url_1) updatedFields.url_1 = editForm.url_1;
      if (editForm.url_2) updatedFields.url_2 = editForm.url_2;
      if (editForm.password) updatedFields.password = editForm.password;

      if (Object.keys(updatedFields).length === 0) {
        toast.error("No changes made");
        return;
      }

      const { data } = await client.patch(`/v2/api/platforms/${id}/`, {
        ...updatedFields,
        platform: WorkspaceType.ORACLE_PBCS,
      });

      setHyperionCredentials((prev) =>
        prev.map((cred) => (cred.id === id ? data : cred))
      );

      setEditingId(null);
      setEditForm({
        email: "",
        url_1: "",
        url_2: "",
        password: "",
      });
      toast.success("Credentials updated successfully!");
    } catch (error: any) {
      console.error("Error updating credentials:", error);
      if (error.response?.status === 401) {
        toast.error("Authentication failed. Please log in again.");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to update credentials.");
      } else {
        toast.error("Failed to update credentials");
      }
    }
  };

  // Handle workspace type selection
  const handleWorkspaceTypeSelect = (typeId: WorkspaceType) => {
    console.log("Selected workspace type:", typeId);
    setSelectedWorkspaceType(typeId);
  };

  // Render form fields based on selected workspace type
  const renderWorkspaceFields = () => {
    switch (selectedWorkspaceType) {
      case WorkspaceType.ORACLE_PBCS:
        return (
          <>
            <Input
              label="Email"
              type="email"
              value={newCredential.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your Oracle Hyperion email"
              className="max-w-xl"
            />
            <Input
              label="Password"
              type="password"
              value={newCredential.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Enter your Oracle Hyperion password"
              className="max-w-xl"
            />
            <Input
              label="Primary URL"
              type="url"
              value={newCredential.url_1}
              onChange={(e) => handleChange("url_1", e.target.value)}
              placeholder="Enter your primary Oracle Hyperion URL"
              className="max-w-xl"
            />
            <Input
              label="Secondary URL"
              type="url"
              value={newCredential.url_2}
              onChange={(e) => handleChange("url_2", e.target.value)}
              placeholder="Enter your secondary Oracle Hyperion URL"
              className="max-w-xl"
            />
          </>
        );

      case WorkspaceType.ODOO:
        return (
          <>
            <Input
              label="Email"
              type="email"
              value={newCredential.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your Odoo email"
              className="max-w-xl"
            />
            <Input
              label="Password"
              type="password"
              value={newCredential.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Enter your Odoo password"
              className="max-w-xl"
            />
            <Input
              label="Database Name"
              type="text"
              value={newCredential.database}
              onChange={(e) => handleChange("database", e.target.value)}
              placeholder="Enter your Odoo database name"
              className="max-w-xl"
            />
            <Input
              label="Server URL"
              type="url"
              value={newCredential.serverUrl}
              onChange={(e) => handleChange("serverUrl", e.target.value)}
              placeholder="Enter your Odoo server URL"
              className="max-w-xl"
            />
          </>
        );

      case WorkspaceType.GTM_AGENT:
        return (
          <Input
            label="API Key"
            type="password"
            value={newCredential.apiKey}
            onChange={(e) => handleChange("apiKey", e.target.value)}
            placeholder="Enter your API key"
            className="max-w-xl"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <Toaster position="top-right" />
      <TıtleHeading
        title="Credentials"
        subheading="Manage your workspace credentials."
      />

      {isLoading ? (
        <div>Loading credentials...</div>
      ) : (
        <>
          {/* Existing Oracle Hyperion Workspaces */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Oracle Hyperion Workspaces
              </h2>
              <button
                onClick={() => setIsAddingNew(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Add New Workspace
              </button>
            </div>

            {/* Existing Credentials */}
            {hyperionCredentials.map((cred) => (
              <div key={cred.id} className="mb-8 p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium">Workspace #{cred.id}</h4>
                  <div className="relative" style={{ isolation: "isolate" }}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (editingId === cred.id) {
                          handleUpdate(cred.id);
                        } else {
                          setEditingId(cred.id);
                          setEditForm({
                            email: cred.email,
                            url_1: cred.url_1 || "",
                            url_2: cred.url_2 || "",
                            password: "",
                          });
                        }
                      }}
                      className="block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors no-underline relative z-10"
                      style={{
                        WebkitTapHighlightColor: "transparent",
                        touchAction: "manipulation",
                      }}
                    >
                      {editingId === cred.id ? "Save Changes" : "Edit"}
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Email"
                    type="email"
                    value={editingId === cred.id ? editForm.email : cred.email}
                    onChange={(e) =>
                      editingId === cred.id &&
                      setEditForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="max-w-xl"
                    disabled={editingId !== cred.id}
                  />
                  <Input
                    label="Primary URL"
                    type="url"
                    value={
                      editingId === cred.id ? editForm.url_1 : cred.url_1 || ""
                    }
                    onChange={(e) =>
                      editingId === cred.id &&
                      setEditForm((prev) => ({
                        ...prev,
                        url_1: e.target.value,
                      }))
                    }
                    className="max-w-xl"
                    disabled={editingId !== cred.id}
                  />
                  <Input
                    label="Secondary URL"
                    type="url"
                    value={
                      editingId === cred.id ? editForm.url_2 : cred.url_2 || ""
                    }
                    onChange={(e) =>
                      editingId === cred.id &&
                      setEditForm((prev) => ({
                        ...prev,
                        url_2: e.target.value,
                      }))
                    }
                    className="max-w-xl"
                    disabled={editingId !== cred.id}
                  />

                  {/* Password field only shows when editing */}
                  {editingId === cred.id && (
                    <Input
                      label="New Password (Optional)"
                      type="password"
                      value={editForm.password}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      placeholder="Leave blank to keep current password"
                      className="max-w-xl"
                    />
                  )}

                  {/* Cancel button when editing */}
                  {editingId === cred.id && (
                    <div className="relative" style={{ isolation: "isolate" }}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setEditingId(null);
                          setEditForm({
                            email: "",
                            url_1: "",
                            url_2: "",
                            password: "",
                          });
                        }}
                        className="block w-fit px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors no-underline relative z-10"
                        style={{
                          WebkitTapHighlightColor: "transparent",
                          touchAction: "manipulation",
                        }}
                      >
                        Cancel
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Add New Credential Form */}
            {isAddingNew && (
              <div className="mb-8 p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold mb-4">
                  Add New Workspace
                </h3>

                {/* Workspace Type Selection */}
                {!selectedWorkspaceType ? (
                  <div
                    className="flex flex-col space-y-3"
                    style={{ touchAction: "manipulation" }}
                  >
                    {workspaceTypes.map((type) => (
                      <div
                        key={type.id}
                        className="relative"
                        style={{ isolation: "isolate" }}
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleWorkspaceTypeSelect(type.id);
                          }}
                          className="block p-4 border rounded-lg bg-white hover:bg-gray-50 active:bg-gray-100 no-underline relative z-10"
                          style={{
                            WebkitTapHighlightColor: "transparent",
                            touchAction: "manipulation",
                          }}
                        >
                          <div className="flex flex-col">
                            <span className="font-semibold text-base">
                              {type.label}
                            </span>
                            <span className="text-sm text-gray-500 mt-1">
                              {type.description}
                            </span>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Back Button */}
                    <div className="flex items-center gap-2 mb-6">
                      <div
                        className="relative"
                        style={{ isolation: "isolate" }}
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedWorkspaceType(null);
                          }}
                          className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                          style={{
                            WebkitTapHighlightColor: "transparent",
                            touchAction: "manipulation",
                          }}
                        >
                          <span>←</span> Back
                        </a>
                      </div>
                      <span className="text-gray-700 font-medium">
                        {
                          workspaceTypes.find(
                            (t) => t.id === selectedWorkspaceType
                          )?.label
                        }
                      </span>
                    </div>

                    {/* Dynamic Form Fields */}
                    {renderWorkspaceFields()}

                    {/* Action Buttons */}
                    <div
                      className="flex flex-col sm:flex-row gap-3 mt-6"
                      style={{ touchAction: "manipulation" }}
                    >
                      <div
                        className="relative"
                        style={{ isolation: "isolate" }}
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddNew();
                          }}
                          className={`block text-center w-full sm:w-auto px-4 py-2 rounded-lg transition-colors no-underline relative z-10 ${
                            isFormValid()
                              ? "bg-primary text-white hover:bg-primary/90"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                          style={{
                            WebkitTapHighlightColor: "transparent",
                            touchAction: "manipulation",
                          }}
                          aria-disabled={!isFormValid()}
                        >
                          Add Workspace
                        </a>
                      </div>

                      <div
                        className="relative"
                        style={{ isolation: "isolate" }}
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedWorkspaceType(null);
                            setIsAddingNew(false);
                          }}
                          className="block text-center w-full sm:w-auto bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors no-underline relative z-10"
                          style={{
                            WebkitTapHighlightColor: "transparent",
                            touchAction: "manipulation",
                          }}
                        >
                          Cancel
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CredentialsPage;
