"use client";
import {
  Navbar,
  NavbarContent,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { HiMenuAlt2, HiChevronDown } from "react-icons/hi";
import { useWorkspace } from "@/context/WorkspaceContext";

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

        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" className="flex items-center gap-2">
              {currentWorkspace.name}
              <HiChevronDown className="h-4 w-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Workspaces"
            className="w-[200px]"
            selectionMode="single"
            selectedKeys={[currentWorkspace.id]}
            onSelectionChange={(keys) => {
              const selectedId = Array.from(keys)[0] as string;
              const workspace = workspaces.find((w) => w.id === selectedId);
              if (workspace) setCurrentWorkspace(workspace);
            }}
          >
            {workspaces.map((workspace) => (
              <DropdownItem key={workspace.id}>{workspace.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        {/* Add user profile, notifications, etc. */}
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
