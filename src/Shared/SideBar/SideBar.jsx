import React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Home, Users, Settings } from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <>
      <SidebarProvider className="w-fit px-5">
        <Sidebar className="   min-w-20 max-w-fit " collapsible="icon">
          <div className="flex  justify-center items-center my-5">
            <SidebarHeader className=" text-lg font-bold ">HMS</SidebarHeader>
            <SidebarTrigger />
          </div>

          <SidebarContent className="mx-auto p-5">
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>

              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/dashboard">
                      <Home />
                      Dashboard
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="groups">
                      <Users />
                      Groups
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="quizes">
                      <Settings />
                      Quizes
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="results">
                      <Settings />
                      Results
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 text-sm">Footer SideBar </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </>
  );
}
