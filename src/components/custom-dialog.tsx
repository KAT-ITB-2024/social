import React from 'react';

// Alert Dialog Import
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Image Import
import Image, { StaticImageData } from 'next/image';
import CloseIcon from 'public/images/login/CloseIcon.svg';
import { cn } from '~/lib/utils';

const CustomDialog = ({
  image,
  title,
  description,
  isOpen,
  setIsOpen,
  className,
}: {
  image: StaticImageData;
  title: string;
  description: string;
  isOpen: boolean;
  setIsOpen: (param: boolean) => void;
  className: string;
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent
        className={cn('w-[300px] px-9 py-14', className)}
        onClick={() => setIsOpen(false)}
      >
        {/* Close Icon */}
        <div
          className="absolute top-4 right-4 text-2xl text-yellow cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <Image src={CloseIcon} alt="Close Icon" width={32} height={32} />
        </div>
        <AlertDialogTitle className="flex flex-col items-center gap-y-4">
          <Image src={image} alt="Star" height={150} width={150} />
          <p className="text-center text-h3 font-normal">{title}</p>
        </AlertDialogTitle>
        <AlertDialogDescription className="text-yellow text-center font-normal text-b5">
          {description}
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomDialog;
