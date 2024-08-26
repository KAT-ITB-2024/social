import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import { uploadFile } from '~/lib/file'; // Ensure this function supports progress tracking
import { api } from '~/trpc/react';
import { AllowableFileTypeEnum, FolderEnum } from '~/types/enums/storage';
import { ErrorToast } from './ui/error-toast';

interface FileUploadProps {
  className: string;
  onSubmitted: (fileName: string, downloadUrl: string) => void;
  folder: FolderEnum;
}

const FileUploader: React.FC<FileUploadProps> = ({
  className,
  onSubmitted,
  folder,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const uploadFileMutation = api.storage.generateUploadUrl.useMutation();
  const downloadFileMutation = api.storage.generateDownloadUrl.useMutation();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        // Set progress to a small value to indicate the upload is starting
        setProgress(1);

        const { url, filename } = await uploadFileMutation.mutateAsync({
          folder: folder,
          filename: file.name,
          contentType: AllowableFileTypeEnum.PDF,
        });

        // Generate download URL (if needed) before upload starts
        const downloadUrl = await downloadFileMutation.mutateAsync({
          folder: folder,
          filename: filename,
        });

        // Upload the file and update progress
        await uploadFile(url, file, AllowableFileTypeEnum.PDF, setProgress);

        // Reset progress after successful upload
        setProgress(0);

        // Notify parent component about successful upload
        onSubmitted(filename, downloadUrl);
      } catch (error) {
        console.error(error);
        toast(<ErrorToast desc="Failed to upload file" />);
        setProgress(0); // Reset progress on error
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
