/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomForm } from "@/components/customForm/CustomForm";
import CustomInput from "@/components/customForm/CustomInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateServiceMutation } from "@/redux/api/endpoints/serviceManagement.api";
import { TGenericErrRes } from "@/types/globa.types";
import { TCreateService } from "@/types/interface/createService.interface";
import { serviceValidation } from "@/validation/createService.validaion";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  showAddModal: boolean;
  setShowAddModal: any;
};
const AddServiceModal = ({ showAddModal, setShowAddModal }: TProps) => {
  const [createService] = useCreateServiceMutation();

  const handleDialogClose = () => {
    setShowAddModal(false);
  };

  const handleFormSubmit = async (payload: FieldValues) => {
    try {
      const res = await createService(payload as TCreateService);
      if (res.data) {
        setShowAddModal(false);
        toast.success(res.data.message);
      } else {
        const err = res.error as FetchBaseQueryError
        const errorRes = err.data as TGenericErrRes

        toast.error(errorRes.message);
      }
    } catch (error) {
      console.log("service created problem", error);
    }
  };

  return (
    <Dialog open={showAddModal}>
      <DialogContent className="sm:max-w-[425px] h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>
            Fill in the details for the new service.
          </DialogDescription>
        </DialogHeader>
        <CustomForm
          onSubmit={handleFormSubmit}
          schema={serviceValidation.serviceSchema}
        >
          <CustomInput
            label="Name"
            placeholder="Enter the service name"
            name="name"
            type="text"
          />
          <CustomInput
            label="Description"
            placeholder="Enter the service description"
            name="description"
            type="text"
          />
          <CustomInput
            label="Price"
            placeholder="Enter the service price"
            name="price"
            type="number"
          />
          <CustomInput
            label="Duration"
            placeholder="Enter the service duration"
            name="duration"
            type="number"
          />
          <Button className="w-full">Save</Button>
        </CustomForm>
        <DialogFooter className="ml-auto">
          <div >

            <Button onClick={handleDialogClose} variant="ghost">
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddServiceModal;
