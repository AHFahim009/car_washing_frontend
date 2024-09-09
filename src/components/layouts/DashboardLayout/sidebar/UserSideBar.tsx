import { NavLink } from "react-router-dom";
import { ChartNoAxesGantt } from "lucide-react";

const UserSidebar = () => {
  return (
    <nav className="flex flex-col gap-2">
      <NavLink
        to="/user-dashboard/userActivities"
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${isActive ? "bg-muted text-foreground" : ""
          }`
        }
      >
        <ChartNoAxesGantt className="h-5 w-5" />
        User Management
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${isActive ? "bg-muted text-foreground" : ""
          }`
        }
      >
        <ChartNoAxesGantt className="h-5 w-5" />
        Home
      </NavLink>
    </nav>
  );
};
export default UserSidebar;
