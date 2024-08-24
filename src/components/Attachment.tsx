import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
interface AttachmentButtonProps {
  fileUrl: string;
  fileName: string;
  isUserSubmit: boolean;
  onDelete?: () => void;
}

const AttachmentButton: React.FC<AttachmentButtonProps> = ({
  fileUrl,
  fileName,
  isUserSubmit,
  onDelete,
}) => {
  return (
    <div className="flex flex-row bg-[#FFFEFE] rounded-[10px] w-64 h-14 py-2 pl-[10px]">
      <Link
        className="flex flex-row items-center w-[75%] pl-2 h-full bg-pink-200 bg-opacity-30 rounded-[10px]"
        href={fileUrl}
        download={fileName}
      >
        <Image
          className=""
          src="/images/detail/pdf-logo.svg"
          alt="PDF Logo"
          width={20}
          height={20}
        />
        <p className="ml-2 text-[#384053]">{fileName}</p>
      </Link>
      {isUserSubmit && (
        <button className="ml-4" onClick={onDelete}>
          <Image
            className=""
            src="/images/detail/delete-logo.svg"
            alt="Delete Logo"
            width={27}
            height={27}
          />
        </button>
      )}
    </div>
  );
};

export default AttachmentButton;
