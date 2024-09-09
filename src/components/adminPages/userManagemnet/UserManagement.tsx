/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, Pencil, Trash2 } from "lucide-react";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/api/endpoints/userManagement.api";
import { toast } from "sonner";
import UserDeleteModal from "./userDeleteModal";
import { useState } from "react";
import { TableSkeletonRow } from "@/helpers/TableSkeletonRow";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TGenericErrRes } from "@/types/globa.types";





export default function UserManagement() {
  const { data: userData, isLoading: isUserDataLoading } = useGetAllUsersQuery("");
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userId, setUserId] = useState("")

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await updateUserRole({ userId, role: newRole });
      if (res.data) {
        toast.success(res.data.message);
      } else {
        const errRes = res.error as FetchBaseQueryError
        const err = errRes.data as TGenericErrRes
        toast.error(err.message);
      }
    } catch (err) {
      // Handle error
      console.error("Failed to update role:", err);
    }
  };

  const handleDeleteUser = (id: string) => {
    setUserId(id)
    setShowDeleteModal(true)

  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="">Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>


        <TableBody>
          {
            isUserDataLoading ? <TableSkeletonRow /> : <>
              {userData?.data.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell className="whitespace-nowrap">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {user.address}
                  </TableCell>
                  <TableCell className="l">{user.role}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                            <ChevronDownIcon className="h-4 w-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onSelect={() => handleRoleChange(user._id, "user")}
                          >
                            User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => handleRoleChange(user._id, "admin")}
                          >
                            Admin
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button onClick={() => handleDeleteUser(user._id)} variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

            </>
          }
        </TableBody>
      </Table>
      {showDeleteModal &&
        <UserDeleteModal setShowDeleteModal={setShowDeleteModal} showDeleteModal={showDeleteModal} userId={userId} />

      }
    </div>
  );
}
