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
        <div className="text-md break-words pb-[10px]">{text}</div>
        <div
          className={`text-xs text-opacity-75 ${
            variant === 'sent' ? 'text-right' : 'text-left'
          }`}
        >
          {date}
        </div>
        <div
          className={`absolute h-0 w-0 border-[10px] ${
            variant === 'sent'
              ? 'bottom-0 right-0 -translate-y-1/3 translate-x-1/2 transform border-blue-300 border-r-transparent border-t-transparent'
              : 'bottom-0 left-0 -translate-x-1/2 -translate-y-1/3 transform border-gray-100 border-l-transparent border-t-transparent'
          }`}
        />
      </div>
    </div>
  );
};

export default BubbleChat;
