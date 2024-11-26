"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Suspense,
} from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import client from "@/utils/client";
import { Spinner } from "@nextui-org/react";

export type Workspace = {
  id: number;
  email: string;
  platform_type: number;
  url_1: string;
  url_2: string;
  user: number;
};

type WorkspaceContextType = {
  currentWorkspace: Workspace | null;
  setCurrentWorkspace: (workspace: Workspace) => void;
  workspaces: Workspace[];
  isLoading: boolean;
};

export const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

function WorkspaceContent({
  children,
  pathname,
  router,
}: {
  children: ReactNode;
  pathname: string;
  router: ReturnType<typeof useRouter>;
}) {
  const searchParams = useSearchParams();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkspaces() {
      console.log("Fetching workspaces...");
      setIsLoading(true);
      try {
        const { data } = await client.get<Workspace[]>("/v2/api/platforms/");
        console.log("Fetched workspaces:", data);
        setWorkspaces(data);

        if (data.length > 0) {
          const workspaceId = searchParams.get("workspace");
          const savedWorkspaceId = localStorage.getItem("lastWorkspace");

          let workspace: Workspace | undefined;

          if (workspaceId) {
            workspace = data.find((w) => w.id.toString() === workspaceId);
          } else if (savedWorkspaceId) {
            workspace = data.find((w) => w.id.toString() === savedWorkspaceId);
          }

          setCurrentWorkspace(workspace || data[0]);
        }
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      } finally {
        console.log("Setting isLoading to false");
        setIsLoading(false);
      }
    }

    fetchWorkspaces();
  }, [searchParams, pathname, router]);

  // Add debug logs
  console.log("WorkspaceContext state:", {
    isLoading,
    workspacesCount: workspaces.length,
    hasCurrentWorkspace: !!currentWorkspace,
  });

  const value = {
    currentWorkspace,
    setCurrentWorkspace: (workspace: Workspace) => {
      setCurrentWorkspace(workspace);
      localStorage.setItem("lastWorkspace", workspace.id.toString());
    },
    workspaces,
    isLoading,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <WorkspaceContent pathname={pathname} router={router}>
        {children}
      </WorkspaceContent>
    </Suspense>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
