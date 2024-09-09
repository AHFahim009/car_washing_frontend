import { z } from "zod";
export const vehicles = {
  CAR: 'car',
  TRUCK: 'truck',
  SUV: 'SUV',
  VAN: 'van',
  MOTORCYCLE: 'motorcycle',
  BUS: 'bus',
  ELECTRIC_VEHICLE: 'electricVehicle',
  HYBRID_VEHICLE: 'hybridVehicle',
  BICYCLE: 'bicycle',
  TRACTOR: 'tractor',
};


export const BookingSchema = z.object({

  vehicleType: z.enum(Object.values(vehicles) as [string, ...string[]]),
  vehicleBrand: z.string({ message: "Vehicle Brand is required" }),
  vehicleModel: z.string({ message: "Vehicle Model is required" }),
  manufacturingYear: z.coerce
    .number()
    .min(1900, "Manufacturing Year must be at least 1900.")
    .max(
      new Date().getFullYear(),
      "Manufacturing Year cannot be in the future."
    ),
  registrationPlate: z.string({ message: "Registration Plate is required." })
});


export const BookingValidation = {
  BookingSchema
}