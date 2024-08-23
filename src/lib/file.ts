import { type AllowableFileTypeEnum } from '~/types/payloads/storage';
import axios, { type AxiosProgressEvent } from 'axios';

export const getFileDetail = (file: File) => {
  const name = file.name;
  const ext = name.split('.').pop() ?? '';
  const type = 'file';
  return { type, name, ext };
};

export const uploadFile = async (
  url: string,
  file: File,
  type: AllowableFileTypeEnum,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const axiosInstance = axios.create();
  try {
    await axiosInstance.put<null>(url, file, {
      headers: {
        'Content-Type': type,
      },
      onUploadProgress,
    });
  } catch (error) {
    console.log('Error', error);
  }
};

export const downloadFile = async (
  url: string,
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const axiosInstance = axios.create();

  const response = await axiosInstance.get<Blob>(url, {
    responseType: 'blob',
    onDownloadProgress,
  });

  return response.data;
};
