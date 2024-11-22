"use client";
import {
  Navbar,
  NavbarContent,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { HiMenuAlt2, HiChevronDown } from "react-icons/hi";
import { useWorkspace, Workspace } from "@/context/WorkspaceContext";
import UserDropdown from "./UserDropdown";

interface NavProps {
  handleSidebar: () => void;
}

const Nav = ({ handleSidebar }: NavProps) => {
  const { currentWorkspace, setCurrentWorkspace, workspaces } = useWorkspace();

  // Create a map to track platform type counts
  const platformCounts = workspaces.reduce<Record<number, number>>(
    (acc, workspace) => {
      acc[workspace.platform] = (acc[workspace.platform] || 0) + 1;
      return acc;
    },
    {}
  );

  // Get the index for a specific workspace within its platform type
  const getPlatformIndex = (workspace: Workspace) => {
    const sameTypePlatforms = workspaces
      .filter((w) => w.platform === workspace.platform)
      .sort((a, b) => a.id - b.id);
    return sameTypePlatforms.findIndex((w) => w.id === workspace.id) + 1;
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
          onSelectionChange={(keys) => {
            const selectedId = parseInt(Array.from(keys)[0] as string);
            const workspace = workspaces.find((w) => w.id === selectedId);
            if (workspace) setCurrentWorkspace(workspace);
          }}
          renderValue={(items) => {
            return items.map((item) => (
              <div key={item.key} className="flex flex-col">
                <span>
                  {currentWorkspace.platform === 1 && (
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
                  {workspace.platform === 1 && (
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
