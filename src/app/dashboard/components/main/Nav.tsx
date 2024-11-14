"use client";
import {
  Navbar,
  NavbarContent,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { HiMenuAlt2, HiChevronDown } from "react-icons/hi";
import { useWorkspace } from "@/context/WorkspaceContext";
import UserDropdown from "./UserDropdown";

interface NavProps {
  handleSidebar: () => void;
}

const Nav = ({ handleSidebar }: NavProps) => {
  const { currentWorkspace, setCurrentWorkspace, workspaces } = useWorkspace();

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
          selectedKeys={[currentWorkspace.id]}
          className="max-w-xs"
          onSelectionChange={(keys) => {
            const selectedId = Array.from(keys)[0] as string;
            const workspace = workspaces.find((w) => w.id === selectedId);
            if (workspace) setCurrentWorkspace(workspace);
          }}
          defaultSelectedKeys={[currentWorkspace.id]}
        >
          {workspaces.map((workspace) => (
            <SelectItem key={workspace.id} value={workspace.id}>
              {workspace.name}
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
