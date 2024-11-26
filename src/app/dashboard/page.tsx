"use client";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Button, Spinner } from "@nextui-org/react";

import OracleDashboard from "./components/Oracle/OracleDashboard";
import TıtleHeading from "./components/Reusable/TıtleHeading";

const DashboardPage = () => {
  const { currentWorkspace, workspaces } = useWorkspace();

  if (workspaces.length === 0) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800">Welcome to JIR!</h2>
          <p className="text-gray-600">
            To get started, you'll need to add a workspace. Head over to the
            Credentials page to set up your first workspace.
          </p>
          <Button
            color="primary"
            href="/dashboard/credentials"
            as="a"
            className="mt-4"
          >
            Set Up Workspace
          </Button>
        </div>
      </div>
    );
  }

  if (!currentWorkspace) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const renderWorkspaceContent = () => {
    switch (currentWorkspace.platform_type) {
      case 1: // Oracle
        return (
          <div className="w-full">
            <div className="w-full">
              <OracleDashboard />
            </div>
          </div>
        );

      case 2: // Odoo
        return (
          <div>
            <TıtleHeading title="Odoo" subheading="Odoo Dashboard" />
            {/* Odoo specific components */}
            <div className="grid gap-4">
              <div className="p-4 bg-white rounded-lg shadow">
                <h2>Odoo Content</h2>
                {/* Add Odoo specific components */}
              </div>
            </div>
          </div>
        );

      case 3: // AI Agent
        return (
          <div>
            <TıtleHeading title="AI Agent" subheading="AI Agent Dashboard" />
            {/* AI Agent specific components */}
            <div className="grid gap-4">
              <div className="p-4 bg-white rounded-lg shadow">
                <h2>AI Agent Content</h2>
                {/* Add AI Agent specific components */}
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a workspace</div>;
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto w-full px-4">
        {renderWorkspaceContent()}
      </div>
    </div>
  );
};

export default DashboardPage;
