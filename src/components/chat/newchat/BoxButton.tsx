import React, { ReactNode } from 'react';

interface BoxButtonProps {
  onClick?: () => void;
  children: ReactNode;
  color: 'pink' | 'white' | 'blue' | 'lightblue';
  size: 'default' | 'large' | 'custom';
  disabled?: boolean;
}

const getButtonStyles = (
  size: 'default' | 'large' | 'custom',
  color: 'pink' | 'white' | 'blue' | 'lightblue',
  disabled?: boolean,
) => {
  const sizeStyle = {
    default: 'px-[30px] py-[8px]',
    large: 'w-full px-[20px] py-[8px]',
    custom: 'px-[30px] py-[8px] w-[150px]',
  };

  const colorStyle = {
    pink: 'bg-pink-300 text-neutral-50 border-[1.5px] border-neutral-50 hover:bg-pink-400',
    white:
      'bg-neutral-50 text-blue-600 border-[1.5px] border-blue-200 hover:bg-neutral-200',
    blue: 'bg-blue-400 text-neutral-50 border-[1.5px] border-neutral-50 hover:bg-blue-300',
    lightblue: 'bg-blue-300 text-neutral-50 border-[1.5px] border-neutral-50',
  };

  const disabledStyle = 'opacity-50 cursor-not-allowed';

  return `rounded-xl font-body text-b2 text-center ${
    sizeStyle[size]
  } ${colorStyle[color]} ${disabled ? disabledStyle : ''}`;
};

const BoxButton = ({
  onClick,
  children,
  color,
  size,
  disabled = false,
}: BoxButtonProps) => {
  const buttonStyles = getButtonStyles(size, color, disabled);
  return (
    <button onClick={onClick} className={buttonStyles} disabled={disabled}>
      {children}
    </button>
  );
};

export default BoxButton;
