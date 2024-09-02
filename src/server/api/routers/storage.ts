import { createTRPCRouter, pesertaProcedure } from '../trpc';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from '~/env.cjs';
import { s3Client } from '~/server/db/storage';
import { TRPCError } from '@trpc/server';
import { v4 as uuidv4 } from 'uuid';
import {
  DownloadFilePayload,
  UploadFilePayload,
} from '~/types/payloads/storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const storageRouter = createTRPCRouter({
  generateUploadUrl: pesertaProcedure
    .input(UploadFilePayload)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not logged in yet!',
        });
      }
      const id = uuidv4();
      const filename = `${id}-${input.filename}`;
      const file = `${input.folder}/${filename}`;
      const command = new PutObjectCommand({
        Bucket: env.DO_BUCKET_NAME,
        Key: file,
        ContentType: input.contentType,
      });

      try {
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL valid for 1 hour
        return { url, filename };
      } catch (error) {
        console.error('Error generating pre-signed URL:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to generate new file',
        });
      }
    }),

  generateDownloadUrl: pesertaProcedure
    .input(DownloadFilePayload)
    .mutation(async ({ ctx, input }): Promise<string> => {
      if (!ctx.session) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not logged in yet!',
        });
      }
      const file = `${input.folder}/${input.filename}`;
      const command = new GetObjectCommand({
        Bucket: env.DO_BUCKET_NAME,
        Key: file,
      });
      try {
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return url;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed generating download URL!',
        });
      }
    }),
});
