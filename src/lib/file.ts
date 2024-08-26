import axios, { type AxiosProgressEvent } from 'axios';
import { AllowableFileTypeEnum } from '~/types/enums/storage';

export const getFileDetail = (file: File) => {
  const name = file.name;
  const ext = name.split('.').pop() ?? '';
  const type = 'file';
  return { type, name, ext };
};

export const uploadFile = async (
  url: string,
  file: File,
  contentType: AllowableFileTypeEnum,
  onProgress: (progress: number) => void,
) => {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', contentType);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        onProgress(progress); // Update progress
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve();
      } else {
        reject(new Error('Failed to upload file.'));
      }
    };

    xhr.onerror = () => reject(new Error('Network error.'));

    xhr.send(file);
  });
};

export const downloadFile = async (
  url: string,
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  try {
    const response = await axios.get<Blob>(url, {
      responseType: 'blob',
      onDownloadProgress,
    });
    return response.data;
  } catch (error) {
    console.error('File download error:', error);
    throw error;
  }
};
