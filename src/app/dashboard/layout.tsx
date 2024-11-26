"use client";
import { WorkspaceProvider } from "@/context/WorkspaceContext";
import { EnvironmentProvider } from "@/context/EnvironmentContext";
import DashboardLayout from "./components/main/DashboardLayout";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Spinner, Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Move the loading and welcome screen components outside
const LoadingScreen = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <Spinner size="lg" />
  </div>
);

const WelcomeScreen = () => (
  <div className="w-full h-screen flex flex-col items-center justify-center">
    <div className="text-center space-y-4 max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
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

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { workspaces, isLoading } = useWorkspace();
  const pathname = usePathname();
  const isCredentialsPage = pathname === "/dashboard/credentials";

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Always show layout for credentials page
  if (isCredentialsPage) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  // Show welcome screen for other pages when no workspaces
  if (workspaces.length === 0) {
    return <WelcomeScreen />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceProvider>
      <EnvironmentProvider>
        <DashboardContent>{children}</DashboardContent>
      </EnvironmentProvider>
    </WorkspaceProvider>
  );
}
