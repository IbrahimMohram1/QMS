import React, { useContext, useEffect } from "react";
import {
  ChevronDown,
  AlarmClockPlus,
  Mail,
  Bell,
  Eye,
  Trash2,
  LogOut,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import useAuth from "@/Hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function NavBar() {
  const { loginData } = useContext(AuthContext);
  const location = useLocation();
  let { logout } = useAuth();

  // Helper to get title from current path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Dashboard";
    if (path.includes("/groups")) return "Groups";
    if (path.includes("/quizes")) return "Quizes";
    if (path.includes("/results")) return "Results";
    if (path.includes("/students")) return "Students";

    return "Dashboard";
  };
  useEffect(() => {
    console.log("Login Data in NavBar:", loginData);
  }, [loginData]);

  return (
    <header className="flex h-20 items-center justify-between bg-white px-8 border-b border-black/10">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-black font-sans tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center h-full">
        {/* New Quiz Button */}
        <div className="px-6 flex items-center h-full border-l border-black/10">
          <button
            className="flex items-center gap-2 rounded-full border border-black/20 bg-white px-5 py-2 text-[14px] font-bold transition-all hover:bg-gray-50 active:scale-95 shadow-sm"
            id="new-quiz-btn"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFF2EB] text-[#E37A49]">
              <AlarmClockPlus className="h-4 w-4 stroke-[2.5]" />
            </div>
            <span className="text-black">New quiz</span>
          </button>
        </div>

        {/* Mail Icon */}
        <div className="px-6 flex items-center h-full border-l border-black/10 relative cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="relative">
            <Mail className="h-6 w-6 text-black fill-black stroke-[1.5]" />
            <span className="absolute -top-2 -right-2 flex h-4 w-5 items-center justify-center rounded-full bg-[#FFF2EB] text-[10px] font-bold text-black border border-black/10">
              10
            </span>
          </div>
        </div>

        {/* Bell Icon */}
        <div className="px-6 flex items-center h-full border-l border-black/10 relative cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="relative">
            <Bell className="h-6 w-6 text-black fill-black stroke-[1.5]" />
            <span className="absolute -top-2 -right-2 flex h-4 w-5 items-center justify-center rounded-full bg-[#FFF2EB] text-[10px] font-bold text-black border border-black/10">
              10
            </span>
          </div>
        </div>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="px-6 flex items-center gap-4 cursor-pointer group h-full border-l border-black/10 hover:bg-gray-50 transition-colors"
              id="user-profile-menu"
            >
              <div className="flex flex-col items-start">
                <span className="text-sm font-bold text-black leading-tight">
                  {loginData ? loginData.first_name : "UserName"}
                </span>
                <span className="text-[11px] font-bold text-[#CDD400] leading-tight">
                  {loginData?.role}
                </span>
              </div>

              <ChevronDown className="h-5 w-5 text-black/30 transition-transform group-hover:translate-y-0.5" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48 bg-white shadow-lg border border-gray-100 rounded-xl p-1">
            <DropdownMenuLabel className="text-xs text-gray-400 font-medium px-2">
              Actions
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-gray-100" />

            <DropdownMenuGroup>
              <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
                <NavLink
                  to="/dashboard/change-password"
                  className="flex items-center gap-2 w-full"
                >
                  <AlarmClockPlus className="w-4 h-4 text-gray-500" />
                  Change Password
                </NavLink>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-gray-100" />

              <DropdownMenuItem
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-sm font-medium text-red-500"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 text-red-500" />
                LogOut
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
