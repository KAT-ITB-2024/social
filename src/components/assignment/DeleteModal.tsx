import { ConfirmationModal } from '../ConfirmationModal';
import Delete from 'public/images/assignment/modal/delete.png';
import type { ReactNode } from 'react';

export const AssignmentDeleteModal = ({
  handleDelete,
  customTriggerButton,
}: {
  handleDelete: () => void;
  customTriggerButton: ReactNode;
}) => {
  return (
    <ConfirmationModal
      triggerText="submit"
      image={Delete}
      title="Hapus?"
      description="Apakah kamu yakin menghapus file yang diunggah?"
      actionText="Hapus"
      cancelText="Batal"
      action={handleDelete}
      customTriggerButton={customTriggerButton}
    ></ConfirmationModal>
  );
};
