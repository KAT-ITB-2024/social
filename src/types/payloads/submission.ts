import { z } from 'zod';

export const submissionPayload = z.object({
  assignmentId: z.string(),
  nim: z.string(),
  files: z.array(z.string()),
});

export const putSubmissionPayload = z.object({
  submissionId: z.string(),
  nim: z.string(),
  files: z.array(z.string().max(255)).max(2),
});
