import {
  useGetAvailableSlotsQuery,
  useUpdateSlotStatusMutation,
} from "@/redux/api/endpoints/serviceSlot.api";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ServiceDetails } from "./ServiceDetail";
import SlotFormModal from "./SlotFormModal";
import { useState } from "react";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TGenericErrRes } from "@/types/globa.types";
import { TableSkeletonRow } from "@/helpers/TableSkeletonRow";

export default function SlotManagement() {
  const [showSLotModal, setShowSLotModal] = useState(false);
  const { data: slotData, isLoading: isSlotsLoading } =
    useGetAvailableSlotsQuery({});
  const [updateSlotStatus] = useUpdateSlotStatusMutation();

  const handleOpenSlotModal = () => {
    setShowSLotModal(true);
  };
  const handleToggleSlotBooking = async (slotId: string) => {
    const res = await updateSlotStatus(slotId);
    if (res.data) {
      toast.success(res.data.message);
    } else {
      const err = res.error as FetchBaseQueryError;
      const errRes = err.data as TGenericErrRes;
      toast.error(errRes.message);
    }
  };

  return (
    <div className="container mx-auto w-full mt-3">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-4 sm:space-y-0">
        <Button
          onClick={handleOpenSlotModal}
          className="w-full sm:w-auto md:order-2 order-1"
        >
          <Plus className="w-4 h-4 mr-2" /> Create Slot
        </Button>
        <div className="relative w-full sm:w-64 order-2 md:order-1">
          <Input
            type="text"
            placeholder="Search slots..."
            className="pl-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <Table className="w-full table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Service</TableHead>
              <TableHead className="whitespace-nowrap">Date</TableHead>
              <TableHead className="whitespace-nowrap">Start Time</TableHead>
              <TableHead className="whitespace-nowrap">Status</TableHead>
              <TableHead className="whitespace-nowrap">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isSlotsLoading ? (
              <TableSkeletonRow cellLength={5} rowLength={6} />
            ) : (
              <>
                {slotData?.data?.map((slot) => (
                  <TableRow key={slot._id}>
                    <TableCell className="max-w-[200px]">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            className="p-0 h-auto w-full justify-start"
                          >
                            <span className="truncate text-left">
                              {slot.service.name}
                            </span>
                            <Info className="w-4 h-4 ml-2 flex-shrink-0" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <ServiceDetails service={slot.service} />
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {slot.date}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {slot.startTime}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {slot.isBooked}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleToggleSlotBooking(slot._id)}
                        disabled={slot.isBooked === "booked"}
                        variant={
                          slot.isBooked === "available"
                            ? "destructive"
                            : "default"
                        }
                        className="w-full whitespace-nowrap"
                      >
                        {slot.isBooked === "available"
                          ? "Cancel"
                          : "Make Available"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>

      {showSLotModal && (
        <SlotFormModal
          showSLotModal={showSLotModal}
          setShowSlotModal={setShowSLotModal}
        />
      )}
    </div>
  );
}
