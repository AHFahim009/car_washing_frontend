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
import { InputSkeleton } from "@/helpers/InputSkeleton";
import {
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
} from "@/redux/api/endpoints/serviceManagement.api";
import { TGenericErrRes } from "@/types/globa.types";
import { TCreateService } from "@/types/interface/createService.interface";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";

import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  showEditModal: boolean;
  setShowEditModal: any;
  serviceId: string;
};

const EditServiceModal = ({
  setShowEditModal,
  showEditModal,
  serviceId,
}: TProps) => {
  const [defaultValues, setDefaultValues] = useState<TCreateService>({
    name: "",
    description: "",
    price: 0,
    duration: 0,
  });
  console.log(defaultValues);

  const { data: serviceData, isLoading: isServiceLoading } =
    useGetServiceByIdQuery(serviceId ?? "", { skip: !serviceId });
  const [updateService] = useUpdateServiceMutation();

  useEffect(() => {
    if (serviceData?.data) {
      setDefaultValues({
        name: serviceData.data.name,
        description: serviceData.data.description,
        price: serviceData.data.price,
        duration: serviceData.data.duration,
      });
    }
  }, [serviceData]);

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleFormSubmit = async (payload: FieldValues) => {
    try {
      const res = await updateService({ data: payload, id: serviceId });
      console.log(res);

      if (res.data) {
        setShowEditModal(false);
        toast.success(res.data.message);
      } else {
        const err = res.error as FetchBaseQueryError;
        const errorRes = err.data as TGenericErrRes;

        toast.error(errorRes.message);
      }
    } catch (error) {
      console.log("service created problem", error);
    }
  };
  return (
    <Dialog open={showEditModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogDescription>
            Update the details for the selected service.
          </DialogDescription>
        </DialogHeader>
        {isServiceLoading ? (
          <InputSkeleton length={5} />
        ) : (
          <CustomForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
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
              type="text"
            />
            <CustomInput
              label="Duration"
              placeholder="Enter the service duration"
              name="duration"
              type="text"
            />
            <Button>Update</Button>
          </CustomForm>
        )}

        <DialogFooter className="ml-auto">
          <div>
            <Button onClick={handleCloseModal} variant="ghost">
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default EditServiceModal;
