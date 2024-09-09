export type TCreateService = {
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted?: boolean;
}

export type TCreateServiceRes = {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}
