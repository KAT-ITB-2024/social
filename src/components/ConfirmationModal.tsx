'use client';

import React, { type ReactNode, useState } from 'react';
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

interface ConfirmationModalProps {
  triggerText?: string;
  customTriggerButton?: ReactNode;
  image: StaticImageData;
  title: string;
  description: string;
  actionText: string;
  cancelText?: string;
  actionColor?: string;
  action: () => void;
  cancelColor?: string;
  actionTextColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  customBackgroundColor?: string;
}

export function ConfirmationModal({
  triggerText,
  customTriggerButton,
  image,
  title,
  description,
  actionText,
  cancelText,
  actionColor,
  action,
  cancelColor,
  actionTextColor,
  titleColor,
  descriptionColor,
  customBackgroundColor,
}: ConfirmationModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        asChild
        className="flex items-center justify-center px-2"
      >
        {customTriggerButton ? (
          <div onClick={() => setIsOpen(true)}>{customTriggerButton}</div>
        ) : triggerText ? (
          <button className="btn" onClick={() => setIsOpen(true)}>
            {triggerText}
          </button>
        ) : (
          <button className="btn" onClick={() => setIsOpen(true)}>
            <Image src={DeleteIcon} alt="Delete Icon" width={24} height={24} />
          </button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent
        className={`flex w-80 flex-col items-center rounded-[12px] border-none ${customBackgroundColor ?? 'bg-blue-500'} p-6 ${titleColor ?? 'text-yellow'}`}
      >
        <AlertDialogHeader className="flex flex-col items-center">
          <AlertDialogTitle className="flex flex-col items-center gap-y-4">
            <Image src={image} alt="Star" height={150} width={150} />
            <p className="text-center text-h3 font-normal">{title}</p>
          </AlertDialogTitle>
          <AlertDialogDescription
            className={`text-center text-b5 ${descriptionColor ?? 'text-yellow'}`}
          >
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {actionText && (
          <AlertDialogFooter className="mt-6 flex w-full flex-col">
            <AlertDialogAction
              onClick={action}
              className={`${actionColor ?? 'bg-yellow'} w-full ${actionTextColor ?? 'text-blue-500'} hover:bg-shade-200`}
            >
              {actionText}
            </AlertDialogAction>

            {cancelText && (
              <AlertDialogCancel
                className={`${cancelColor ?? 'bg-transparent'} w-full`}
              >
                {cancelText}
              </AlertDialogCancel>
            )}
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
