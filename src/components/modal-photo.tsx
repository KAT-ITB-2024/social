import Image, { type StaticImageData } from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from './ui/dialog-photo';

export default function ModalPhoto({
  triggerButton,
  photo,
}: {
  triggerButton: JSX.Element;
  photo: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="flex items-center justify-center h-full w-full bg-black">
        <DialogClose asChild>
          <Image
            src="/images/profile/clear_2.svg"
            alt="Close Icon"
            width={24}
            height={24}
            className="cursor-pointer absolute top-4 left-4"
          />
        </DialogClose>
        <div className="flex items-center justify-center max-w-full max-h-[80vh] w-full h-full">
          <div className="relative w-full h-full">
            <Image
              src={photo}
              alt="Profile"
              className="absolute object-contain max-w-full max-h-full"
              fill
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
