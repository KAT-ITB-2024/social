'use client';

import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog-assignment';
import Image, { type StaticImageData } from 'next/image';
import DeleteIcon from 'public/images/modal-component/delete.svg';
import CloseIcon from 'public/images/modal-component/close.svg';

interface ModalComponentProps {
  triggerText?: string;
  image: StaticImageData;
  title: string;
  description: string;
  actionText?: string;
  cancelText?: string;
  actionColor?: string;
  cancelColor?: string;
}

export function ModalComponent({
  triggerText,
  image,
  title,
  description,
  actionText,
  cancelText,
  actionColor,
  cancelColor,
}: ModalComponentProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        {triggerText ? (
          <button className="btn" onClick={() => setIsOpen(true)}>
            {triggerText}
          </button>
        ) : (
          <button className="btn" onClick={() => setIsOpen(true)}>
            <Image src={DeleteIcon} alt="Delete Icon" width={24} height={24} />
          </button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-blue-600 text-yellow flex flex-col items-center p-6 rounded-lg w-80">
        {/* Close Icon */}
        <div
          className="absolute top-4 right-4 text-2xl text-yellow cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <Image src={CloseIcon} alt="Close Icon" width={24} height={24} />
        </div>

        <div className="flex flex-col items-center gap-y-4">
          <Image src={image} alt="Sea Creatures" width={150} height={150} />
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-4xl text-center">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-md text-yellow">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {actionText && (
          <AlertDialogFooter className="flex flex-col w-full mt-6">
            <AlertDialogAction className={`${actionColor} w-full`}>
              {actionText}
            </AlertDialogAction>
            {cancelText && (
              <AlertDialogCancel className={`${cancelColor} w-full`}>
                {cancelText}
              </AlertDialogCancel>
            )}
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
