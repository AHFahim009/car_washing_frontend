import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useDeleteUserMutation } from "@/redux/api/endpoints/userManagement.api";
import { TGenericErrRes } from "@/types/globa.types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

type TProps = {
  showDeleteModal: boolean;
  setShowDeleteModal: any;
  userId: string;
};

const UserDeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
  userId,
}: TProps) => {
  const [deleteDeleteUser] = useDeleteUserMutation();

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };
  const handleConfirmDelete = async () => {
    try {
      const res = await deleteDeleteUser(userId);

      if (res.data) {
        setShowDeleteModal(false);
        toast.success(res.data.message);
      } else {
        const err = res.error as FetchBaseQueryError;
        const errorRes = err.data as TGenericErrRes;

        toast.error(errorRes.message);
      }
    } catch (error) {
      console.log("service delete problem`", error);
    }
  };
  return (
    <AlertDialog open={showDeleteModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Service</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the ".." service? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseModal}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default UserDeleteModal;
