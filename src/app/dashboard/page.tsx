"use client";
import { useWorkspace } from "@/context/WorkspaceContext";

import OracleDashboard from "./components/Oracle/OracleDashboard";

const DashboardPage = () => {
  const { currentWorkspace } = useWorkspace();

  const renderWorkspaceContent = () => {
    switch (currentWorkspace.type) {
      case "oracle":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">
              Oracle Hyperion Dashboard
            </h1>
            {/* Oracle specific components */}
            <div className="grid gap-4">
              <div className="p-4  rounded-lg ">
                <OracleDashboard />
              </div>
            </div>
          </div>
        );

      case "odoo":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Odoo Dashboard</h1>
            {/* Odoo specific components */}
            <div className="grid gap-4">
              <div className="p-4 bg-white rounded-lg shadow">
                <h2>Odoo Content</h2>
                {/* Add Odoo specific components */}
              </div>
            </div>
          </div>
        );

      case "ai_agent":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">AI Agent Dashboard</h1>
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

  return <div className="container mx-auto">{renderWorkspaceContent()}</div>;
};

export default DashboardPage;

// import React from "react";
// import AddRule from "./components/Oracle/AddRule";
// import { useAuth } from "@/context/AuthContext";
// import AddNestedJob from "./components/Oracle/AddNestedJob";

// type Props = {};

// const page = (props: Props) => {
//   const { user } = useAuth();
//   console.log({ user });
//   return <AddNestedJob />;
// };

// export default page;
