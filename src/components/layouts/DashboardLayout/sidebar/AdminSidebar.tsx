import { NavLink } from "react-router-dom"
import { ChartNoAxesGantt } from "lucide-react"

const AdminSidebar = () => {

  return (
    <nav className="flex flex-col gap-2">
      <NavLink
        to="/admin-dashboard/servicesManagement"
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${isActive ? "bg-muted text-foreground" : ""
          }`
        }
      >
        <ChartNoAxesGantt className="h-5 w-5" />
        Service Management
      </NavLink>
      <NavLink
        to="/admin-dashboard/slotManagement"
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${isActive ? "bg-muted text-foreground" : ""
          }`
        }
      >
        <ChartNoAxesGantt className="h-5 w-5" />
        Slot Management
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
      <NavLink
        to="/admin-dashboard/userManagement"
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${isActive ? "bg-muted text-foreground" : ""
          }`
        }
      >
        <ChartNoAxesGantt className="h-5 w-5" />
        User Management
      </NavLink>




    </nav>
  )
}
export default AdminSidebar

