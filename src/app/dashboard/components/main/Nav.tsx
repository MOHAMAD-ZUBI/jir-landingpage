"use client";
import {
  Navbar,
  NavbarContent,
  Button,
  Select,
  SelectItem,
  Selection,
} from "@nextui-org/react";
import { HiMenuAlt2, HiChevronDown } from "react-icons/hi";
import { useWorkspace, Workspace } from "@/context/WorkspaceContext";
import UserDropdown from "./UserDropdown";
import { useRouter, usePathname } from "next/navigation";

interface NavProps {
  handleSidebar: () => void;
}

const Nav = ({ handleSidebar }: NavProps) => {
  const { currentWorkspace, setCurrentWorkspace, workspaces } = useWorkspace();
  const router = useRouter();
  const pathname = usePathname();

  // Create a map to track platform type counts
  const platformCounts = workspaces.reduce<Record<number, number>>(
    (acc, workspace) => {
      acc[workspace.platform_type] = (acc[workspace.platform_type] || 0) + 1;
      return acc;
    },
    {}
  );

  // Get the index for a specific workspace within its platform type
  const getPlatformIndex = (workspace: Workspace) => {
    const sameTypePlatforms = workspaces
      .filter((w) => w.platform_type === workspace.platform_type)
      .sort((a, b) => a.id - b.id);
    return sameTypePlatforms.findIndex((w) => w.id === workspace.id) + 1;
  };

  const handleWorkspaceChange = (keys: Selection) => {
    const selectedKey = Array.from(keys).toString();
    if (!selectedKey) return;

    const selectedId = parseInt(selectedKey);
    const workspace = workspaces.find((w) => w.id === selectedId);

    if (workspace) {
      setCurrentWorkspace(workspace);

      // If we're not on the dashboard, redirect there
      if (pathname !== "/dashboard") {
        router.push(`/dashboard?workspace=${selectedId}`);
      }
    }
  };

  return (
    <Navbar maxWidth="full" className="bg-white">
      <NavbarContent className="gap-4">
        <Button
          isIconOnly
          variant="light"
          className="md:hidden"
          onClick={handleSidebar}
        >
          <HiMenuAlt2 className="h-6 w-6" />
        </Button>

        <Select
          label="Workspace"
          placeholder="Select Workspace"
          variant="faded"
          selectedKeys={
            currentWorkspace
              ? new Set([currentWorkspace.id.toString()])
              : new Set()
          }
          className="max-w-xs"
          onSelectionChange={handleWorkspaceChange}
          renderValue={(items) => {
            return items.map((item) => (
              <div key={item.key} className="flex flex-col">
                <span>
                  {currentWorkspace.platform_type === 1 && (
                    <>
                      Oracle PBCS
                      {platformCounts[1] > 1
                        ? ` ${getPlatformIndex(currentWorkspace)}`
                        : ""}
                    </>
                  )}
                </span>
                {/* <span className="text-tiny text-default-400">
                  {currentWorkspace.email}
                </span> */}
              </div>
            ));
          }}
        >
          {workspaces.map((workspace) => (
            <SelectItem
              key={workspace.id.toString()}
              value={workspace.id}
              className="py-2"
            >
              <div className="flex flex-col">
                <span>
                  {workspace.platform_type === 1 && (
                    <>
                      Oracle PBCS
                      {platformCounts[1] > 1
                        ? ` ${getPlatformIndex(workspace)}`
                        : ""}
                    </>
                  )}
                </span>
                <span className="text-tiny text-default-400">
                  {workspace.email}
                </span>
              </div>
            </SelectItem>
          ))}
        </Select>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        <UserDropdown />
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
