/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useDeleteServiceMutation } from "@/redux/api/endpoints/serviceManagement.api";
import { TGenericErrRes } from "@/types/globa.types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

type TProps = {
  showDeleteModal: boolean;
  setShowDeleteModal: any;
  serviceId: string;
};

const DeleteServiceModal = ({
  showDeleteModal,
  setShowDeleteModal,
  serviceId,
}: TProps) => {

  const [deleteService] = useDeleteServiceMutation()

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };
  const handleConfirmDelete = async () => {
    try {
      const res = await deleteService(serviceId)

      if (res.data) {
        setShowDeleteModal(false);
        toast.success(res.data.message);
      }
      else {
        const err = res.error as FetchBaseQueryError
        const errorRes = err.data as TGenericErrRes

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
export default DeleteServiceModal;
