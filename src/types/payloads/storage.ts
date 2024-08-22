import { z } from 'zod';

export enum FolderEnum {
  PROFILE = 'profile',
  ASSIGNMENT = 'assignment',
  MATERIAL = 'material',
}

export enum AllowableFileTypeEnum {
  PDF = 'application/pdf',
  PNG = 'image/png',
  JPEG = 'image/jpeg',
}

export const UploadFilePayload = z.object({
  folder: z.nativeEnum(FolderEnum),
  filename: z.string(),
  contentType: z.nativeEnum(AllowableFileTypeEnum),
});

export const DownloadFilePayload = z.object({
  filename: z.string(),
  folder: z.nativeEnum(FolderEnum),
});
