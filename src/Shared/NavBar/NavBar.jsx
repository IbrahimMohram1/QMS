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
import { ThemeContext } from "@/Context/DarkModeContext";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
export default function NavBar() {
  const { userProfile } = useContext(AuthContext);
  const location = useLocation();
  let { logout } = useAuth();
  let { darkMode } = useContext(ThemeContext);

  // Helper to get title from current path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Dashboard";
    if (path.includes("/groups")) return "Groups";
    if (path.includes("/quizes")) return "Quizes";
    if (path.includes("/results")) return "Results";
    if (path.includes("/questions")) return "Questions";

    if (path.includes("/quiz-result-view")) return "Results";

    if (path.includes("/students")) return "Students";
  };

  return (
    <header className="flex py-3 items-center justify-between bg-white dark:bg-gray-900 px-8 border-b border-black/10">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-black dark:text-gray-100 font-sans tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      <ToggleTheme />

      <div className="flex items-center h-full">
        {/* New Quiz Button */}
        <div className="px-6 flex items-center h-full border-l border-black/10 dark:border-gray-600">
          <button
            className="flex items-center gap-2 rounded-full border border-black/20 dark:border-gray-600 bg-white dark:bg-gray-700 px-5 py-2 text-[14px] font-bold transition-all hover:bg-gray-50 dark:hover:bg-gray-600 active:scale-95 shadow-sm"
            id="new-quiz-btn"
          >
            <div className="flex  items-center justify-center rounded-full bg-[#FFF2EB] dark:bg-gray-600 text-[#E37A49] dark:text-gray-200">
              <AlarmClockPlus className="h-4 w-4 stroke-[2.5]" />
            </div>
            <span className="text-black  dark:text-gray-100">New quiz</span>
          </button>
        </div>

        {/* Mail Icon */}
        <div className="px-6 flex items-center h-full border-l border-black/10 dark:border-gray-600 relative cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div className="relative">
            <Mail
              size={18}
              className=" text-black dark:text-gray-200 fill-black dark:fill-gray-200 stroke-[1.5]"
            />
            <span className="absolute -top-2 -right-2 flex h-4 w-5 items-center justify-center rounded-full bg-[#FFF2EB] dark:bg-gray-600 text-[10px] font-bold text-black dark:text-gray-200 border border-black/10 dark:border-gray-600">
              10
            </span>
          </div>
        </div>

        {/* Bell Icon */}
        <div className="px-6 flex items-center h-full border-l border-black/10 dark:border-gray-600 relative cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div className="relative">
            <Bell
              size={18}
              className=" text-black dark:text-gray-200 fill-black dark:fill-gray-200 stroke-[1.5]"
            />
            <span className="absolute -top-2 -right-2 flex h-4 w-5 items-center justify-center rounded-full bg-[#FFF2EB] dark:bg-gray-600 text-[10px] font-bold text-black dark:text-gray-200 border border-black/10 dark:border-gray-600">
              10
            </span>
          </div>
        </div>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="px-6 flex items-center gap-4 cursor-pointer group h-full border-l border-black/10 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              id="user-profile-menu"
            >
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold text-black dark:text-gray-100 ">
                  {userProfile
                    ? `${userProfile.first_name} ${userProfile.last_name || ""}`
                    : "User Name"}
                </span>
                <span className="text-[10px] font-semibold text-[#CDD400] leading-tight">
                  {userProfile?.role}
                </span>
              </div>

              <ChevronDown className="h-5 w-5 text-black/30 dark:text-gray-400 transition-transform group-hover:translate-y-0.5" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48 bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 rounded-xl p-1">
            <DropdownMenuLabel className="text-xs text-gray-400 dark:text-gray-500 font-medium px-2">
              Actions
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-gray-100" />

            <DropdownMenuGroup>
              <DropdownMenuItem className="flex items-center text-xs gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700  font-medium text-gray-700 dark:text-gray-200">
                <NavLink
                  to="/dashboard/change-password"
                  className="flex items-center gap-2 w-full"
                >
                  <AlarmClockPlus
                    size={16}
                    className=" text-gray-500 dark:text-gray-400"
                  />
                  Change Password
                </NavLink>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-gray-100" />

              <DropdownMenuItem
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-700 text-xs font-medium text-red-500 dark:text-red-400"
                onClick={logout}
              >
                <LogOut size={16} className=" text-red-500" />
                LogOut
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
