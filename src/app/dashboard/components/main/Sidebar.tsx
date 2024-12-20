"use client";
import React, { FC, useEffect } from "react";
import {
  MdDashboard,
  MdOutlineSettingsSuggest,
  MdBusinessCenter,
  MdClose,
  MdOutlineLogout,
  MdOutlineKeyboardArrowRight,
  MdPayments,
  MdAdd,
} from "react-icons/md";
import { logOut } from "@/utils/authFunctions";
import SidebarLink from "./SidebarLink";
import { Button } from "@nextui-org/react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { usePathname } from "next/navigation";

interface SidebarProps {
  handleSidebar: () => void;
}

const Links = [
  { title: "Dashboard", icon: MdDashboard, path: "/dashboard" },
  {
    title: "Credentials",
    icon: MdOutlineSettingsSuggest,
    path: "/dashboard/credentials",
  },
  {
    title: "Billing",
    icon: MdPayments,
    path: "/dashboard/billing",
  },
];
const Sidebar: FC<SidebarProps> = ({ handleSidebar }) => {
  const { workspaces } = useWorkspace();
  const pathname = usePathname();
  const isCredentialsPage = pathname === "/dashboard/credentials";

  // Show sidebar if there are workspaces or if we're on the credentials page
  if (workspaces.length === 0 && !isCredentialsPage) {
    return null;
  }

  return (
    <div className="fixed p-6 bg-white/80 h-screen flex flex-col justify-between w-[300px]">
      <div>
        <div className="flex flex-row w-full justify-between items-center">
          <div className="p-3 flex flex-row items-center gap-2 text-primaryDashboard">
            {/* logo <Image
              src="/betrendlogo.png"
              width={150}
              height={150}
              alt="betrend logo"
            /> */}
            <div className="text-2xl font-bold">JIR</div>
          </div>
          <button
            onClick={handleSidebar}
            className="bg-white/20 sm:hidden rounded-xl p-1"
          >
            <MdClose size={23} />
          </button>
        </div>
        <div className="h-[1px] w-full bg-content2 my-8"></div>
        <div className="flex flex-col my-4 gap-2">
          {Links.map((link, index) => {
            return (
              <SidebarLink
                key={index}
                path={link.path}
                title={link.title}
                Icon={link.icon}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <Button
          className="w-full h-auto group bg-default-50 hover:bg-default-100 transition-all duration-300"
          variant="bordered"
          startContent={<span className="text-lg">⚡</span>}
          endContent={
            <div className="bg-default-100 rounded-full p-1 group-hover:bg-default-200 transition-colors">
              <MdAdd size={18} />
            </div>
          }
        >
          <div className="flex justify-between items-center w-full py-2 px-1">
            <div className="flex flex-col items-start">
              <span className="text-base font-medium">91,553.4</span>
              <span className="text-xs text-default-500">
                Available Credits
              </span>
            </div>
          </div>
        </Button>
        <button
          onClick={() => {
            logOut();
            window.location.reload();
          }}
          className={
            "text-black group w-full font-[450] text-[18px] flex flex-row items-center justify-between px-4 py-3 rounded-2xl duration-300 hover:bg-red-50/50 hover:text-red-400"
          }
        >
          <div className="flex flex-row items-center gap-x-2">
            <MdOutlineLogout />
            <div>Log out</div>
          </div>
          <div className="group-hover:opacity-100 opacity-0 duration-500">
            <MdOutlineKeyboardArrowRight className="text-red-400" size={25} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
