import { z } from 'zod';

export const grantCoinsPayload = z.object({
  coins: z.number().min(50).max(1000).default(100),
  userId: z.string(),
});

export const getAllVisitorsPayload = z.object({
  faculty: z
    .enum([
      'FITB',
      'FMIPA',
      'FSRD',
      'FTMD',
      'FTTM',
      'FTSL',
      'FTI',
      'SAPPK',
      'SBM',
      'SF',
      'SITH',
      'STEI',
    ])
    .optional(),
  nameOrNim: z.string().optional(),
  limit: z.number().min(5).max(25).default(10),
  page: z.number().min(1).default(1),
});

export const updateLembagaProfilePayload = z.object({
  description: z.string().default(''),
  instagram: z.string().default(''),
});
