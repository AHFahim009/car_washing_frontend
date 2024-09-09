"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logoutUser } from "@/redux/slices/authSlice";

export default function AvatarDropDown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { credentials } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  console.log(credentials.photo)
  const handleDashboard = () => {
    navigate(`/${credentials.role}-dashboard`);
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setOpen(false);
    navigate("/")
  };

  // replace with real user:

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10 cursor-pointer ">
          <AvatarImage src={credentials.photo} alt="User avatar" />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 ">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {credentials.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {credentials.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDashboard} className="cursor-pointer">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
