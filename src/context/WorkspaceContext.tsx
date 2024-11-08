"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export type Workspace = {
  id: string;
  name: string;
  type: "oracle" | "odoo" | "ai_agent";
};

type WorkspaceContextType = {
  currentWorkspace: Workspace;
  setCurrentWorkspace: (workspace: Workspace) => void;
  workspaces: Workspace[];
};

const defaultWorkspaces: Workspace[] = [
  { id: "1", name: "Oracle Hyperion", type: "oracle" },
  { id: "2", name: "Odoo", type: "odoo" },
  { id: "3", name: "AI Agent", type: "ai_agent" },
];

export const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize with a loading state
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null
  );

  useEffect(() => {
    const workspaceId = searchParams.get("workspace");
    const workspace = workspaceId
      ? defaultWorkspaces.find((w) => w.id === workspaceId)
      : defaultWorkspaces[0];

    setCurrentWorkspace(workspace || defaultWorkspaces[0]);
  }, [searchParams]);

  const handleWorkspaceChange = (workspace: Workspace) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("workspace", workspace.id);
    router.push(`${pathname}?${params.toString()}`);
  };

  // Don't render children until we have a workspace
  if (!currentWorkspace) {
    return null;
  }

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        setCurrentWorkspace: handleWorkspaceChange,
        workspaces: defaultWorkspaces,
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
