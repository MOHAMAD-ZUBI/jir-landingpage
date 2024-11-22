import { WorkspaceProvider } from "@/context/WorkspaceContext";
import { EnvironmentProvider } from "@/context/EnvironmentContext";
import DashboardLayout from "./components/main/DashboardLayout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceProvider>
      <EnvironmentProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </EnvironmentProvider>
    </WorkspaceProvider>
  );
}
