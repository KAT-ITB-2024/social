import React, { useRef, useState } from 'react';
import { api } from '~/trpc/react';
import { AllowableFileTypeEnum, FolderEnum } from '~/types/enums/storage';

interface FileUploadProps {
  className: string;
  onSubmitted: (fileName: string, downloadUrl: string) => void;
  folder: FolderEnum;
  onUploading?: (isUploading: boolean) => void;
}

const FileUploader: React.FC<FileUploadProps> = ({
  className,
  onSubmitted,
  folder,
  onUploading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const generateUploadUrl = api.storage.generateUploadUrl.useMutation();
  const generateDownloadUrl = api.storage.generateDownloadUrl.useMutation();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (onUploading) {
      onUploading(true);
    }
    const file = event.target.files?.[0];

    if (file) {
      const { name: filename, type: contentType } = file;

      try {
        const { url, filename: savedFilename } =
          await generateUploadUrl.mutateAsync({
            filename,
            contentType: contentType as AllowableFileTypeEnum,
            folder,
          });

        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            setProgress(percentComplete);
          }
        };

        xhr.open('PUT', url, true);
        xhr.setRequestHeader('Content-Type', contentType);

        xhr.onload = async () => {
          if (xhr.status === 200) {
            const downloadUrl = await generateDownloadUrl.mutateAsync({
              filename: savedFilename,
              folder,
            });

            if (downloadUrl) {
              onSubmitted(savedFilename, downloadUrl);
            } else {
              console.error('Failed to get download URL');
            }
          } else {
            console.error('Upload failed:', xhr.statusText);
          }

          if (onUploading) {
            onUploading(false);
          }
          setProgress(0);
        };

        xhr.onerror = () => {
          console.error('Upload failed:', xhr.statusText);
          if (onUploading) {
            onUploading(false);
          }
          setProgress(0);
        };

        xhr.send(file);
      } catch (error) {
        console.error('Error during file upload:', error);
        if (onUploading) {
          onUploading(false);
        }
        setProgress(0);
      }
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick} className={className}>
        Upload File
      </button>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf"
      />

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="w-full bg-gray-200 rounded-full mt-2">
          <div
            className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: `${progress}%` }}
          >
            {Math.round(progress)}%
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
