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
      className={`absolute bottom-[72px] z-20 h-auto w-full rounded-t-xl bg-blue-400 px-4 py-3 text-white transition-all duration-300 ease-out ${
        isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <ul className="flex flex-col gap-1">
        <li
          className="flex cursor-pointer flex-row justify-start gap-2 rounded-md p-2 hover:bg-blue-500"
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
        <div className="flex h-[0.5px] w-full bg-white" />
        {match?.isAnonymous && (
          <>
            <li
              className="flex cursor-pointer flex-col gap-2 rounded-md p-2 hover:bg-blue-500"
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
            <div className="flex h-[1px] w-full bg-white" />
          </>
        )}
        <li
          className="flex cursor-pointer flex-row justify-start gap-2 rounded-md p-2 hover:bg-blue-500"
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
