import React from 'react';

interface BubbleChatProps {
  date: string;
  text: string;
  variant: 'sent' | 'received';
}

const BubbleChat: React.FC<BubbleChatProps> = ({ date, text, variant }) => {
  const bubbleClasses = `max-w-xs p-3 rounded-xl text-sm' ${variant === 'sent' ? 'bg-blue-500 text-white self-end' : 'bg-gray-100 text-blue-600 self-start'}`;

  const tailClasses = `w-3 h-3' ${variant === 'sent' ? 'rotate-45 ml-1 mt-1 self-end' : 'rotate-45 mr-1 mb-1 self-start'}`;

  return (
    <div
      className={`flex ${variant === 'sent' ? 'justify-end' : 'justify-start'} mb-2`}
    >
      {variant === 'received' && <div className={tailClasses} />}
      <div className={bubbleClasses}>
        <div>{text}</div>
        <div className="text-xs text-right text-opacity-75">{date}</div>
      </div>
      {variant === 'sent' && <div className={tailClasses} />}
    </div>
  );
};

export default BubbleChat;
