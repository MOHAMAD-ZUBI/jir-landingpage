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
  platform: number;
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

        const workspaceId = searchParams.get("workspace");
        const workspace = workspaceId
          ? data.find((w) => w.id.toString() === workspaceId)
          : data[0];

        setCurrentWorkspace(workspace || data[0]);
      } catch (error) {
        console.error("Failed to fetch workspaces:", error);
      }
    }

    fetchWorkspaces();
  }, [searchParams]);

  const handleWorkspaceChange = (workspace: Workspace) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("workspace", workspace.id.toString());
    router.push(`${pathname}?${params.toString()}`);
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
