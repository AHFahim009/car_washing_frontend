/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllServicesQuery } from "@/redux/api/endpoints/serviceManagement.api";
import { useCreateSlotsMutation } from "@/redux/api/endpoints/serviceSlot.api";
import { TCreateServiceRes } from "@/types/interface/createService.interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomForm } from "@/components/customForm/CustomForm";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomInput from "@/components/customForm/CustomInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TSlot } from "@/types/interface/slot.interface";



export function SlotForm() {
  const { data: serviceData, isLoading: servicesLoading } = useGetAllServicesQuery("");
  const [createSlot] = useCreateSlotsMutation();
  const [serviceId, setServiceId] = useState("");

  const [selectedService, setSelectedService] = useState<TCreateServiceRes | null>(null);

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
    const res = await createSlot(slotData);
    console.log(res);
  };
  return (
    <Card className="w-full  lg:max-w-xl md:mx-auto mb-8">
      <CardHeader>
        <CardTitle>Car Wash Slot Management</CardTitle>
      </CardHeader>
      <CardContent>
        {servicesLoading ? (
          "loading.........."
        ) : (
          <CustomForm onSubmit={handleSubmitForm}>
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
              <CustomInput label="End Time" type="time" name="endDate" />
            </div>
            {selectedService && (
              <ServiceDetails service={selectedService} />
            )}
            <Button type="submit">Add Slot</Button>
          </CustomForm>
        )}
      </CardContent>
    </Card>
  );
}

export function ServiceDetails({ service }: any) {
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">{service.name}</h4>
        <p className="text-sm text-muted-foreground">
          {service.description}
        </p>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-2 items-center gap-4">
          <span className="text-sm">Price:</span>
          <span className="text-sm font-medium">
            {service.price}
          </span>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <span className="text-sm">Duration:</span>
          <span className="text-sm font-medium">
            {service.duration} minutes
          </span>
        </div>
      </div>
    </div>
  );
}