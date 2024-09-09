import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, Mountain } from "lucide-react";
import { Outlet } from "react-router-dom";
import UserBasedSidebar from "./UserBasedSidebar";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative flex min-h-screen w-full">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "flex" : "hidden"
          } absolute top-0 left-0 z-20 h-full w-56 flex-col border-r  bg-background p-4 md:relative md:flex md:z-0`}
      >
        <div className="mb-6 flex items-center gap-2">
          <Mountain className="h-6 w-6" />
          <span className="text-lg font-bold">Dashboard</span>
        </div>
        <UserBasedSidebar />
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-5 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <div className="flex flex-1 flex-col border h-screen overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 shadow-sm md:px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <div className="text-lg font-bold">Dashboard</div>
          </div>
        </header>
        {/* Main content here */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
