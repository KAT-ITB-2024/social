import { z } from 'zod';

export const getAssignmentByIdPayload = z.object({
  id: z.string(),
});

interface AssignmentSubmission {
  assignmentId: string;
  createdAt: Date;
  file: string;
  id: string;
  point: number | null;
  updatedAt: Date;

  userNim: string;
}

interface Assignment {
  assignmentType: 'Main' | 'Side';
  createdAt: Date;
  deadline: Date;
  description: string;
  file: string | null;
  id: string;
  point: number | null;
  startTime: Date;
  title: string;
  updatedAt: Date;
}

export type AssignmentData = {
  assignmentSubmissions: AssignmentSubmission | null;
  assignments: Assignment;
};
