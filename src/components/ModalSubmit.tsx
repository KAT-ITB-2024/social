import Image from 'next/image';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Render nothing if not open

  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40" />
      <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
        <div className="bg-blue-500 p-6 rounded-lg shadow-lg max-w-sm w-[272px] h-[331px]">
          <Image
            className=""
            src="/images/detail/gurita.png"
            alt="Arrow back"
            width={152}
            height={152}
          />
        </div>
      </div>
    </>
  );
};

export default Modal;
