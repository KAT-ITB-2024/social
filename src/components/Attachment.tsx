import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AssignmentDeleteModal } from './assignment/DeleteModal';
interface AttachmentButtonProps {
  fileUrl: string;
  fileName: string;
  isUserSubmit: boolean;
  onDelete?: () => void;
  isDeleteable?: boolean;
}

const AttachmentButton: React.FC<AttachmentButtonProps> = ({
  fileUrl,
  fileName,
  isUserSubmit,
  onDelete,
  isDeleteable = true,
}) => {
  const sanitizedFileName = isUserSubmit
    ? fileName.split('-').length >= 5
      ? fileName.split('-')[5]
      : fileName
    : fileName;
  return (
    <div className="flex min-h-14 w-fit min-w-64 justify-between rounded-[10px] bg-[#FFFEFE] py-2 pl-[10px] pr-1">
      <Link
        className="flex w-fit min-w-48 items-center rounded-[10px] bg-pink-200 bg-opacity-30 pl-2"
        href={fileUrl}
        // download={fileUrl}
        target="_blank"
      >
        <Image
          className=""
          src="/images/detail/pdf-logo.svg"
          alt="PDF Logo"
          width={20}
          height={20}
        />
        <p className="m-1 ml-2 break-all text-[#384053]">{sanitizedFileName}</p>
      </Link>
      {isUserSubmit && onDelete && isDeleteable && (
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
