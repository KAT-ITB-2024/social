// components/FileUploader.tsx

import React, { useRef } from 'react';
interface FileUploadProps {
  className: string;
  onSubmitted: (file: File) => void;
}
const FileUploader: React.FC<FileUploadProps> = ({
  className,
  onSubmitted,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    // Trigger file input click
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSubmitted(file);
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
        accept=".pdf" // Change this if you want to allow different file types
      />
    </div>
  );
};

export default FileUploader;
