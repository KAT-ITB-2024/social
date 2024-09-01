import { type UserMatch } from '@katitb2024/database';
import Image from 'next/image';

interface ChatMenuProps {
  match: UserMatch | null;
  isMenuOpen: boolean;
  handleAskReveal: () => void;
  openModal: (modal: string) => void;
}

export const ChatMenu = ({
  match,
  isMenuOpen,
  handleAskReveal,
  openModal,
}: ChatMenuProps) => {
  return (
    <div
      className={`w-full bg-blue-400 rounded-t-xl h-auto z-20 px-4 py-3 text-white absolute bottom-[72px]  transition-all duration-300 ease-out ${
        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
      }`}
    >
      <ul className="flex flex-col gap-1">
        <li
          className="flex flex-row justify-start gap-2 cursor-pointer hover:bg-blue-500 rounded-md p-2"
          onClick={() => openModal('isEndConfirmationModalOpen')}
        >
          <Image
            src="/icons/chat/stop-icon.svg"
            alt="Stop Pembicaraan"
            width={24}
            height={24}
          />
          <span>Stop Pembicaraan</span>
        </li>
        <div className="w-full bg-white flex h-[0.5px]" />
        {!match?.isRevealed && (
          <>
            <li
              className="flex flex-col gap-2 cursor-pointer hover:bg-blue-500 rounded-md p-2"
              onClick={handleAskReveal}
            >
              <div className="flex flex-row justify-start gap-2">
                <Image
                  src="/icons/chat/reveal-icon.svg"
                  alt="Minta Reveal Profile"
                  width={24}
                  height={24}
                />
                <span>Minta Reveal Profile</span>
              </div>
            </li>
            <div className="w-full bg-white flex h-[1px]" />
          </>
        )}
        <li
          className="flex flex-row justify-start gap-2 cursor-pointer hover:bg-blue-500 rounded-md p-2"
          onClick={() => openModal('isRulesModalOpen')}
        >
          <Image
            src="/icons/chat/rules-icon.svg"
            alt="Peraturan"
            width={24}
            height={24}
          />
          <span>Peraturan</span>
        </li>
      </ul>
    </div>
  );
};
