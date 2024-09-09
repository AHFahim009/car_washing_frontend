/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllServicesQuery } from "@/redux/api/endpoints/serviceManagement.api";
import { useCreateSlotsMutation } from "@/redux/api/endpoints/serviceSlot.api";
import { TCreateServiceRes } from "@/types/interface/createService.interface";
import { CustomForm } from "@/components/customForm/CustomForm";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomInput from "@/components/customForm/CustomInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TSlot } from "@/types/interface/slot.interface";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServiceDetails } from "./ServiceDetail";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TGenericErrRes } from "@/types/globa.types";
import { EditSlotSkeleton } from "@/helpers/InputSkeleton";

type TProps = {
  showSLotModal: boolean;
  setShowSlotModal: any;
};
const SlotFormModal = ({ showSLotModal, setShowSlotModal }: TProps) => {
  const { data: serviceData, isLoading: isServicesLoading } =
    useGetAllServicesQuery("");
  const [createSlot] = useCreateSlotsMutation();
  const [serviceId, setServiceId] = useState("");

  const [selectedService, setSelectedService] =
    useState<TCreateServiceRes | null>(null);

  const handleServiceChange = (value: string) => {
    setServiceId(value);
    setSelectedService(serviceData?.data.find((s) => s._id === value) || null);
  };

  const handleSubmitForm = async (slotPayload: TSlot) => {
    const slotData = {
      service: serviceId,
      date: slotPayload.date,
      startTime: slotPayload.startTime,
      endTime: slotPayload.endTime,
    };

    try {
      const res = await createSlot(slotData);
      if (res.data) {
        setShowSlotModal(false);
        toast.success(res.data.message);
      } else {
        const err = res.error as FetchBaseQueryError;
        const errorRes = err.data as TGenericErrRes;

        toast.error(errorRes.message);
      }
    } catch (error) {
      console.log("slot management", error);
    }
  };
  const handleDialogClose = () => {
    setShowSlotModal(false);
  };
  return (
    <Dialog open={showSLotModal}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Car Wash Slot Management</DialogTitle>
          <DialogDescription>
            Fill in the details for the new service.
          </DialogDescription>
        </DialogHeader>

        <CustomForm onSubmit={handleSubmitForm}>
          {isServicesLoading ? (
            <EditSlotSkeleton />
          ) : (
            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="space-y-2">
                <Label htmlFor="service">Service</Label>
                <Select onValueChange={handleServiceChange} value={serviceId}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceData?.data.map((service) => (
                      <SelectItem key={service._id} value={service._id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <CustomInput label="Date" type="date" name="date" />
              <CustomInput label="Start Time" type="time" name="startTime" />
              <CustomInput label="End Time" type="time" name="endTime" />
            </div>
          )}
          {selectedService && <ServiceDetails service={selectedService} />}
          <Button type="submit">Add Slot</Button>
        </CustomForm>

        <DialogFooter className="ml-auto">
          <div>
            <Button onClick={handleDialogClose} variant="ghost">
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default SlotFormModal;
