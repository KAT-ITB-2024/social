import InfoModal from '../InfoModal';
import Info from 'public/images/assignment/modal/info.png';

export const AssingmentInfoModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (param: boolean) => void;
}) => {
  return (
    <InfoModal
      image={Info}
      title="Terkumpul"
      description="Tugasmu berhasil dikumpul"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="bg-blue-500 text-yellow"
    ></InfoModal>
  );
};
