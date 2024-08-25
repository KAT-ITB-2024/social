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
  onProfileImageChange: (newImage: StaticImageData) => void;
}) {
  const [fileName, setFileName] = useState<string>('No File Chosen');
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<StaticImageData | null>(
    null,
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file) as unknown as StaticImageData;
      setFileName('Selected File');
      setIsFileSelected(true);
      setSelectedFile(imageUrl);
    } else {
      setFileName('No File Chosen');
      setIsFileSelected(false);
      setSelectedFile(null);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onProfileImageChange(selectedFile);
    }
  };

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
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
