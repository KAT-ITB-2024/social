import { z } from 'zod';

export const checkoutItemSchema = z.object({
  merchandiseId: z.string().min(1, 'Merchandise ID cannot be empty.'),
  quantity: z.number().int().positive('Quantity must be a positive integer.'),
});

export const checkoutPayloadSchema = z.array(checkoutItemSchema);
