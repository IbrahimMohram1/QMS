import React from "react";

import { Outlet, NavLink } from "react-router-dom";
import SideBar from "../SideBar/SideBar";

export default function DashboardLayout() {
  return (
    <div className="flex  p-5">
      <SideBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
