import Image from 'next/image';
import { ConfirmationModal } from '../ConfirmationModal';
import Confirmation from 'public/images/assignment/modal/confirmation.png';
import { ReactNode } from 'react';

export const AssignmentConfirmationModal = ({
  handleSubmit,
  customTriggerButton,
}: {
  handleSubmit: () => void;
  customTriggerButton: ReactNode;
}) => {
  return (
    <ConfirmationModal
      triggerText="submit"
      image={Confirmation}
      title="Kumpul?"
      description="Pastikan jawaban yang kamu kirim sudah benar"
      actionText="Kumpul Sekarang"
      cancelText="Batal"
      action={handleSubmit}
      customTriggerButton={customTriggerButton}
    ></ConfirmationModal>
  );
};
