import { z } from 'zod';

export const submissionPayload = z.object({
  assignmentId: z.string(),
  file: z.string(),
});

export const putSubmissionPayload = z.object({
  submissionId: z.string(),
  file: z.string().max(255).max(2),
});
export const getSubmissionByNIMPayload = z.object({
  userNim: z.string(),
});

export const getSubmissionByNIMandAssignmentPayload = z.object({
  userNim: z.string(),
  assignmentId: z.string(),
});

export const getAllSubmissionsByGroupPayload = z.object({
  groupNumber: z.number(),
});

export const getSubmissionByGroupAndAssignmentPayload = z.object({
  groupNumber: z.number(),
  assignmentId: z.string(),
});

export const getSubmissionAssignmentPayload = z.object({
  assignmentId: z.string(),
});
