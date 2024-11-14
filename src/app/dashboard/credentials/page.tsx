"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import TıtleHeading from "../components/Reusable/TıtleHeading";

const CredentialsPage = () => {
  // Add state for form data
  const [formData, setFormData] = useState({
    hyperion: {
      email: "",
      url: "",
      password: "",
    },
    goToMarket: {
      apiKey: "",
    },
    odoo: {
      email: "",
      password: "",
      database: "",
      serverUrl: "",
    },
  });

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to save the credentials
      // For now, we'll just simulate a save
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 1500)), // Simulate API call
        {
          loading: "Saving credentials...",
          success: "Credentials saved successfully!",
          error: "Failed to save credentials.",
        }
      );
    } catch (error) {
      toast.error("An error occurred while saving credentials.");
    }
  };

  return (
    <div className="p-6 max-w-[1200px]">
      {/* Add Toaster component */}
      <Toaster position="top-right" />

      <TıtleHeading
        title="Credentials"
        subheading="Manage your workspace credentials."
      />

      {/* Oracle Hyperion Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">
          Oracle Hyperion Credentials
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Enter your Oracle Hyperion credentials to connect to your account.
        </p>
        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your Oracle Hyperion email"
            className="max-w-xl"
          />
          <Input
            label="URL"
            type="url"
            placeholder="Enter your Oracle Hyperion URL"
            className="max-w-xl"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your Oracle Hyperion password"
            className="max-w-xl"
          />
        </div>
      </div>

      {/* Go-to-Market Agent Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Go-to-Market Agent</h2>
        <p className="text-gray-500 text-sm mb-4">
          Provide your API key for Go-to-Market agent access.
        </p>
        <Input
          label="API Key"
          type="password"
          placeholder="Enter your API key"
          className="max-w-xl"
        />
      </div>

      {/* Odoo Credentials Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Odoo Credentials</h2>
        <p className="text-gray-500 text-sm mb-4">
          Configure your Odoo account credentials.
        </p>
        <div className="space-y-4">
          <Input
            label="Username/Email"
            type="email"
            placeholder="Enter your Odoo username or email"
            className="max-w-xl"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your Odoo password"
            className="max-w-xl"
          />
          <Input
            label="Database Name"
            type="text"
            placeholder="Enter your Odoo database name"
            className="max-w-xl"
          />
          <Input
            label="Server URL"
            type="url"
            placeholder="Enter your Odoo server URL"
            className="max-w-xl"
          />
        </div>
      </div>

      {/* Updated Save Button */}
      <button
        onClick={handleSave}
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Save Changes
      </button>
    </div>
  );
};

export default CredentialsPage;
