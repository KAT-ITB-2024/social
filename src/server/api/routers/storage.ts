import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from '~/env';
import { s3Client } from '~/server/db/storage';

export const storageRouter = createTRPCRouter({
  uploadFile: publicProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileContent: z.string(), // Harus berupa base64 atau binary
        contentType: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { fileName, fileContent, contentType } = input;

      const buffer = Buffer.from(fileContent, 'base64'); // jika fileContent berupa base64

      const command = new PutObjectCommand({
        Bucket: env.DO_BUCKET_NAME, // Menggunakan bucket name dari env
        Key: fileName,
        Body: buffer,
        ContentType: contentType,
        ACL: 'public-read', // atau sesuai dengan kebutuhan Anda
      });

      try {
        await s3Client.send(command);
        return { success: true, message: 'File uploaded successfully' };
      } catch (error) {
        console.error('Error uploading file:', error);
        return { success: false, message: 'Failed to upload file' };
      }
    }),
});
