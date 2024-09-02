'use client';
import { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from './ui/dialog-profile';
import { Button } from './ui/button';
import { LoadingSpinnerCustom } from './ui/loading-spinner';
import { api } from '~/trpc/react';
import { AllowableFileTypeEnum, FolderEnum } from '~/types/enums/storage';
import { toast } from 'sonner';
import { ErrorToast } from './ui/error-toast';
import { uploadFile } from '~/lib/file';
import { TRPCError } from '@trpc/server';
import { SuccessToast } from './ui/success-toast';
import { on } from 'events';

export default function ModalProfile({
  triggerButton,
  title,
  description,
  icon,
  onProfileImageChange,
}: {
  triggerButton: JSX.Element;
  title: string;
  description: string;
  icon?: string;
  onProfileImageChange: (newImage: string) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('No File Chosen');
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const uploadFileMutation = api.storage.generateUploadUrl.useMutation();
  const downloadFileMutation = api.storage.generateDownloadUrl.useMutation();
  const updateProfilePicMutation = api.profile.updateProfileImg.useMutation();

  const handleRemove = () => {
    setFileName('No File Chosen');
    setIsFileSelected(false);
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setIsFileSelected(true);
      setSelectedFile(file);
      onProfileImageChange(URL.createObjectURL(file));
    } else {
      setFileName('No File Chosen');
      setIsFileSelected(false);
      setSelectedFile(null);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (!selectedFile) {
      return;
    }
    const { type } = selectedFile;
    if (!(type == 'image/jpeg' || type == 'image/png')) {
      toast(<ErrorToast desc="File type not allowed" />);
    }

    const enumType =
      type == 'image/jpeg'
        ? AllowableFileTypeEnum.JPEG
        : AllowableFileTypeEnum.PNG;

    try {
      const { url, filename } = await uploadFileMutation.mutateAsync({
        filename: fileName,
        folder: FolderEnum.PROFILE,
        contentType: enumType,
      });

      const downloadUrl = await downloadFileMutation.mutateAsync({
        filename: filename,
        folder: FolderEnum.PROFILE,
      });

      const updateQuery = updateProfilePicMutation.mutateAsync({
        profileImage: downloadUrl,
      });
      const uploadQuery = uploadFile(url, selectedFile, enumType);

      await Promise.all([updateQuery, uploadQuery]);
      onProfileImageChange(downloadUrl);
      toast(<SuccessToast desc="Profile picture berhasil diubah" />);
    } catch (error) {
      if (error instanceof TRPCError) {
        toast(<ErrorToast desc={error.message} />);
      } else toast(<ErrorToast desc="Silakan coba submit ulang!" />);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <LoadingSpinnerCustom />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="flex h-[270px] w-full max-w-[450px] flex-col rounded-lg bg-blue-100 p-6">
        {icon && (
          <div className="absolute left-4 top-4">
            <Image src={icon} alt={description} width={37} height={37} />
          </div>
        )}
        <div className="absolute right-4 top-4 flex space-x-2">
          <Image
            src="/images/profile/delete.svg"
            alt="Delete Icon"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={handleRemove}
          />
          <DialogClose asChild>
            <Image
              src="/images/profile/clear.svg"
              alt="Close Icon"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </DialogClose>
        </div>
        <DialogHeader className="text-left">
          <DialogTitle className="text-turquoise-400">{title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-grow items-center justify-center">
          <div className="flex max-w-xs flex-row items-center justify-center rounded-lg border-2 border-dashed border-turquoise-400 p-4">
            <Image
              src="/images/profile/file_copy.svg"
              alt="File Copy Icon"
              width={60}
              height={60}
              className="mb-4"
            />
            <label className="relative ml-4 flex w-full flex-col items-center">
              <input
                type="file"
                accept="image/png,image/jpeg"
                className="absolute cursor-pointer opacity-0"
                onChange={handleFileChange}
              />
              <div className="inline-block cursor-pointer rounded border-2 border-blue-600 bg-lightYellow px-5 py-2 text-center text-blue-600">
                Select File
              </div>
              <span
                className={`mt-2 block text-center text-b5 ${!isFileSelected ? 'text-error-600' : 'text-blue-500'}`}
              >
                {fileName}
              </span>
            </label>
          </div>
        </div>

        <DialogFooter className="mt-4 flex justify-center">
          <Button
            className="rounded bg-blue-600 px-5 py-2 text-center text-white"
            onClick={handleSubmit}
            disabled={!isFileSelected}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
