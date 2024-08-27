import React, { ReactNode } from 'react';

interface FindButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const FindButton = ({
  children,
  onClick,
  disabled = false,
}: FindButtonProps) => {
  return (
    <button
      className={`w-full bg-blue-500 rounded-full border-[1px] border-neutral-50 shadow-green-lg px-[5px] py-[20px] text-white font-subheading font-bold text-sh3 hover:bg-blue-400 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default FindButton;
