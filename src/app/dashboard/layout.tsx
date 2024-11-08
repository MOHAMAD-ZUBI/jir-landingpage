import { WorkspaceProvider } from "@/context/WorkspaceContext";
import DashboardLayout from "./components/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </WorkspaceProvider>
  );
}
