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

export type Workspace = {
  id: number;
  email: string;
  platform_type: number;
  url_1: string;
  url_2: string;
  user: number;
};

type WorkspaceContextType = {
  currentWorkspace: Workspace;
  setCurrentWorkspace: (workspace: Workspace) => void;
  workspaces: Workspace[];
};

export const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Suspense fallback={null}>
      <WorkspaceContent pathname={pathname} router={router}>
        {children}
      </WorkspaceContent>
    </Suspense>
  );
}

const LAST_WORKSPACE_KEY = "lastSelectedWorkspace";

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

  useEffect(() => {
    async function fetchWorkspaces() {
      try {
        const { data } = await client.get<Workspace[]>("/v2/api/platforms/");
        setWorkspaces(data);

        // First check URL params
        const workspaceId = searchParams.get("workspace");

        // Then check localStorage
        const savedWorkspaceId = localStorage.getItem(LAST_WORKSPACE_KEY);

        let workspace: Workspace | undefined;

        if (workspaceId) {
          // If workspace is in URL, use that
          workspace = data.find((w) => w.id.toString() === workspaceId);
          if (workspace) {
            localStorage.setItem(LAST_WORKSPACE_KEY, workspace.id.toString());
          }
        } else if (savedWorkspaceId) {
          // If no workspace in URL but exists in localStorage, use that
          workspace = data.find((w) => w.id.toString() === savedWorkspaceId);
        }

        // Fallback to first workspace if nothing found
        setCurrentWorkspace(workspace || data[0]);

        // Update URL if needed
        if (!workspaceId && workspace) {
          const params = new URLSearchParams(searchParams.toString());
          params.set("workspace", workspace.id.toString());
          router.replace(`${pathname}?${params.toString()}`);
        }
      } catch (error) {
        console.error("Failed to fetch workspaces:", error);
      }
    }

    fetchWorkspaces();
  }, [searchParams, pathname, router]);

  const handleWorkspaceChange = (workspace: Workspace) => {
    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    params.set("workspace", workspace.id.toString());
    router.push(`${pathname}?${params.toString()}`);

    // Save to localStorage
    localStorage.setItem(LAST_WORKSPACE_KEY, workspace.id.toString());

    setCurrentWorkspace(workspace);
  };

  if (!currentWorkspace) {
    return null;
  }

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        setCurrentWorkspace: handleWorkspaceChange,
        workspaces,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
