"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Nav from "./Nav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarClosed, setIsSidebarClosed] = useState<boolean>(true);
  const pathname = usePathname();
  useEffect(() => {
    if (isSidebarClosed === false) {
      return setIsSidebarClosed(true);
    }
  }, [pathname]);
  const sidebarWidth = isSidebarClosed
    ? "max-md:w-[0px] max-md:opacity-0  "
    : "max-md:fixed max-md:top-0 max-md:left-0  max-md:h-full max-md:w-[300px] z-[999]   ";
  const handleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };
  return (
    <main className="flex flex-row min-h-screen w-full  text-foreground">
      <div
        className={`w-[300px] ${sidebarWidth} h-full max-md:fixed max-sm:top-0 max-sm:left-0 max-sm:bottom-0  transition-all duration-500`}
      >
        <Sidebar handleSidebar={handleSidebar} />
      </div>
      <AnimatePresence>
        {!isSidebarClosed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsSidebarClosed(!isSidebarClosed)}
            className="h-full w-full z-[99] fixed overflow-hidden top-0 left-0 sm:hidden right-0 bottom-0 backdrop-blur-sm transition-all duration-500"
          ></motion.div>
        )}
      </AnimatePresence>
      <div className="flex-1 flex flex-col bg-[#F5F7F9] min-h-screen w-full">
        <Nav handleSidebar={handleSidebar} />
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 w-full ">
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
