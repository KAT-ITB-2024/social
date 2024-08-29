import { S3Client } from '@aws-sdk/client-s3';
import { env } from '~/env';

const globalForS3 = globalThis as unknown as {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  s3Client: S3Client | undefined;
};

const s3Client =
  globalForS3.s3Client ??
  new S3Client({
    endpoint: env.DO_ORIGIN_ENDPOINT,
    region: env.DO_REGION,
    credentials: {
      accessKeyId: env.DO_ACCESS_KEY,
      secretAccessKey: env.DO_SECRET_KEY,
    },
  });

if (process.env.NODE_ENV !== 'production') globalForS3.s3Client = s3Client;

export { s3Client };
