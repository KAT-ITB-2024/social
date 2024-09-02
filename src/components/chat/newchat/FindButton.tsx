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
      className={`w-full rounded-full border-[1px] border-neutral-50 bg-blue-500 px-[5px] py-[20px] font-subheading text-sh3 font-bold text-white shadow-green-lg hover:bg-blue-400 ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default FindButton;
