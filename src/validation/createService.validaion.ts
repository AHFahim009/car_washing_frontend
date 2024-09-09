import { z } from 'zod';

// Define the Zod validation schema
export const serviceSchema = z.object({
  name: z.string({ message: 'Service name is required' }),
  description: z.string({ message: "Service description is required" }),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  duration: z.coerce.number().int().positive('Duration must be a positive integer'),
  isDeleted: z.boolean().default(false),
});
export const serviceUpdateSchema = z.object({
  name: z.string({ message: 'Service name is required' }).optional(),
  description: z.string({ message: "Service description is required" }).optional(),
  price: z.coerce.number().min(0, 'Price must be a positive number').optional(),
  duration: z.coerce.number().int().positive('Duration must be a positive integer').optional(),
  isDeleted: z.boolean().default(false).optional(),
});

export const serviceValidation = {
  serviceSchema, serviceUpdateSchema
}