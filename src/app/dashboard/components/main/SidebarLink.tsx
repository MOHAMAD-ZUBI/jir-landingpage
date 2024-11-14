"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

type SidebarLinkProps = {
  path: string;
  Icon: any;
  title: string;
};

const SidebarLink: FC<SidebarLinkProps> = ({ Icon, path, title }) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={`
        text-black 
        group w-full font-[450] text-[18px] 
        flex flex-row items-center justify-between 
        px-4 py-3 rounded-2xl duration-300 
        hover:bg-primary-50 hover:text-primary
        ${isActive ? "bg-primary text-white" : ""}
      `}
    >
      <div className="flex flex-row items-center gap-x-2">
        <Icon />
        <div>{title}</div>
      </div>
      <div className=" group-hover:opacity-100  opacity-0 duration-500">
        <MdOutlineKeyboardArrowRight color="white" size={25} />
      </div>
    </Link>
  );
};

export default SidebarLink;
