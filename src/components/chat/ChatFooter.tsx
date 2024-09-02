import Image from 'next/image';
import { Textarea } from '../ui/textarea';

interface ChatFooterProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  newMessage: string;
  handleTyping: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSendMessage: () => void;
}

export const ChatFooter = ({
  isMenuOpen,
  toggleMenu,
  newMessage,
  handleTyping,
  handleSendMessage,
}: ChatFooterProps) => {
  return (
    <div
      className={`flex flex-row items-center justify-between gap-2 bg-blue-600 p-4 shadow-orange-2xl ${isMenuOpen ? '' : 'rounded-t-2xl'} `}
    >
      <div
        className="flex cursor-pointer flex-row gap-0.5 rounded-full bg-turquoise-300 p-2 text-neutral-50"
        onClick={toggleMenu}
      >
        <Image
          src={isMenuOpen ? '/icons/close-icon.svg' : '/icons/menu-white.svg'}
          alt="Menu"
          width={24}
          height={24}
        />
        Menu
      </div>

      <div className="flex flex-grow flex-row items-center rounded-2xl bg-neutral-50 pl-2 pr-4">
        <Textarea
          className="text-area-scrollbar my-1 h-full max-h-32 w-full overflow-y-auto rounded-none border-0 bg-neutral-50 px-2 placeholder:text-blue-200"
          rows={2}
          value={newMessage}
          onChange={handleTyping}
          placeholder="Ketik pesan kamu di sini..."
        />
        <div className="my-2 ml-4">
          <button
            className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-blue-300 text-white"
            onClick={handleSendMessage}
          >
            <Image
              src="/icons/chat/chevron-right.svg"
              alt="Send"
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
