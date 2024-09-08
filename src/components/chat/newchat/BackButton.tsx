import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';

type BackButtonProps = {
  defaultSrc: StaticImageData;
  hoverSrc: StaticImageData;
  onClick: () => void;
};

const BackButton = ({ defaultSrc, hoverSrc, onClick }: BackButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Image
      src={isHovered ? hoverSrc : defaultSrc}
      alt="icon"
      width={35}
      height={35}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    />
  );
};

export default BackButton;
