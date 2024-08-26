import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AssignmentDeleteModal } from './assignment/DeleteModal';
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
  const sanitizedFileName = isUserSubmit ? fileName.split('-')[5] : fileName;
  return (
    <div className="flex justify-between bg-[#FFFEFE] rounded-[10px] min-w-64 w-fit min-h-14 py-2 pl-[10px] pr-1">
      <Link
        className="flex items-center min-w-48 w-fit pl-2 bg-pink-200 bg-opacity-30 rounded-[10px]"
        href={fileUrl}
        download={fileUrl}
        target="_blank"
      >
        <Image
          className=""
          src="/images/detail/pdf-logo.svg"
          alt="PDF Logo"
          width={20}
          height={20}
        />
        <p className="ml-2 m-1 text-[#384053] break-all">{sanitizedFileName}</p>
      </Link>
      {isUserSubmit && onDelete && (
        <AssignmentDeleteModal
          customTriggerButton={
            <button className="">
              <Image
                className=""
                src="/images/detail/delete-logo.svg"
                alt="Delete Logo"
                width={27}
                height={27}
              />
            </button>
          }
          handleDelete={onDelete}
        />
      )}
    </div>
  );
};

export default AttachmentButton;
