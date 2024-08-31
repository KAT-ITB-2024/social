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
      className={`flex flex-row items-center justify-between p-4 bg-blue-600 gap-2 shadow-orange-2xl
          ${isMenuOpen ? '' : 'rounded-t-2xl'}
        `}
    >
      <div
        className="flex flex-row p-2 rounded-full bg-turquoise-300 text-neutral-50 gap-0.5 cursor-pointer"
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

      <div className="flex-grow flex flex-row bg-neutral-50 rounded-2xl items-center pr-4 pl-2">
        <Textarea
          className="w-full rounded-none px-2 my-1 h-full max-h-32 overflow-y-auto border-0 text-area-scrollbar placeholder:text-blue-200 bg-neutral-50 "
          rows={2}
          value={newMessage}
          onChange={handleTyping}
          placeholder="Ketik pesan kamu di sini..."
        />
        <div className="my-2 ml-4">
          <button
            className="bg-blue-300 text-white rounded-full w-[24px] h-[24px] items-center flex justify-center"
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
