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
      <DialogContent className="w-full max-w-[450px] h-[270px] flex flex-col bg-blue-100 p-6 rounded-lg">
        {icon && (
          <div className="absolute top-4 left-4">
            <Image src={icon} alt={description} width={37} height={37} />
          </div>
        )}
        <div className="absolute top-4 right-4 flex space-x-2">
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
          <div className="flex flex-row items-center justify-center max-w-xs border-dashed border-2 border-turquoise-400 p-4 rounded-lg">
            <Image
              src="/images/profile/file_copy.svg"
              alt="File Copy Icon"
              width={60}
              height={60}
              className="mb-4"
            />
            <label className="relative w-full flex flex-col items-center ml-4">
              <input
                type="file"
                accept="image/png,image/jpeg"
                className="opacity-0 absolute cursor-pointer"
                onChange={handleFileChange}
              />
              <div className="cursor-pointer bg-lightYellow rounded text-blue-600 px-5 py-2 border-2 border-blue-600 inline-block text-center">
                Select File
              </div>
              <span
                className={`block text-b5 mt-2 text-center ${!isFileSelected ? 'text-error-600' : 'text-blue-500'}`}
              >
                {fileName}
              </span>
            </label>
          </div>
        </div>

        <DialogFooter className="flex justify-center mt-4">
          <Button
            className="bg-blue-600 text-white px-5 py-2 rounded text-center"
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
