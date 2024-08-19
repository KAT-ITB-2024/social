import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ConfirmationModal } from './ConfirmationModal';
import kudalumping from '/public/images/detail/kuda-lumping.png';
interface AttachmentButtonProps {
  fileUrl: string;
  fileName: string;
  handleDelete?: () => void;
}

const AttachmentButton: React.FC<AttachmentButtonProps> = ({
  fileUrl,
  fileName,
  handleDelete,
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
      {handleDelete && (
        <div className="flex ml-4 justify-center">
          <ConfirmationModal
            action={handleDelete}
            actionText="Hapus"
            description="Apakah kamu yakin menghapus file yang diunggah?"
            image={kudalumping}
            imageHeight={125}
            imageWidth={88}
            title="Hapus?"
            cancelText="Batal"
          />
        </div>
      )}
    </div>
  );
};

export default AttachmentButton;
