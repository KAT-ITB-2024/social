import React, { type Dispatch, type SetStateAction, useRef } from 'react';

interface FileUploadProps {
  className: string;
  setFile: Dispatch<SetStateAction<File | null>>;
  setFilename: Dispatch<SetStateAction<string | null>>;
  progress: number;
}

const FileUploader: React.FC<FileUploadProps> = ({
  className,
  setFile,
  setFilename,
  progress,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setFilename(file.name);
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
