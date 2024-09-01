import React from 'react';

interface BubbleChatProps {
  date: string;
  text: string;
  variant: 'sent' | 'received';
  chatRef?: React.Ref<HTMLDivElement> | null;
}

const BubbleChat: React.FC<BubbleChatProps> = ({
  date,
  text,
  variant,
  chatRef,
}) => {
  const bubbleClasses = `relative max-w-xs p-3 pb-2 rounded-xl text-sm ${
    variant === 'sent'
      ? 'bg-blue-300 text-white self-end'
      : 'bg-gray-100 text-blue-600 self-start'
  }`;

  return (
    <div
      className={`flex ${variant === 'sent' ? 'justify-end' : 'justify-start'} mb-2`}
      ref={chatRef ?? null}
    >
      <div className={bubbleClasses}>
        <div className="pb-[10px] text-md break-words">{text}</div>
        <div
          className={`text-xs text-opacity-75 ${
            variant === 'sent' ? 'text-right' : 'text-left'
          }`}
        >
          {date}
        </div>
        <div
          className={`absolute w-0 h-0 border-[10px] ${
            variant === 'sent'
              ? 'border-blue-300 border-t-transparent border-r-transparent right-0 bottom-0 transform translate-x-1/2 -translate-y-1/3'
              : 'border-gray-100 border-t-transparent border-l-transparent left-0 bottom-0 transform -translate-x-1/2 -translate-y-1/3'
          }`}
        />
      </div>
    </div>
  );
};

export default BubbleChat;
