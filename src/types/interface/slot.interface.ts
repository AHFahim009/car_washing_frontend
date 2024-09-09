
export type TSlot = {
  service: string;
  date: string;
  startTime: string; // Consider storing time as a string in HH:mm format
  endTime: string; // Same as startTime
  isBooked?: "available" | "booked" | "canceled";


}


export type TService = {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type TSlotRes = {
  _id: string;
  service: TService;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
