import React from "react";
import { NavLink } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Users,
  AlarmClock,
  FileText,
  Menu,
  LayoutDashboard,
} from "lucide-react";

// Pixel-perfect Logo from Figma
const Logo = () => (
  <div className="flex items-center group-data-[collapsible=icon]:justify-center">
    <div className="relative flex items-center justify-center">
      {/* The double circle / X logo style */}
      <div className="w-10 h-10 border-[3px] border-black dark:border-gray-300 rounded-full flex items-center justify-center bg-white dark:bg-gray-900 font-extrabold text-lg z-10 translate-x-1 group-data-[collapsible=icon]:translate-x-0 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:border-[3px]">
        <span className="text-black dark:text-white">X</span>
      </div>
      <div className="w-10 h-10 border-[3px] border-black dark:border-gray-300 rounded-full flex items-center justify-center bg-white dark:bg-gray-900 z-0 -translate-x-1 group-data-[collapsible=icon]:hidden">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-black"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    </div>
  </div>
);

export function CustomSidebarTrigger() {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      onClick={toggleSidebar}
      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group-data-[collapsible=icon]:mx-auto"
    >
      <Menu className="w-8 h-8 text-black dark:text-white font-bold" />
    </button>
  );
}

const NAV_LINKS = [
  { name: "Dashboard", path: "/dashboard", exact: true, icon: LayoutDashboard },
  { name: "Groups", path: "/dashboard/groups", icon: Users },
  { name: "Quizzes", path: "/dashboard/quizes", icon: AlarmClock },
  { name: "Students", path: "/dashboard/students", icon: Users },
  { name: "Questions", path: "/dashboard/questions", icon: FileText },
  { name: "Results", path: "/dashboard/results", icon: FileText },
];

export default function SideBar() {
  return (
    <SidebarProvider className="w-fit">
      <Sidebar
        className="border-r border-black/20 dark:border-gray-700  bg-white dark:bg-gray-800 "
        collapsible="icon"
      >
        <SidebarHeader className="flex flex-row items-center  px-8 my-3  group-data-[collapsible=icon]:p-4 group-data-[collapsible=icon]:flex-col dark:text-gray-100">
          <CustomSidebarTrigger />
          <div className="group-data-[collapsible=icon]:mt-2 pr-2 group-data-[collapsible=icon]:pr-0">
            <Logo />
          </div>
        </SidebarHeader>

        <SidebarContent className="p-0 overflow-visible">
          <SidebarGroup className="p-0">
            <SidebarMenu className="gap-0 ">
              {NAV_LINKS.map((link) => (
                <SidebarMenuItem
                  key={link.name}
                  className="px-0 relative border-b border-black/20 dark:border-gray-700 "
                >
                  <NavLink
                    to={link.path}
                    end={link.exact}
                    className={({ isActive }) =>
                      `flex items-center gap-5 py-5 transition-all duration-300 relative font-bold  ${
                        isActive
                          ? "bg-gray-100 text-[#000000]  w-full z-20 group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:rounded-none group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center pl-8 group-data-[collapsible=icon]:pl-0 border-r-4 border-black border-l-0"
                          : "text-[#000000] dark:text-white hover:bg-gray-50 dark:hover:text-gray-700 pl-8 group-data-[collapsible=icon]:pl-0 w-full group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center border-r-4 border-transparent"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div
                          className={`flex items-center justify-center w-12 h-12 rounded-[10px] shrink-0 transition-colors group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10 ${
                            isActive
                              ? "bg-[#0D1321] text-[#FFEDDF]"
                              : "bg-[#FFEDDF] text-[#0D1321]"
                          }`}
                        >
                          <link.icon className="w-6 h-6 group-data-[collapsible=icon]:w-5 group-data-[collapsible=icon]:h-5" />
                        </div>
                        <span className=" tracking-tight group-data-[collapsible=icon]:hidden whitespace-nowrap">
                          {link.name}
                        </span>
                      </>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
