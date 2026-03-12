import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

export default function MasterLayout() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 w-full overflow-hidden flex flex-col">
        <NavBar />
        <main className="flex-1 overflow-auto bg-gray-50/30 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
